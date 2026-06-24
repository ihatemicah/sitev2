import { useRef, useEffect, useLayoutEffect } from 'react'

/**
 * Fraction of the canvas viewport used when fitting all tiles (contain).
 * 1 = as large as possible while every tile stays on-screen; slightly under on narrow widths for safe edges.
 */
function getTargetFrac(vw) {
    if (vw <= 480) return 0.99
    return 1
}

function boundsFromItems(items, tileW, tileH) {
    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity
    for (const it of items) {
        minX = Math.min(minX, it.x)
        minY = Math.min(minY, it.y)
        maxX = Math.max(maxX, it.x + tileW)
        maxY = Math.max(maxY, it.y + tileH)
    }
    const w = maxX - minX
    const h = maxY - minY
    return {
        cx: (minX + maxX) / 2,
        cy: (minY + maxY) / 2,
        w,
        h,
    }
}

function distance(ax, ay, bx, by) {
    return Math.hypot(bx - ax, by - ay)
}

export function useCanvas({ fitContent } = {}) {
    const outerRef = useRef(null)
    const worldRef = useRef(null)
    const pointersRef = useRef(new Map())
    const pinchLastDistRef = useRef(null)
    const userAdjustedRef = useRef(false)

    const state = useRef({
        ox: 0,
        oy: 0,
        zoom: 1,
        dragging: false,
        startMx: 0,
        startMy: 0,
        startOx: 0,
        startOy: 0,
    })

    function applyTransform() {
        const world = worldRef.current
        if (!world) return
        const { ox, oy, zoom } = state.current
        world.style.transform = `translate(${ox}px, ${oy}px) scale(${zoom})`
    }

    function layoutToFit() {
        if (!fitContent?.items?.length) return
        const outer = outerRef.current
        if (!outer) return

        const { items, tileWidth, tileHeight } = fitContent
        const rect = outer.getBoundingClientRect()
        const vw = rect.width
        const vh = rect.height
        const { cx, cy, w: bw, h: bh } = boundsFromItems(
            items,
            tileWidth,
            tileHeight,
        )
        if (bw <= 0 || bh <= 0 || vw <= 0 || vh <= 0) return

        const frac = getTargetFrac(vw)
        const s = state.current
        let zoom = Math.min((frac * vw) / bw, (frac * vh) / bh)
        zoom = Math.min(4, Math.max(0.1, zoom))

        s.zoom = zoom
        s.ox = vw / 2 - cx * zoom
        s.oy = vh / 2 - cy * zoom
        applyTransform()
    }

    useLayoutEffect(() => {
        if (!fitContent?.items?.length) return

        layoutToFit()

        const outer = outerRef.current
        if (!outer) return

        const ro = new ResizeObserver(() => {
            if (!userAdjustedRef.current) layoutToFit()
        })
        ro.observe(outer)

        const onOrientation = () => {
            userAdjustedRef.current = false
            requestAnimationFrame(() => layoutToFit())
        }
        window.addEventListener('orientationchange', onOrientation)

        const vv = window.visualViewport
        const onVvResize = () => {
            if (!userAdjustedRef.current) layoutToFit()
        }
        if (vv) {
            vv.addEventListener('resize', onVvResize)
        }

        return () => {
            ro.disconnect()
            window.removeEventListener('orientationchange', onOrientation)
            if (vv) {
                vv.removeEventListener('resize', onVvResize)
            }
        }
    }, [fitContent])

    useEffect(() => {
        const outer = outerRef.current
        if (!outer) return

        const s = state.current
        const pointers = pointersRef.current

        function markAdjusted() {
            userAdjustedRef.current = true
        }

        function zoomAtPoint(mx, my, newZoom) {
            const clamped = Math.min(4, Math.max(0.1, newZoom))
            s.ox = mx - (mx - s.ox) * (clamped / s.zoom)
            s.oy = my - (my - s.oy) * (clamped / s.zoom)
            s.zoom = clamped
            applyTransform()
            markAdjusted()
        }

        function onPointerDown(e) {
            if (e.pointerType === 'mouse' && e.button !== 0) return

            pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })

            try {
                outer.setPointerCapture(e.pointerId)
            } catch {
                /* ignore */
            }

            if (pointers.size === 1) {
                s.dragging = true
                s.startMx = e.clientX
                s.startMy = e.clientY
                s.startOx = s.ox
                s.startOy = s.oy
                pinchLastDistRef.current = null
                outer.style.cursor = 'grabbing'
            }

            if (pointers.size === 2) {
                s.dragging = false
                const ids = [...pointers.keys()]
                const a = pointers.get(ids[0])
                const b = pointers.get(ids[1])
                pinchLastDistRef.current = distance(a.x, a.y, b.x, b.y)
            }

            if (e.cancelable) e.preventDefault()
        }

        function onPointerMove(e) {
            if (!pointers.has(e.pointerId)) return
            pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })

            const rect = outer.getBoundingClientRect()

            if (pointers.size >= 2) {
                const ids = [...pointers.keys()].slice(0, 2)
                const a = pointers.get(ids[0])
                const b = pointers.get(ids[1])
                const dist = distance(a.x, a.y, b.x, b.y)
                const midX = (a.x + b.x) / 2 - rect.left
                const midY = (a.y + b.y) / 2 - rect.top

                const last = pinchLastDistRef.current
                if (last != null && last > 1e-3 && dist > 1e-3) {
                    const factor = dist / last
                    zoomAtPoint(midX, midY, s.zoom * factor)
                }
                pinchLastDistRef.current = dist
                return
            }

            if (s.dragging && pointers.size === 1) {
                s.ox = s.startOx + (e.clientX - s.startMx)
                s.oy = s.startOy + (e.clientY - s.startMy)
                applyTransform()
                markAdjusted()
            }
        }

        function onPointerUp(e) {
            pointers.delete(e.pointerId)

            if (pointers.size < 2) {
                pinchLastDistRef.current = null
            }

            if (pointers.size === 0) {
                s.dragging = false
                outer.style.cursor = 'grab'
            } else if (pointers.size === 1) {
                const remaining = [...pointers.values()][0]
                s.dragging = true
                s.startMx = remaining.x
                s.startMy = remaining.y
                s.startOx = s.ox
                s.startOy = s.oy
            }
        }

        function onPointerCancel(e) {
            onPointerUp(e)
        }

        function onWheel(ev) {
            ev.preventDefault()
            const rect = outer.getBoundingClientRect()
            const mx = ev.clientX - rect.left
            const my = ev.clientY - rect.top
            const factor = ev.deltaY < 0 ? 1.1 : 0.9
            zoomAtPoint(mx, my, s.zoom * factor)
        }

        outer.addEventListener('pointerdown', onPointerDown)
        outer.addEventListener('pointermove', onPointerMove)
        outer.addEventListener('pointerup', onPointerUp)
        outer.addEventListener('pointercancel', onPointerCancel)
        outer.addEventListener('lostpointercapture', onPointerUp)
        outer.addEventListener('wheel', onWheel, { passive: false })

        return () => {
            outer.removeEventListener('pointerdown', onPointerDown)
            outer.removeEventListener('pointermove', onPointerMove)
            outer.removeEventListener('pointerup', onPointerUp)
            outer.removeEventListener('pointercancel', onPointerCancel)
            outer.removeEventListener('lostpointercapture', onPointerUp)
            outer.removeEventListener('wheel', onWheel)
        }
    }, [])

    return { outerRef, worldRef }
}
