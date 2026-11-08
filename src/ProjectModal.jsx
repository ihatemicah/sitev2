import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './ProjectModal.css'

function RichText({ text }) {
    const pattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g
    const parts = []
    let last = 0
    let match
    let key = 0
    while ((match = pattern.exec(text))) {
        if (match.index > last) parts.push(text.slice(last, match.index))
        parts.push(
            <a
                key={key++}
                className="project-modal__link"
                href={match[2]}
                target="_blank"
                rel="noopener noreferrer"
            >
                {match[1]}
            </a>
        )
        last = match.index + match[0].length
    }
    if (last < text.length) parts.push(text.slice(last))
    return parts.length ? parts : text
}

function Note({ title, body }) {
    return (
        <div className="project-modal__note">
            <h3>{title}</h3>
            {body ? <p><RichText text={body} /></p> : null}
        </div>
    )
}

function Caption({ children }) {
    if (!children) return null
    return <figcaption className="project-modal__caption">{children}</figcaption>
}

function Media({ section }) {
    const frame = section.mediaType === 'video' ? (
        <video
            className="project-modal__media"
            src={section.src}
            poster={section.poster}
            autoPlay
            muted
            loop
            playsInline
        />
    ) : (
        <img className="project-modal__media" src={section.src} alt="" loading="lazy" decoding="async" />
    )

    return (
        <figure className="project-modal__figure">
            {frame}
            <Caption>{section.caption}</Caption>
        </figure>
    )
}

function Section({ section }) {
    if (section.type === 'note') {
        return <Note title={section.title} body={section.body} />
    }
    if (section.type === 'media') {
        return <Media section={section} />
    }
    if (section.type === 'statement') {
        return (
            <div className="project-modal__statement">
                {section.heading ? <h2>{section.heading}</h2> : null}
                {section.body ? <p><RichText text={section.body} /></p> : null}
            </div>
        )
    }
    if (section.type === 'text') {
        return section.body ? <p className="project-modal__text"><RichText text={section.body} /></p> : null
    }
    if (section.type === 'pair') {
        return (
            <div className="project-modal__pair">
                {section.items?.map((item) => (
                    <figure key={item.src} className="project-modal__figure">
                        <img src={item.src} alt="" loading="lazy" decoding="async" />
                        <Caption>{item.caption}</Caption>
                    </figure>
                ))}
            </div>
        )
    }
    return null
}

function ProjectModal({ project, onClose }) {
    const study = project.caseStudy
    const titleId = useId()
    const panelRef = useRef(null)
    const scrollerRef = useRef(null)
    const onCloseRef = useRef(onClose)
    const [progress, setProgress] = useState(0)
    const [closing, setClosing] = useState(false)

    useEffect(() => {
        onCloseRef.current = onClose
    }, [onClose])

    const closingRef = useRef(false)

    // Read the close duration from the motion token so JS stays in sync with CSS.
    const requestClose = useCallback(() => {
        if (closingRef.current) return
        closingRef.current = true
        setClosing(true)
        const token = getComputedStyle(document.documentElement)
            .getPropertyValue('--duration-medium')
            .trim()
        const value = parseFloat(token)
        // Production CSS rewrites 350ms to .35s. parseFloat(".35s") is 0.35,
        // which would unmount the modal before the ease-out can play.
        const ms = !Number.isFinite(value)
            ? 350
            : token.endsWith('ms')
              ? value
              : token.endsWith('s')
                ? value * 1000
                : 350
        window.setTimeout(() => onCloseRef.current(), ms)
    }, [])

    useEffect(() => {
        const onKey = (event) => {
            if (event.key === 'Escape') requestClose()
        }
        document.addEventListener('keydown', onKey)
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        panelRef.current?.focus()
        const el = scrollerRef.current
        if (el) {
            const max = el.scrollHeight - el.clientHeight
            setProgress(max <= 0 ? 1 : el.scrollTop / max)
            panelRef.current?.style.setProperty('--top-fade', '0')
        }
        return () => {
            document.removeEventListener('keydown', onKey)
            document.body.style.overflow = previousOverflow
        }
    }, [requestClose])

    const onScroll = () => {
        const el = scrollerRef.current
        if (!el) return
        const max = el.scrollHeight - el.clientHeight
        setProgress(max <= 0 ? 1 : el.scrollTop / max)
        const fade = Math.max(0, Math.min(1, el.scrollTop / 40))
        panelRef.current?.style.setProperty('--top-fade', String(fade))
    }

    useEffect(() => {
        const el = scrollerRef.current
        if (!el) return
        const updateFade = () => {
            const fade = Math.max(0, Math.min(1, el.scrollTop / 40))
            panelRef.current?.style.setProperty('--top-fade', String(fade))
        }
        updateFade()
        el.addEventListener('scroll', updateFade, { passive: true })
        return () => el.removeEventListener('scroll', updateFade)
    }, [study])

    // Glide the panel's own scroll instead of jumping a notch at a time.
    useEffect(() => {
        const el = scrollerRef.current
        if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        let target = el.scrollTop
        let frame = 0
        let easing = false

        const limit = () => Math.max(0, el.scrollHeight - el.clientHeight)

        const step = () => {
            target = Math.max(0, Math.min(limit(), target))
            const next = el.scrollTop + (target - el.scrollTop) * 0.18
            if (Math.abs(target - next) < 0.5) {
                el.scrollTop = target
                easing = false
                return
            }
            el.scrollTop = next
            frame = requestAnimationFrame(step)
        }

        const onWheel = (event) => {
            if (event.ctrlKey || limit() <= 0) return
            event.preventDefault()
            let delta = event.deltaY
            if (event.deltaMode === 1) delta *= 16
            if (event.deltaMode === 2) delta *= el.clientHeight
            if (!easing) target = el.scrollTop
            target = Math.max(0, Math.min(limit(), target + delta))
            if (!easing) {
                easing = true
                frame = requestAnimationFrame(step)
            }
        }

        el.addEventListener('wheel', onWheel, { passive: false })
        return () => {
            el.removeEventListener('wheel', onWheel)
            cancelAnimationFrame(frame)
        }
    }, [study])

    if (!study) return null

    return createPortal(
        <div
            className={
                closing
                    ? 'project-modal project-modal--closing'
                    : 'project-modal'
            }
            onClick={requestClose}
        >
            <div
                ref={panelRef}
                className="project-modal__panel"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex={-1}
                onClick={(event) => event.stopPropagation()}
            >
                <div
                    ref={scrollerRef}
                    className="project-modal__scroll"
                    onScroll={onScroll}
                >
                    <div className="project-modal__header">
                        <span className="project-modal__pill">{study.label}</span>
                        <span
                            className="project-modal__pill project-modal__pill--name"
                            id={titleId}
                        >
                            {study.name}
                        </span>
                        <button
                            type="button"
                            className="project-modal__close"
                            onClick={requestClose}
                            aria-label="Close"
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
                                    d="M4.99991 3.58578L11.9999 10.5858L18.9999 3.58578L20.4141 5L13.4141 12L20.4141 19L18.9999 20.4142L11.9999 13.4142L4.99991 20.4142L3.58569 19L10.5857 12L3.58569 5L4.99991 3.58578Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>
                    </div>
                    {study.sections?.map((section, index) => (
                        <Section key={index} section={section} />
                    ))}
                </div>
                <div className="project-modal__edge project-modal__edge--top" aria-hidden="true" />
                <div className="project-modal__edge" aria-hidden="true" />
                <div className="project-modal__progress" aria-hidden="true">
                    <span style={{ transform: `scaleX(${progress})` }} />
                </div>
            </div>
        </div>,
        document.body
    )
}

export default ProjectModal
