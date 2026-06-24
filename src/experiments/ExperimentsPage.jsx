import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Canvas } from './Canvas.jsx'
import './experiments-entry.css'
import { initMagnetic } from './magnetic.js'
import { CANVAS_MEDIA } from './canvasMedia.js'
import { TILE_HEIGHT_PX, TILE_WIDTH_PX } from './tileLayout.js'

const TOOLTIP_SHOW_DELAY_MS = 200

/** Tooltip above or below the tile only: cursor above center → top, below → bottom. */
function dirFromPointer(rect, clientY) {
    const cy = rect.top + rect.height / 2
    return clientY < cy ? 'top' : 'bottom'
}

function labelFromSrc(src, type) {
    try {
        const u = new URL(src)
        const seg = u.pathname.split('/').filter(Boolean).pop() ?? ''
        const base = decodeURIComponent(seg).replace(/\.[^.]+$/, '')
        if (base) return base.replace(/[-_]+/g, ' ')
    } catch {
        /* ignore */
    }
    return type === 'video' ? 'Video' : 'Image'
}

/** Stable reference for useCanvas fit effect */
const FIT_CONTENT = {
    items: CANVAS_MEDIA,
    tileWidth: TILE_WIDTH_PX,
    tileHeight: TILE_HEIGHT_PX,
}

function MediaTile({ x, y, type, src, tooltipLabel }) {
    const measureRef = useRef(null)
    const tileRef = useRef(null)
    const showTimerRef = useRef(null)
    const lastClientYRef = useRef(0)
    const hoverRef = useRef(false)
    const [tip, setTip] = useState({
        show: false,
        exiting: false,
        dir: 'top',
        flip: 0,
    })

    function clearShowTimer() {
        if (showTimerRef.current != null) {
            clearTimeout(showTimerRef.current)
            showTimerRef.current = null
        }
    }

    useEffect(() => () => clearShowTimer(), [])

    useLayoutEffect(() => {
        const moveEl = tileRef.current
        const originEl = measureRef.current
        if (!moveEl || !originEl) return

        const radius = TILE_WIDTH_PX >= 200 ? 160 : 120
        return initMagnetic(moveEl, {
            strength: 0.035,
            radius,
            measureEl: originEl,
        })
    }, [])

    function scheduleShowDelay() {
        clearShowTimer()
        showTimerRef.current = window.setTimeout(() => {
            showTimerRef.current = null
            if (!hoverRef.current) return
            const node = measureRef.current
            if (!node) return
            const rect = node.getBoundingClientRect()
            setTip({
                show: true,
                exiting: false,
                dir: dirFromPointer(rect, lastClientYRef.current),
                flip: 0,
            })
        }, TOOLTIP_SHOW_DELAY_MS)
    }

    function handlePointerEnter(e) {
        lastClientYRef.current = e.clientY
        hoverRef.current = true
        clearShowTimer()

        setTip((prev) => {
            if (prev.exiting) {
                return {
                    ...prev,
                    exiting: false,
                    show: true,
                    flip: prev.flip + 1,
                }
            }
            if (!prev.show && !prev.exiting) {
                queueMicrotask(() => {
                    if (!hoverRef.current) return
                    setTip((p) => {
                        if (p.show || p.exiting) return p
                        scheduleShowDelay()
                        return p
                    })
                })
            }
            return prev
        })
    }

    function handlePointerMove(e) {
        lastClientYRef.current = e.clientY
        const node = measureRef.current
        if (!node) return
        const rect = node.getBoundingClientRect()
        setTip((prev) => {
            if (!prev.show || prev.exiting) return prev
            const nextDir = dirFromPointer(rect, e.clientY)
            if (nextDir === prev.dir) return prev
            return {
                ...prev,
                dir: nextDir,
                flip: prev.flip + 1,
            }
        })
    }

    function handlePointerLeave() {
        hoverRef.current = false
        clearShowTimer()
        setTip((prev) => {
            if (prev.show && !prev.exiting) {
                return { ...prev, show: false, exiting: true }
            }
            return { ...prev, show: false }
        })
    }

    function handleTooltipAnimationEnd(e) {
        const name = e.animationName
        if (
            name !== 'canvas-tooltip-exit-top' &&
            name !== 'canvas-tooltip-exit-bottom'
        ) {
            return
        }
        setTip((prev) => {
            if (!prev.exiting) return prev
            return { show: false, exiting: false, dir: 'top', flip: 0 }
        })
    }

    const tooltipMounted = tip.show || tip.exiting

    return (
        <div
            ref={measureRef}
            className="canvas-media-tile-slot"
            style={{
                left: x,
                top: y,
                width: TILE_WIDTH_PX,
                height: TILE_HEIGHT_PX,
            }}
            onPointerEnter={handlePointerEnter}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
        >
            <div ref={tileRef} className="canvas-media-tile">
                {type === 'video' ? (
                    <video
                        className="canvas-media-fill"
                        src={src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                    />
                ) : (
                    <img
                        className="canvas-media-fill"
                        src={src}
                        alt=""
                        draggable={false}
                    />
                )}
            </div>
            {tooltipMounted ? (
                <div
                    key={`${tip.dir}-${tip.flip}`}
                    className={`canvas-media-tooltip canvas-media-tooltip--${tip.dir}${tip.exiting ? ' canvas-media-tooltip--exiting' : ''}`}
                    role="tooltip"
                    onAnimationEnd={handleTooltipAnimationEnd}
                >
                    {tooltipLabel}
                </div>
            ) : null}
        </div>
    )
}

export default function ExperimentsPage() {
    return (
        <div className="experiments-app">
            <a className="experiments-home-link" href="index.html">
                ← Home
            </a>
            <Canvas fitContent={FIT_CONTENT}>
                {CANVAS_MEDIA.map((item, index) => (
                    <MediaTile
                        key={`${item.type}-${index}-${item.src}`}
                        x={item.x}
                        y={item.y}
                        type={item.type}
                        src={item.src}
                        tooltipLabel={
                            item.tooltipLabel ??
                            labelFromSrc(item.src, item.type)
                        }
                    />
                ))}
            </Canvas>
        </div>
    )
}
