import { useEffect } from 'react'

/**
 * Shared Embla options for the site's carousels: free drag that coasts on desktop,
 * one-slide-per-swipe snapping on phones and small tablets, where slides are nearly
 * full width and a free throw would stop halfway through an image.
 */
export const emblaRowOptions = {
    loop: false,
    align: 'start',
    dragFree: true,
    breakpoints: {
        '(max-width: 768px)': { dragFree: false },
    },
}

const CLICK_SLOP = 10

// The React onClick lives on the tile or the row, and Embla stops the native click
// before it can get there. Call that handler directly.
function invokeReactOnClick(node) {
    let current = node instanceof Element ? node : node?.parentElement
    while (current && current !== document.body) {
        const key = Object.keys(current).find((name) => name.startsWith('__reactProps$'))
        const onClick = key && current[key].onClick
        if (typeof onClick === 'function') {
            onClick({
                preventDefault() {},
                stopPropagation() {},
                target: node,
                currentTarget: current,
            })
            return
        }
        current = current.parentElement
    }
}

/**
 * Embla 8 sets an internal "prevent click" flag during a drag and only clears it when a
 * click reaches the carousel. A touch swipe never produces a click, and a mouse released
 * outside the carousel clicks somewhere else, so the flag sticks and swallows the next
 * real click. After every drag, send the carousel a non-bubbling click on the next tick:
 * if the real click already cleared the flag it does nothing, otherwise it clears it.
 * Not bubbling means no other click handler on the page ever sees it.
 *
 * A press while the row is still coasting is also flagged, so the full view never opens
 * until the carousel has settled. A press that doesn't drag opens it anyway, and the
 * click Embla cancels is swallowed so a toggle can't fire twice.
 */
export function useEmblaClickReset(emblaApi) {
    useEffect(() => {
        if (!emblaApi) return
        const root = emblaApi.rootNode()
        let timer = 0
        let pressed = null
        let startX = 0
        let startY = 0
        let swallowClick = false

        const onPointerDown = (event) => {
            if (event.pointerType === 'mouse' && event.button !== 0) return
            pressed = event.target
            startX = event.clientX
            startY = event.clientY
            swallowClick = false
        }
        const onPointerUp = (event) => {
            const target = pressed
            pressed = null
            if (!target || event.type === 'pointercancel') return
            const dragged =
                Math.hypot(event.clientX - startX, event.clientY - startY) > CLICK_SLOP
            if (dragged) return
            swallowClick = true
            invokeReactOnClick(target)
        }
        const onClick = (event) => {
            // The flag-clearing click dispatched below does not bubble and is not a press.
            if (!event.bubbles || !swallowClick) return
            swallowClick = false
            event.preventDefault()
            event.stopPropagation()
        }
        const clearPreventClick = () => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                root.dispatchEvent(new MouseEvent('click', { bubbles: false, cancelable: true }))
            }, 0)
        }

        root.addEventListener('pointerdown', onPointerDown)
        window.addEventListener('pointerup', onPointerUp)
        window.addEventListener('pointercancel', onPointerUp)
        // Window, not the carousel: the press can be released on a tile that has since moved.
        window.addEventListener('click', onClick, true)
        emblaApi.on('pointerUp', clearPreventClick)
        return () => {
            clearTimeout(timer)
            root.removeEventListener('pointerdown', onPointerDown)
            window.removeEventListener('pointerup', onPointerUp)
            window.removeEventListener('pointercancel', onPointerUp)
            window.removeEventListener('click', onClick, true)
            emblaApi.off('pointerUp', clearPreventClick)
        }
    }, [emblaApi])
}
