import { useEffect, useRef, useState } from 'react'
import { TILE_HEIGHT_PX, TILE_WIDTH_PX } from './tileLayout.js'

const GAP = 36
const CELL_W = TILE_WIDTH_PX + GAP
const CELL_H = TILE_HEIGHT_PX + GAP
/** Cursor inside this fraction of the viewport does not move the canvas. */
const DEAD_ZONE = 0.22
/** Pixels per second when the cursor is at the screen edge. */
const MAX_SPEED = 920
const VELOCITY_LERP = 3.2

function mediaIndex(col, row, length) {
    let n = Math.imul(col, 0x27d4eb2d) ^ Math.imul(row, 0x165667b1)
    n = Math.imul(n ^ (n >>> 16), 0x7feb352d)
    n = Math.imul(n ^ (n >>> 15), 0x846ca68b)
    return ((n ^ (n >>> 16)) >>> 0) % length
}

function axisInfluence(offset) {
    const amount = Math.abs(offset)
    if (amount <= DEAD_ZONE) return 0
    const t = (amount - DEAD_ZONE) / (1 - DEAD_ZONE)
    return Math.sign(offset) * t * t
}

/**
 * Infinite tile field. Only the cells around the viewport are mounted.
 * On a mouse, distance from the screen center sets glide speed.
 * Touch and pen drag the field instead, with the same inertia.
 */
export function useInfiniteCanvas(items) {
    const outerRef = useRef(null)
    const worldRef = useRef(null)
    const [tiles, setTiles] = useState([])

    useEffect(() => {
        const outer = outerRef.current
        const world = worldRef.current
        if (!outer || !world || !items.length) return

        const reduced = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches

        const pointer = {
            nx: 0,
            ny: 0,
            inside: false,
            dragging: false,
            lastX: 0,
            lastY: 0,
        }
        const motion = { x: 0, y: 0, vx: 0, vy: 0 }
        let rangeKey = ''
        let frame = 0
        let last = performance.now()

        const rectSize = () => {
            const rect = outer.getBoundingClientRect()
            return { w: rect.width, h: rect.height, left: rect.left, top: rect.top }
        }

        const first = rectSize()
        motion.x = -first.w / 2 + CELL_W / 2
        motion.y = -first.h / 2 + CELL_H / 2

        function syncTiles(w, h) {
            const padX = CELL_W
            const padY = CELL_H
            const col0 = Math.floor((motion.x - padX) / CELL_W)
            const col1 = Math.floor((motion.x + w + padX) / CELL_W)
            const row0 = Math.floor((motion.y - padY) / CELL_H)
            const row1 = Math.floor((motion.y + h + padY) / CELL_H)
            const key = `${col0}:${col1}:${row0}:${row1}`
            if (key === rangeKey) return
            rangeKey = key

            const next = []
            for (let row = row0; row <= row1; row++) {
                for (let col = col0; col <= col1; col++) {
                    const item = items[mediaIndex(col, row, items.length)]
                    next.push({
                        key: `${col}:${row}`,
                        x: col * CELL_W,
                        y: row * CELL_H,
                        type: item.type,
                        src: item.src,
                        tooltipLabel: item.tooltipLabel,
                    })
                }
            }
            setTiles(next)
        }

        function apply() {
            const { x, y } = motion
            world.style.transform = `translate3d(${-x}px, ${-y}px, 0)`
            outer.style.backgroundPosition = `${-x}px ${-y}px`
        }

        function frameStep(now) {
            const dt = Math.min(0.05, (now - last) / 1000)
            last = now
            const { w, h } = rectSize()

            let targetX = 0
            let targetY = 0
            if (!pointer.dragging && pointer.inside && !reduced) {
                targetX = axisInfluence(pointer.nx) * MAX_SPEED
                targetY = axisInfluence(pointer.ny) * MAX_SPEED
            }

            const blend = 1 - Math.exp(-VELOCITY_LERP * dt)
            motion.vx += (targetX - motion.vx) * blend
            motion.vy += (targetY - motion.vy) * blend
            if (!pointer.dragging) {
                motion.x += motion.vx * dt
                motion.y += motion.vy * dt
            }

            apply()
            syncTiles(w, h)
            frame = requestAnimationFrame(frameStep)
        }

        function onPointerMove(event) {
            if (event.pointerType === 'touch') return
            const box = rectSize()
            const inside =
                event.clientX >= box.left &&
                event.clientX <= box.left + box.w &&
                event.clientY >= box.top &&
                event.clientY <= box.top + box.h
            pointer.inside = inside
            if (!inside) return
            pointer.nx = ((event.clientX - box.left) / box.w) * 2 - 1
            pointer.ny = ((event.clientY - box.top) / box.h) * 2 - 1
        }

        function onPointerLeaveWindow(event) {
            if (event?.relatedTarget) return
            pointer.inside = false
        }

        function onTouchDown(event) {
            if (event.pointerType === 'mouse') return
            pointer.dragging = true
            pointer.lastX = event.clientX
            pointer.lastY = event.clientY
            pointer.inside = false
            motion.vx = 0
            motion.vy = 0
            try {
                outer.setPointerCapture(event.pointerId)
            } catch {
                /* ignore */
            }
        }

        function onTouchMove(event) {
            if (!pointer.dragging) return
            const dx = event.clientX - pointer.lastX
            const dy = event.clientY - pointer.lastY
            pointer.lastX = event.clientX
            pointer.lastY = event.clientY
            motion.x -= dx
            motion.y -= dy
            const { w, h } = rectSize()
            apply()
            syncTiles(w, h)
        }

        function onTouchUp() {
            pointer.dragging = false
        }

        function onBlur() {
            pointer.inside = false
        }

        apply()
        syncTiles(first.w, first.h)
        frame = requestAnimationFrame(frameStep)

        window.addEventListener('pointermove', onPointerMove, { passive: true })
        window.addEventListener('blur', onBlur)
        window.addEventListener('pointerout', onPointerLeaveWindow)
        outer.addEventListener('pointerdown', onTouchDown)
        outer.addEventListener('pointermove', onTouchMove)
        outer.addEventListener('pointerup', onTouchUp)
        outer.addEventListener('pointercancel', onTouchUp)

        return () => {
            cancelAnimationFrame(frame)
            window.removeEventListener('pointermove', onPointerMove)
            window.removeEventListener('blur', onBlur)
            window.removeEventListener('pointerout', onPointerLeaveWindow)
            outer.removeEventListener('pointerdown', onTouchDown)
            outer.removeEventListener('pointermove', onTouchMove)
            outer.removeEventListener('pointerup', onTouchUp)
            outer.removeEventListener('pointercancel', onTouchUp)
        }
    }, [items])

    return { outerRef, worldRef, tiles }
}
