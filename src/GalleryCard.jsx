import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal, flushSync } from 'react-dom'
import useEmblaCarousel from 'embla-carousel-react'
import { useEmblaDragSuppress } from './PortfolioHoverVideo.jsx'
import { emblaRowOptions, useEmblaClickReset } from './embla.js'
import './GalleryCard.css'

const pad = (n) => String(n).padStart(2, '0')
const getMediaSource = (item) => (typeof item === 'string' ? item : item?.src || '')
const isVideoMedia = (src) => /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(src)
const canVT = typeof document !== 'undefined' && typeof document.startViewTransition === 'function'
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Shared-element names only live on the gallery being animated, so several cards can coexist.
const CARD_NAMES = { surface: 'surface', head: 'gal-head', strip: 'strip' }

function scrollPadLeft(scroller) {
    return parseFloat(getComputedStyle(scroller).scrollPaddingLeft) || 0
}

function firstVisible(scroller, items) {
    const left = scroller.getBoundingClientRect().left + scrollPadLeft(scroller)
    let best = 0
    let bestD = Infinity
    items.forEach((el, i) => {
        const d = Math.abs(el.getBoundingClientRect().left - left)
        if (d < bestD) {
            bestD = d
            best = i
        }
    })
    return best
}

function offsetTo(scroller, el) {
    return (
        scroller.scrollLeft +
        el.getBoundingClientRect().left -
        scroller.getBoundingClientRect().left -
        scrollPadLeft(scroller)
    )
}

// Mouse drag-to-scroll that coasts on release, like Embla's dragFree (touch and trackpad stay
// native). Returns a ref to a function that stops any coasting, for programmatic scrolls.
function useDragScroll(ref) {
    const stopRef = useRef(() => {})
    useEffect(() => {
        const el = ref.current
        if (!el) return
        let startX = 0
        let startLeft = 0
        let active = false
        let moved = false
        let lastX = 0
        let lastT = 0
        let v = 0
        let raf = 0

        const stop = () => cancelAnimationFrame(raf)
        stopRef.current = stop

        // carry the release velocity forward and let friction slow it down
        const coast = (velocity) => {
            // cap a hard flick at ~60px/frame, which coasts about 1200px
            let vel = Math.max(-60, Math.min(60, velocity))
            const step = () => {
                const before = el.scrollLeft
                el.scrollLeft = before + vel
                vel *= 0.95
                // stop when it has slowed down or hit an edge
                if (Math.abs(vel) > 0.3 && el.scrollLeft !== before) raf = requestAnimationFrame(step)
            }
            raf = requestAnimationFrame(step)
        }

        const down = (e) => {
            stop()
            if (e.pointerType !== 'mouse' || e.button !== 0 || active) return
            active = true
            moved = false
            startX = lastX = e.clientX
            startLeft = el.scrollLeft
            lastT = e.timeStamp
            v = 0
            el.dataset.moved = '0'
        }
        const move = (e) => {
            if (!active) return
            const dx = e.clientX - startX
            if (!moved && Math.abs(dx) > 4) {
                moved = true
                el.dataset.moved = '1'
                el.classList.add('dragging')
                el.setPointerCapture(e.pointerId)
            }
            if (moved) {
                const dt = Math.max(1, e.timeStamp - lastT)
                // smooth the velocity so one jittery sample doesn't decide the throw
                v = v * 0.2 + ((e.clientX - lastX) / dt) * 0.8
                lastX = e.clientX
                lastT = e.timeStamp
                el.scrollLeft = startLeft - dx
            }
        }
        const end = (e) => {
            if (!active) return
            active = false
            if (!moved) return
            el.classList.remove('dragging')
            // holding still before letting go means no throw
            const idle = e.timeStamp - lastT > 80
            if (!idle && !prefersReducedMotion()) coast(-v * 16)
            setTimeout(() => (el.dataset.moved = '0'), 0)
        }

        el.addEventListener('pointerdown', down)
        el.addEventListener('pointermove', move)
        el.addEventListener('pointerup', end)
        el.addEventListener('pointercancel', end)
        el.addEventListener('wheel', stop, { passive: true })
        return () => {
            stop()
            el.removeEventListener('pointerdown', down)
            el.removeEventListener('pointermove', move)
            el.removeEventListener('pointerup', end)
            el.removeEventListener('pointercancel', end)
            el.removeEventListener('wheel', stop)
        }
    }, [ref])
    return stopRef
}

const handleVideoHover = (event, shouldPlay) => {
    const video = event.currentTarget
    if (shouldPlay) {
        video.play().catch(() => {})
        return
    }
    video.pause()
    video.currentTime = 0
}

// On touch screens there's no hover, so playInView plays a video while it's mostly on screen
function Media({ src, alt = '', playInView = false }) {
    const videoRef = useRef(null)
    useEffect(() => {
        const video = videoRef.current
        if (!playInView || !video || !window.matchMedia('(hover: none)').matches) return
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) video.play().catch(() => {})
                else video.pause()
            },
            { threshold: 0.6 }
        )
        io.observe(video)
        return () => io.disconnect()
    }, [playInView])

    if (isVideoMedia(src)) {
        return (
            <video
                ref={videoRef}
                // #t=0.1 makes iOS paint the first frame instead of a black box
                src={`${src}#t=0.1`}
                muted
                loop
                playsInline
                preload="metadata"
                onMouseEnter={(e) => handleVideoHover(e, true)}
                onMouseLeave={(e) => handleVideoHover(e, false)}
            />
        )
    }
    return <img src={src} alt={alt} draggable="false" decoding="async" />
}

const ExpandIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
)
const CloseIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M6 6l12 12M18 6L6 18" />
    </svg>
)
const ChevronIcon = ({ dir }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d={dir === 'left' ? 'M15 18l-6-6 6-6' : 'M9 6l6 6-6 6'} />
    </svg>
)

// Normalises items and, when categories are given, orders them into chapters
function buildMedia(items, categories) {
    const raw = items
        .map((item) => ({ src: getMediaSource(item), category: typeof item === 'string' ? null : item?.category }))
        .filter((m) => m.src)
    const chapters = []
    let start = 0
    categories.forEach((c) => {
        const chapterItems = raw.filter((m) => m.category === c.id)
        if (!chapterItems.length) return
        chapters.push({ ...c, start, count: chapterItems.length, items: chapterItems })
        start += chapterItems.length
    })
    const ordered = chapters.length ? chapters.flatMap((c, ci) => c.items.map((m) => ({ ...m, chapter: ci }))) : raw
    return { media: ordered.map((m, index) => ({ ...m, index })), chapters }
}

function GalleryCard({ title, meta, description, items = [], categories = [] }) {
    const { media, chapters } = buildMedia(items, categories)
    const hasChapters = chapters.length > 0
    const total = pad(media.length)
    const labelFor = (id) => chapters.find((c) => c.id === id)?.label

    const [filter, setFilter] = useState('all')
    const visible = filter === 'all' ? media : media.filter((m) => m.category === filter)

    const [isOpen, setIsOpen] = useState(false)
    const [shown, setShown] = useState(false)
    const [cur, setCur] = useState(0)
    const [atStart, setAtStart] = useState(true)
    const [atEnd, setAtEnd] = useState(false)
    const [atTrackStart, setAtTrackStart] = useState(true)
    const [atTrackEnd, setAtTrackEnd] = useState(false)

    const cardRef = useRef(null)
    const headRef = useRef(null)
    const stripWrapRef = useRef(null)
    const stripRef = useRef(null)
    const ovRef = useRef(null)
    const ovTitleRef = useRef(null)
    const ovRightRef = useRef(null)
    const trackRef = useRef(null)
    const ovFootRef = useRef(null)
    const closeRef = useRef(null)
    const busyRef = useRef(false)
    const lastFocusRef = useRef(null)

    // Card strip uses Embla with the same feel as the project rows
    const [emblaRef, emblaApi] = useEmblaCarousel(emblaRowOptions)
    const stripDragging = useEmblaDragSuppress(emblaApi)
    useEmblaClickReset(emblaApi)
    const setStripNode = useCallback(
        (node) => {
            stripRef.current = node
            emblaRef(node)
        },
        [emblaRef]
    )
    const stopTrackCoast = useDragScroll(trackRef)

    // Tiles are filtered, so they carry their position in the full list as data-index
    const tiles = () => [...(stripRef.current?.querySelectorAll('.gallery-tile') || [])]
    const tileFor = (i) => stripRef.current?.querySelector(`.gallery-tile[data-index="${i}"]`)
    const slides = () => [...(trackRef.current?.querySelectorAll('.gallery-slide') || [])]
    const curChapter = hasChapters ? media[cur]?.chapter ?? 0 : -1
    const ovParts = () => [ovRightRef.current, trackRef.current, ovFootRef.current]

    const setNames = (on) => {
        const card = [cardRef.current, headRef.current, stripWrapRef.current]
        const overlay = [ovRef.current, ovTitleRef.current]
        const names = [CARD_NAMES.surface, CARD_NAMES.head, CARD_NAMES.strip]
        card.forEach((el, i) => (el.style.viewTransitionName = on === 'card' ? names[i] : ''))
        overlay.forEach((el, i) => (el.style.viewTransitionName = on === 'overlay' ? names[i] : ''))
        ovParts().forEach((el, i) => (el.style.viewTransitionName = on === 'overlay' ? `ov-content-${i}` : ''))
    }
    const setHero = (el) => {
        ;[...tiles(), ...slides()].forEach((n) => (n.style.viewTransitionName = ''))
        if (el) el.style.viewTransitionName = 'hero'
    }
    const clearNames = () => {
        setNames(null)
        setHero(null)
    }

    const updateCounter = () => {
        const track = trackRef.current
        if (!track) return
        setCur(firstVisible(track, slides()))
        setAtTrackStart(track.scrollLeft <= 2)
        setAtTrackEnd(track.scrollLeft >= track.scrollWidth - track.clientWidth - 2)
    }

    const setPageOpen = (open) => {
        const html = document.documentElement
        html.classList.toggle('gallery-open', open)
        const root = document.getElementById('root')
        if (root) root.inert = open
    }

    // Runs a DOM update inside a view transition when available, plain otherwise
    const run = (update, closing) => {
        const html = document.documentElement
        if (!canVT || prefersReducedMotion()) {
            update()
            if (!canVT) requestAnimationFrame(() => requestAnimationFrame(() => setShown(!closing)))
            return Promise.resolve()
        }
        html.classList.toggle('gallery-closing', !!closing)
        const t = document.startViewTransition(update)
        // a resize or tab switch mid-animation aborts it; the DOM update still applies
        t.ready.catch(() => {})
        return t.finished.finally(() => {
            html.classList.remove('gallery-closing')
            clearNames()
        })
    }

    const open = (index) => {
        if (isOpen || busyRef.current) return
        const strip = tiles()
        const i = index ?? (strip.length ? Number(strip[firstVisible(stripRef.current, strip)].dataset.index) : 0)
        lastFocusRef.current = document.activeElement
        busyRef.current = true
        setNames('card')
        setHero(tileFor(i))
        run(() => {
            flushSync(() => setIsOpen(true))
            setPageOpen(true)
            setNames('overlay')
            setHero(slides()[i])
            trackRef.current.scrollLeft = offsetTo(trackRef.current, slides()[i])
            updateCounter()
        }).finally(() => {
            busyRef.current = false
            closeRef.current?.focus({ preventScroll: true })
        })
    }

    const close = async () => {
        if (!isOpen || busyRef.current) return
        busyRef.current = true
        const i = firstVisible(trackRef.current, slides())
        // the tile may be hidden by the current filter; then the card just fades back
        const tile = tileFor(i)
        if (tile && emblaApi) {
            // Bring the matching tile into view so the image lands where it came from. This runs
            // before the transition (the overlay still covers the card) because Embla moves on the
            // next frame, and frames are paused inside a view transition's update.
            const r = tile.getBoundingClientRect()
            const s = stripRef.current.getBoundingClientRect()
            if (r.left < s.left || r.right > s.right) {
                emblaApi.scrollTo(tiles().indexOf(tile), true)
                await new Promise((resolve) => requestAnimationFrame(resolve))
            }
        }
        setNames('overlay')
        setHero(slides()[i])
        run(() => {
            flushSync(() => {
                setIsOpen(false)
                setShown(false)
            })
            setPageOpen(false)
            setNames('card')
            setHero(tile)
        }, true).finally(() => {
            busyRef.current = false
            const last = lastFocusRef.current
            ;(last && last.isConnected ? last : tileFor(i))?.focus({ preventScroll: true })
        })
    }

    const scrollToSlide = (i, instant) => {
        stopTrackCoast.current()
        const track = trackRef.current
        const all = slides()
        const target = all[Math.max(0, Math.min(all.length - 1, i))]
        track.scrollTo({ left: offsetTo(track, target), behavior: instant || prefersReducedMotion() ? 'auto' : 'smooth' })
    }
    const go = (dir, instant) => scrollToSlide(firstVisible(trackRef.current, slides()) + dir, instant)

    const applyFilter = (id) => {
        if (id === filter) return
        setFilter(id)
    }

    // Each chapter's bar fills as you move through it; finished chapters stay full
    const chapterProgress = (c, ci) => {
        if (ci < curChapter) return 1
        if (ci > curChapter) return 0
        return (cur - c.start + 1) / c.count
    }

    // Keyboard: Escape closes, arrows step instantly, Tab stays inside the overlay
    useEffect(() => {
        if (!isOpen) return
        const onKey = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault()
                close()
            } else if (e.key === 'ArrowRight') {
                e.preventDefault()
                go(1, true)
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault()
                go(-1, true)
            } else if (e.key === 'Tab') {
                const f = [...ovRef.current.querySelectorAll('button:not(:disabled)')]
                const first = f[0]
                const last = f[f.length - 1]
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault()
                    last.focus()
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault()
                    first.focus()
                }
            }
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    })

    useEffect(() => () => setPageOpen(false), [])

    // Edge fades follow Embla's scroll position (it re-measures on resize itself)
    useEffect(() => {
        if (!emblaApi) return
        const updateFades = () => {
            const scrollable = emblaApi.scrollSnapList().length > 1
            const progress = emblaApi.scrollProgress()
            setAtStart(!scrollable || progress <= 0.01)
            setAtEnd(!scrollable || progress >= 0.99)
        }
        const raf = requestAnimationFrame(updateFades)
        emblaApi.on('scroll', updateFades).on('reInit', updateFades)
        return () => {
            cancelAnimationFrame(raf)
            emblaApi.off('scroll', updateFades).off('reInit', updateFades)
        }
    }, [emblaApi])

    // a new filter swaps the tiles: re-measure and start from the beginning
    useEffect(() => {
        if (!emblaApi) return
        emblaApi.reInit()
        emblaApi.scrollTo(0, true)
    }, [emblaApi, filter])

    const rafRef = useRef(0)
    const onTrackScroll = () => {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(updateCounter)
    }

    // Clicking anywhere that isn't an image or a control closes, like the site's other overlays.
    // Control groups count as a whole so a near-miss between buttons doesn't close, and the
    // click that ends a mouse drag on the track doesn't count either.
    const onOverlayClick = (e) => {
        if (trackRef.current?.dataset.moved === '1') return
        if (e.target.closest('.gallery-slide, button, .gallery-scrubber, .gallery-nav, .gallery-ov-right')) return
        close()
    }

    const overlayClass = ['gallery-ov', isOpen && 'is-open', !canVT && 'no-vt', shown && 'is-shown']
        .filter(Boolean)
        .join(' ')

    return (
        <>
            <section className="gallery-card" ref={cardRef} aria-label={title}>
                <header className="gallery-head">
                    <div className="gallery-title" ref={headRef}>
                        <span className="gallery-dot" aria-hidden="true" />
                        <h2>{title}</h2>
                        {meta && <span className="gallery-meta">{meta}</span>}
                    </div>
                    <button className="gallery-cta" onClick={() => open()} aria-haspopup="dialog">
                        <span className="gallery-cta-label">View gallery</span>
                        <span className="gallery-cta-count">{total}</span>
                        <span className="gallery-cta-icon" aria-hidden="true">
                            <ExpandIcon />
                        </span>
                    </button>
                </header>
                {hasChapters && (
                    <div className="gallery-filters" role="group" aria-label={`Filter ${title}`}>
                        {[{ id: 'all', label: 'All', count: media.length }, ...chapters].map((c) => (
                            <button
                                key={c.id}
                                className={filter === c.id ? 'gallery-filter is-active' : 'gallery-filter'}
                                aria-pressed={filter === c.id}
                                onClick={() => applyFilter(c.id)}
                            >
                                {c.label}
                                <span className="gallery-filter-count">{c.count}</span>
                            </button>
                        ))}
                    </div>
                )}
                <div className="gallery-strip-wrap" ref={stripWrapRef} data-start={atStart} data-end={atEnd}>
                    <div className="gallery-fade l" />
                    <div className="gallery-fade r" />
                    <div
                        className={stripDragging ? 'gallery-strip is-dragging' : 'gallery-strip'}
                        ref={setStripNode}
                        aria-label={`${title}, drag horizontally`}
                    >
                        <div className="gallery-strip-track">
                            {visible.map((m, n) => (
                                <button
                                    key={`${filter}-${m.index}`}
                                    className="gallery-tile"
                                    data-index={m.index}
                                    style={{ '--gallery-tile-i': n }}
                                    aria-label={`Open item ${m.index + 1} of ${media.length}`}
                                    // Embla swallows the click that ends a drag, so this only fires on a real click
                                    onClick={() => open(m.index)}
                                >
                                    <Media src={m.src} />
                                    {m.category && labelFor(m.category) && (
                                        <span className="gallery-badge">{labelFor(m.category)}</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {createPortal(
                <div
                    className={overlayClass}
                    ref={ovRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label={title}
                    onClick={onOverlayClick}
                >
                    <div className="gallery-ov-top">
                        <div className="gallery-title" ref={ovTitleRef}>
                            <span className="gallery-dot" aria-hidden="true" />
                            <h2>{title}</h2>
                        </div>
                        <div className="gallery-ov-right" ref={ovRightRef}>
                            <span className="gallery-counter" aria-live="polite">
                                <b>{pad(cur + 1)}</b> / {total}
                            </span>
                            <button className="gallery-round" ref={closeRef} onClick={close} aria-label="Close gallery">
                                <CloseIcon />
                            </button>
                        </div>
                    </div>
                    <div
                        className={hasChapters ? 'gallery-track has-chapters' : 'gallery-track'}
                        ref={trackRef}
                        onScroll={onTrackScroll}
                    >
                        {hasChapters
                            ? chapters.map((c, ci) => (
                                  <Fragment key={c.id}>
                                      <div
                                          className={ci === curChapter ? 'gallery-chapter is-active' : 'gallery-chapter'}
                                          aria-hidden="true"
                                      >
                                          <span className="gallery-chapter-num">{pad(ci + 1)}</span>
                                          <span className="gallery-chapter-line" />
                                          <span className="gallery-chapter-label">{c.label}</span>
                                      </div>
                                      {c.items.map((m, k) => (
                                          <div key={c.start + k} className="gallery-slide">
                                              <Media src={m.src} alt={`${c.label} ${k + 1}`} playInView />
                                          </div>
                                      ))}
                                  </Fragment>
                              ))
                            : media.map((m) => (
                                  <div key={m.index} className="gallery-slide">
                                      <Media src={m.src} alt={`${title} ${m.index + 1}`} playInView />
                                  </div>
                              ))}
                    </div>
                    <div className={hasChapters ? 'gallery-ov-foot has-chapters' : 'gallery-ov-foot'} ref={ovFootRef}>
                        {hasChapters ? (
                            <>
                                <div className="gallery-chapter-info" key={curChapter}>
                                    <h3>{chapters[curChapter]?.label}</h3>
                                    <div className="gallery-tools">{chapters[curChapter]?.description}</div>
                                </div>
                                <div className="gallery-scrubber">
                                    {chapters.map((c, ci) => (
                                        <button
                                            key={c.id}
                                            className={ci === curChapter ? 'gallery-scrub is-active' : 'gallery-scrub'}
                                            style={{ flexGrow: c.count }}
                                            onClick={() => scrollToSlide(c.start)}
                                            aria-label={`Jump to ${c.label}`}
                                            aria-current={ci === curChapter ? 'step' : undefined}
                                        >
                                            <span className="gallery-scrub-bar">
                                                <span
                                                    className="gallery-scrub-fill"
                                                    style={{ transform: `scaleX(${chapterProgress(c, ci)})` }}
                                                />
                                            </span>
                                            <span className="gallery-scrub-row">
                                                <span>{c.label}</span>
                                                <span className="gallery-scrub-count">{c.count}</span>
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <h3>{title}</h3>
                                    {meta && <div className="gallery-tools">{meta}</div>}
                                </div>
                                {description ? <p className="gallery-desc">{description}</p> : <span />}
                            </>
                        )}
                        <div className="gallery-nav">
                            <button className="gallery-round" onClick={() => go(-1)} disabled={atTrackStart} aria-label="Previous item">
                                <ChevronIcon dir="left" />
                            </button>
                            <button className="gallery-round" onClick={() => go(1)} disabled={atTrackEnd} aria-label="Next item">
                                <ChevronIcon dir="right" />
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    )
}

export default GalleryCard
