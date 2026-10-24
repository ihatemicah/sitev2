import { useEffect, useMemo, useRef, useState } from 'react'
import './experiments-entry.css'
import { CANVAS_ITEMS } from './canvasMedia.js'
import { InfiniteCanvas } from './infinite/InfiniteCanvas.jsx'

const MEDIA_SWAP_MS = 280

function PanelMedia({ asset, onAspect }) {
    const currentRef = useRef(asset)
    const [outgoing, setOutgoing] = useState(null)
    const [fadeIn, setFadeIn] = useState(false)

    const reportAspect = (event) => {
        const el = event.currentTarget
        const width = el.videoWidth || el.naturalWidth
        const height = el.videoHeight || el.naturalHeight
        if (width && height) onAspect(width / height)
    }

    useEffect(() => {
        const previous = currentRef.current
        if (previous.url === asset.url) return
        currentRef.current = asset
        const reduceMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches
        const crossfade =
            !reduceMotion &&
            previous.type !== 'video' &&
            asset.type !== 'video'
        setFadeIn(!crossfade && !reduceMotion)
        setOutgoing(crossfade ? previous : null)
    }, [asset])

    useEffect(() => {
        if (!outgoing) return
        const url = outgoing.url
        const id = setTimeout(() => {
            setOutgoing((current) => (current?.url === url ? null : current))
        }, MEDIA_SWAP_MS + 40)
        return () => clearTimeout(id)
    }, [outgoing])

    const finishOutgoing = (event) => {
        if (event.animationName !== 'experiments-media-out') return
        const url = outgoing?.url
        setOutgoing((current) => (current?.url === url ? null : current))
    }

    return (
        <div className="experiments-panel-media">
            <div
                key={asset.url}
                className={
                    fadeIn
                        ? 'experiments-panel-media-layer is-entering'
                        : 'experiments-panel-media-layer'
                }
            >
                {asset.type === 'video' ? (
                    <video
                        src={asset.url}
                        controls
                        autoPlay
                        muted
                        loop
                        playsInline
                        onLoadedMetadata={reportAspect}
                    />
                ) : (
                    <img
                        src={asset.url}
                        alt={asset.label || ''}
                        decoding="async"
                        onLoad={reportAspect}
                    />
                )}
            </div>
            {outgoing ? (
                <div
                    key={outgoing.url}
                    className="experiments-panel-media-layer is-leaving"
                    onAnimationEnd={finishOutgoing}
                >
                    <img src={outgoing.url} alt="" decoding="async" />
                </div>
            ) : null}
        </div>
    )
}

function AssetPanel({ asset, closing, onClose, onExited }) {
    const [aspect, setAspect] = useState(4 / 3)

    useEffect(() => {
        const onKey = (event) => {
            if (event.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [onClose])

    return (
        <div
            className={
                closing
                    ? 'experiments-panel-shell is-closing'
                    : 'experiments-panel-shell'
            }
            onTransitionEnd={(event) => {
                if (event.propertyName !== 'opacity') return
                if (!closing) return
                if (!event.target.classList?.contains('experiments-panel')) return
                onExited()
            }}
        >
            <div className="experiments-panel-backdrop" aria-hidden="true" />
            <aside
                className="experiments-panel"
                role="dialog"
                aria-label={asset.label || 'Asset'}
                style={{ '--asset-aspect': aspect }}
            >
                <div
                    className="experiments-panel-body"
                    style={{ '--media-swap': `${MEDIA_SWAP_MS}ms` }}
                >
                    <button
                        type="button"
                        className="experiments-panel-close"
                        aria-label="Close"
                        onClick={onClose}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7.99991 6.58582L17.4141 16L15.9999 17.4142L6.58569 8.00003L7.99991 6.58582Z"
                                fill="currentColor"
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M17.4141 8.00003L7.99991 17.4142L6.58569 16L15.9999 6.58582L17.4141 8.00003Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                    <PanelMedia asset={asset} onAspect={setAspect} />
                    <div key={asset.url} className="experiments-panel-copy">
                        <div className="experiments-panel-heading">
                            {asset.label ? (
                                <h2 className="experiments-panel-title">
                                    {asset.label}
                                </h2>
                            ) : (
                                <span />
                            )}
                            {asset.date ? (
                                <p className="experiments-panel-date">{asset.date}</p>
                            ) : null}
                        </div>
                        {asset.tags?.length ? (
                            <ul className="experiments-panel-tags">
                                {asset.tags.map((tag) => (
                                    <li key={tag}>{tag}</li>
                                ))}
                            </ul>
                        ) : null}
                        {asset.description ? (
                            <p className="experiments-panel-description">
                                {asset.description}
                            </p>
                        ) : null}
                    </div>
                </div>
            </aside>
        </div>
    )
}

const INFO_LINGER_MS = 60_000
const INFO_APPEAR_MS = 2500
const DESKTOP_CONTROLS =
    '(min-width: 1024px) and (hover: hover) and (pointer: fine)'
const MOUSE_NUDGE = 5

function controlKey(key) {
    if (key === 'w' || key === 'W' || key === 'ArrowUp') return 'w'
    if (key === 'a' || key === 'A' || key === 'ArrowLeft') return 'a'
    if (key === 's' || key === 'S' || key === 'ArrowDown') return 's'
    if (key === 'd' || key === 'D' || key === 'ArrowRight') return 'd'
    return null
}

function DesktopControls() {
    const [desktop, setDesktop] = useState(() =>
        window.matchMedia(DESKTOP_CONTROLS).matches,
    )
    const [held, setHeld] = useState({ w: false, a: false, s: false, d: false })
    const [wheeling, setWheeling] = useState(false)
    const [middle, setMiddle] = useState(false)
    const [dragging, setDragging] = useState(false)
    const [nudge, setNudge] = useState({ x: 0, y: 0 })
    const wheelTimer = useRef(0)
    const dragRef = useRef(null)

    useEffect(() => {
        const media = window.matchMedia(DESKTOP_CONTROLS)
        const sync = () => setDesktop(media.matches)
        sync()
        media.addEventListener('change', sync)
        return () => media.removeEventListener('change', sync)
    }, [])

    useEffect(() => {
        if (!desktop) return
        const down = (event) => {
            const name = controlKey(event.key)
            if (!name) return
            setHeld((current) =>
                current[name] ? current : { ...current, [name]: true },
            )
        }
        const up = (event) => {
            const name = controlKey(event.key)
            if (!name) return
            setHeld((current) => ({ ...current, [name]: false }))
        }
        const onWheel = () => {
            setWheeling(true)
            window.clearTimeout(wheelTimer.current)
            wheelTimer.current = window.setTimeout(() => setWheeling(false), 160)
        }
        const onPointerDown = (event) => {
            if (event.pointerType !== 'mouse') return
            if (event.button === 1) {
                setMiddle(true)
                if (event.cancelable) event.preventDefault()
                return
            }
            if (event.button !== 0) return
            dragRef.current = {
                id: event.pointerId,
                x: event.clientX,
                y: event.clientY,
            }
        }
        const onPointerMove = (event) => {
            const drag = dragRef.current
            if (!drag || event.pointerId !== drag.id) return
            if ((event.buttons & 1) === 0) return
            let dx = event.clientX - drag.x
            let dy = event.clientY - drag.y
            const distance = Math.hypot(dx, dy)
            if (distance > MOUSE_NUDGE) {
                const scale = MOUSE_NUDGE / distance
                dx *= scale
                dy *= scale
            }
            setDragging(true)
            setNudge((current) =>
                Math.abs(current.x - dx) < 0.2 && Math.abs(current.y - dy) < 0.2
                    ? current
                    : { x: dx, y: dy },
            )
        }
        const endDrag = (event) => {
            const drag = dragRef.current
            if (!drag) return
            if (event && event.pointerId !== drag.id) return
            dragRef.current = null
            setDragging(false)
            setNudge({ x: 0, y: 0 })
        }
        const onPointerUp = (event) => {
            if (event.button === 1) setMiddle(false)
            if (event.button === 0 || event.type === 'pointercancel') endDrag(event)
        }
        const clear = () => {
            setHeld({ w: false, a: false, s: false, d: false })
            setMiddle(false)
            endDrag(null)
        }
        window.addEventListener('keydown', down)
        window.addEventListener('keyup', up)
        window.addEventListener('blur', clear)
        window.addEventListener('wheel', onWheel, { passive: true })
        window.addEventListener('pointerdown', onPointerDown, true)
        window.addEventListener('pointermove', onPointerMove)
        window.addEventListener('pointerup', onPointerUp)
        window.addEventListener('pointercancel', onPointerUp)
        return () => {
            window.removeEventListener('keydown', down)
            window.removeEventListener('keyup', up)
            window.removeEventListener('blur', clear)
            window.removeEventListener('wheel', onWheel)
            window.removeEventListener('pointerdown', onPointerDown, true)
            window.removeEventListener('pointermove', onPointerMove)
            window.removeEventListener('pointerup', onPointerUp)
            window.removeEventListener('pointercancel', onPointerUp)
            window.clearTimeout(wheelTimer.current)
        }
    }, [desktop])

    if (!desktop) return null

    const key = (name, label) => (
        <span
            className={
                held[name]
                    ? `experiments-controls-key is-${name} is-active`
                    : `experiments-controls-key is-${name}`
            }
        >
            {label}
        </span>
    )

    return (
        <div className="experiments-controls" aria-hidden="true">
            <div className="experiments-controls-keys">
                {key('w', 'W')}
                {key('a', 'A')}
                {key('s', 'S')}
                {key('d', 'D')}
            </div>
            <span className="experiments-controls-divider" />
            <span
                className={
                    wheeling || middle
                        ? dragging
                            ? 'experiments-controls-mouse is-active is-dragging'
                            : 'experiments-controls-mouse is-active'
                        : dragging
                          ? 'experiments-controls-mouse is-dragging'
                          : 'experiments-controls-mouse'
                }
                style={{ transform: `translate(${nudge.x}px, ${nudge.y}px)` }}
            >
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        cx="14"
                        cy="14"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="1.25"
                    />
                    <circle cx="14" cy="10.5" r="1.5" fill="currentColor" />
                </svg>
            </span>
        </div>
    )
}

function InfoButton({ ready }) {
    const [open, setOpen] = useState(false)
    const [closing, setClosing] = useState(false)
    const held = useRef(false)
    const closingRef = useRef(false)

    const beginClose = () => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            closingRef.current = false
            setClosing(false)
            setOpen(false)
            return
        }
        closingRef.current = true
        setClosing(true)
    }

    useEffect(() => {
        if (!ready || held.current) return
        setOpen(true)
        const id = setTimeout(() => {
            if (held.current) return
            beginClose()
        }, INFO_LINGER_MS)
        return () => clearTimeout(id)
    }, [ready])

    const toggle = () => {
        held.current = true
        if (open && !closingRef.current) {
            beginClose()
            return
        }
        closingRef.current = false
        setClosing(false)
        setOpen(true)
    }

    return (
        <div className="experiments-info">
            {open ? (
                <div
                    className={
                        closing
                            ? 'experiments-info-panel is-closing'
                            : 'experiments-info-panel'
                    }
                    role="dialog"
                    onAnimationEnd={(event) => {
                        if (event.target !== event.currentTarget) return
                        if (event.animationName !== 'experiments-info-out') return
                        if (!closingRef.current) return
                        closingRef.current = false
                        setClosing(false)
                        setOpen(false)
                    }}
                >
                    <p>Drag to move. Scroll or pinch to travel through the space.</p>
                    <a
                        href="https://github.com/edoardolunardi/infinite-canvas"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Infinite canvas credits
                    </a>
                </div>
            ) : null}
            <button
                type="button"
                className="experiments-info-button"
                aria-expanded={open && !closing}
                aria-label="About this canvas"
                onClick={toggle}
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM13 10.5V17H11V10.5H13Z"
                        fill="currentColor"
                    />
                    <path
                        d="M13.5 7.99999C13.5 8.82842 12.8284 9.49999 12 9.49999C11.1715 9.49999 10.5 8.82842 10.5 7.99999C10.5 7.17157 11.1715 6.49999 12 6.49999C12.8284 6.49999 13.5 7.17157 13.5 7.99999Z"
                        fill="currentColor"
                    />
                </svg>
            </button>
        </div>
    )
}

export default function ExperimentsPage() {
    const [selected, setSelected] = useState(null)
    const [presented, setPresented] = useState(null)
    const [closing, setClosing] = useState(false)
    const [pageReady, setPageReady] = useState(false)
    const media = useMemo(
        () =>
            CANVAS_ITEMS.map((item) => ({
                url: item.src,
                label: item.tooltipLabel,
                type: item.type,
                date: item.date,
                tags: item.tags,
                description: item.description,
                width: 4,
                height: 3,
            })),
        [],
    )

    useEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const id = setTimeout(() => setPageReady(true), reduce ? 0 : INFO_APPEAR_MS)
        return () => clearTimeout(id)
    }, [])

    useEffect(() => {
        if (selected) {
            setPresented(selected)
            setClosing(false)
            return
        }
        if (
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            setPresented(null)
            setClosing(false)
            return
        }
        setClosing(true)
    }, [selected])

    return (
        <div className="experiments-app">
            <a className="experiments-home-link" href="index.html" aria-label="Home">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.6569 6.34315C14.5327 3.21895 9.46734 3.21895 6.34315 6.34315C3.21895 9.46734 3.21895 14.5327 6.34315 17.6569C9.46734 20.781 14.5327 20.781 17.6569 17.6569C20.781 14.5327 20.781 9.46734 17.6569 6.34315ZM4.92893 4.92893C8.83418 1.02369 15.1658 1.02369 19.0711 4.92893C22.9763 8.83418 22.9763 15.1658 19.0711 19.0711C15.1658 22.9763 8.83418 22.9763 4.92893 19.0711C1.02369 15.1658 1.02369 8.83418 4.92893 4.92893ZM7.99999 8.00001H15V10H11.4142L16.4142 15L15 16.4142L9.99999 11.4142V15H7.99999V8.00001Z"
                        fill="currentColor"
                    />
                </svg>
            </a>
            <InfoButton ready={pageReady} />
            <DesktopControls />
            <InfiniteCanvas
                media={media}
                onSelect={(picked) => {
                    if (!picked) {
                        setSelected(null)
                        return
                    }
                    const match = media.find((item) => item.url === picked.url)
                    setSelected(match || picked)
                }}
            />
            {presented ? (
                <AssetPanel
                    asset={presented}
                    closing={closing && !selected}
                    onClose={() => setSelected(null)}
                    onExited={() => {
                        setPresented(null)
                        setClosing(false)
                    }}
                />
            ) : null}
        </div>
    )
}
