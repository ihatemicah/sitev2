import { gsap } from 'gsap'

/** Avoid unstable dx/dist when the cursor sits near the stable center (numeric jitter). */
const MIN_DIRECTION_DIST_PX = 16

/**
 * Magnetic hover via GSAP quickTo.
 *
 * @param el — element that receives `x` / `y` transforms (the moving layer)
 * @param options.measureEl — optional box whose screen rect defines the *rest* center & size.
 *   Use a parent that does not share the magnetic transform, or the center will chase the
 *   motion and oscillate at the cursor.
 */
export function initMagnetic(
    el,
    {
        strength = 0.035,
        radius = 160,
        measureEl = el,
    } = {},
) {
    const follow = {
        duration: 0.58,
        ease: 'power3.out',
    }

    const xTo = gsap.quickTo(el, 'x', follow)
    const yTo = gsap.quickTo(el, 'y', follow)

    function onMouseMove(e) {
        const rect = measureEl.getBoundingClientRect()
        if (rect.width < 4 || rect.height < 4) return

        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const dist = Math.hypot(dx, dy)

        if (dist < radius) {
            const falloff = 1 - dist / radius
            const dirDist = Math.max(dist, MIN_DIRECTION_DIST_PX)
            const tx = (dx / dirDist) * rect.width * strength * falloff
            const ty = (dy / dirDist) * rect.height * strength * falloff
            xTo(tx)
            yTo(ty)
        } else {
            xTo(0)
            yTo(0)
        }
    }

    gsap.set(el, { x: 0, y: 0, force3D: true })

    document.addEventListener('mousemove', onMouseMove, { passive: true })

    return () => {
        document.removeEventListener('mousemove', onMouseMove)
        gsap.killTweensOf(el)
        gsap.set(el, { clearProps: 'transform' })
    }
}
