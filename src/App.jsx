import { useEffect, useRef, useState } from 'react'
import './App.css'
import Header from './Header.jsx'
import FeatureProjects from './Featureprojects.jsx'
import StickyNav from './StickyNav.jsx'
import Links from './Links.jsx'
import CreativeCanvas from './CreativeCanvas.jsx'
import BunnyImage from './BunnyImage.jsx'
import Companies from './Companies.jsx'
import PersonalBio from './PersonalBio.jsx'
import Footer from './Footer.jsx'
import { row1Media, row2Media } from './portfolioMedia.js'
import useEmblaCarousel from 'embla-carousel-react'
import PortfolioHoverVideo, {
    useEmblaDragSuppress,
} from './PortfolioHoverVideo.jsx'
import { emblaRowOptions, useEmblaClickReset } from './embla.js'
import { flushSync } from 'react-dom'
import { useReveal } from './useReveal.js'

const canVT =
    typeof document !== 'undefined' &&
    typeof document.startViewTransition === 'function'
const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve))
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// View-transition names. They only exist on the row being animated, so both rows can share them.
const HERO = 'row-hero'
const REST = 'row-rest'

// The slide sitting closest to the carousel's left edge
function firstVisible(api) {
    if (!api) return 0
    const left = api.rootNode().getBoundingClientRect().left
    let best = 0
    let bestD = Infinity
    api.slideNodes().forEach((el, i) => {
        const d = Math.abs(el.getBoundingClientRect().left - left)
        if (d < bestD) {
            bestD = d
            best = i
        }
    })
    return best
}

// Embla scrolls by snap, and the last few slides can share one snap
function snapFor(api, slideIndex) {
    const registry = api.internalEngine().slideRegistry
    const snap = registry.findIndex((slides) => slides.includes(slideIndex))
    return snap === -1 ? 0 : snap
}

function OverlayRowSlide({ item, suppressHover }) {
    const [playing, setPlaying] = useState(false)

    useEffect(() => {
        if (suppressHover) setPlaying(false)
    }, [suppressHover])

    const still = item.type === 'video' ? item.thumbnail : item.src

    return (
        <div
            className="overlay-row-slide"
            onMouseEnter={() => {
                if (item.type === 'video' && !suppressHover) setPlaying(true)
            }}
            onMouseLeave={() => setPlaying(false)}
        >
            <BunnyImage src={still} alt="" className="s-default" decoding="async" />
            {playing ? (
                <PortfolioHoverVideo
                    videoSrc={item.videoSrc}
                    thumbnail={item.thumbnail}
                    className="s-default"
                    suppressHover={suppressHover}
                    autoPlay
                />
            ) : null}
        </div>
    )
}

function ExpandableEmblaRow({ title = '', mediaItems = [] }) {
    const overlayPanelRef = useRef(null)
    const busyRef = useRef(false)
    const pointerStartRef = useRef({ x: 0, y: 0 })
    const pointerDraggedRef = useRef(false)

    const [isOpen, setIsOpen] = useState(false)

    const [emblaRef, emblaApi] = useEmblaCarousel(emblaRowOptions)

    const [overlayEmblaRef, overlayEmblaApi] = useEmblaCarousel(emblaRowOptions)

    const rowSuppressHover = useEmblaDragSuppress(emblaApi)
    const overlaySuppressHover = useEmblaDragSuppress(overlayEmblaApi)
    useEmblaClickReset(emblaApi)
    useEmblaClickReset(overlayEmblaApi)

    const renderSlideMedia = (item, suppressHover = false) => {
        if (item.type === 'video') {
            return (
                <PortfolioHoverVideo
                    videoSrc={item.videoSrc}
                    thumbnail={item.thumbnail}
                    className="s-default"
                    suppressHover={suppressHover}
                />
            )
        }
        return (
            <BunnyImage
                src={item.src}
                alt=""
                className="s-default"
                decoding="async"
            />
        )
    }

    // The closed overlay, and every slide until it is hovered, stays an image.
    // Mounting a video for every slide at the end of the open was the hitch.
    const renderOverlaySlideMedia = (item, suppressHover) => (
        <OverlayRowSlide item={item} suppressHover={suppressHover} />
    )

    const rowSlides = () => emblaApi?.slideNodes() ?? []
    const overlaySlides = () => overlayEmblaApi?.slideNodes() ?? []

    const clearNames = () => {
        ;[...rowSlides(), ...overlaySlides()].forEach((el) => {
            el.style.viewTransitionName = ''
        })
        if (overlayPanelRef.current) overlayPanelRef.current.style.viewTransitionName = ''
    }

    // Runs a DOM update inside a view transition when available. Without one, or with
    // reduced motion, the overlay's CSS fade (Components.css) is the whole animation.
    const run = (update, closing = false) => {
        if (!canVT || prefersReducedMotion()) {
            update()
            return Promise.resolve()
        }
        const html = document.documentElement
        html.classList.add('row-vt')
        html.classList.toggle('row-vt-closing', closing)
        const t = document.startViewTransition(update)
        // a resize or tab switch mid-animation aborts it; the DOM update still applies
        t.ready.catch(() => {})
        return t.finished
            .catch(() => {})
            .finally(() => html.classList.remove('row-vt', 'row-vt-closing'))
    }

    // The clicked image grows out of the row into its place in the overlay
    const open = async (index) => {
        if (isOpen || busyRef.current || !emblaApi || !overlayEmblaApi) return
        busyRef.current = true
        const i = index ?? firstVisible(emblaApi)

        // Line the overlay carousel up on the clicked image while it is still hidden,
        // and decode its larger copy so it doesn't stutter on the first frames.
        overlayEmblaApi.scrollTo(snapFor(overlayEmblaApi, i), true)
        const img = overlaySlides()[i]?.querySelector('img')
        await Promise.race([img?.decode().catch(() => {}), wait(100)])
        // Embla applies the jump on the next frame
        await nextFrame()

        const tile = rowSlides()[i]
        if (tile) tile.style.viewTransitionName = HERO
        await run(() => {
            flushSync(() => setIsOpen(true))
            if (tile) tile.style.viewTransitionName = ''
            const target = overlaySlides()[i]
            if (target) target.style.viewTransitionName = HERO
            if (overlayPanelRef.current) overlayPanelRef.current.style.viewTransitionName = REST
        })
        clearNames()
        busyRef.current = false
    }

    // The image in view shrinks back into its tile in the row
    const close = async () => {
        if (!isOpen || busyRef.current || !emblaApi || !overlayEmblaApi) return
        busyRef.current = true
        const i = firstVisible(overlayEmblaApi)
        const tile = rowSlides()[i]

        // Bring the matching tile into view first. The overlay still covers the row,
        // so the jump isn't seen, and the image lands where it came from.
        if (tile) {
            const r = tile.getBoundingClientRect()
            const v = emblaApi.rootNode().getBoundingClientRect()
            if (r.left < v.left || r.right > v.right) {
                emblaApi.scrollTo(snapFor(emblaApi, i), true)
                await nextFrame()
            }
        }

        const source = overlaySlides()[i]
        if (source) source.style.viewTransitionName = HERO
        await run(() => {
            flushSync(() => setIsOpen(false))
            if (source) source.style.viewTransitionName = ''
            if (tile) tile.style.viewTransitionName = HERO
        }, true)
        clearNames()
        busyRef.current = false
    }

    const handleRowPointerDown = (event) => {
        pointerStartRef.current = { x: event.clientX, y: event.clientY }
        pointerDraggedRef.current = false

        const onMove = (e) => {
            if (
                Math.abs(e.clientX - pointerStartRef.current.x) > 10 ||
                Math.abs(e.clientY - pointerStartRef.current.y) > 10
            ) {
                pointerDraggedRef.current = true
            }
        }
        const onUp = () => {
            window.removeEventListener('pointermove', onMove)
            window.removeEventListener('pointerup', onUp)
        }
        window.addEventListener('pointermove', onMove)
        window.addEventListener('pointerup', onUp, { once: true })
    }

    const handleRowClick = (event) => {
        if (pointerDraggedRef.current) return
        // Open on the tile that was clicked; a click between tiles uses the first in view
        const slide =
            event.target instanceof Element
                ? event.target.closest('.embla__slide')
                : null
        const index = slide ? rowSlides().indexOf(slide) : -1
        open(index === -1 ? undefined : index)
    }

    return (
        <>
            <div
                className="embla-row embla-row--expandable"
                data-reveal
                onPointerDown={handleRowPointerDown}
                onClick={handleRowClick}
                style={{ cursor: 'pointer' }}
            >
                {title && <p className="mixed-projects">{title}</p>}
                <div
                    className={
                        rowSuppressHover ? 'embla is-dragging' : 'embla'
                    }
                    ref={emblaRef}
                >
                    <div className="embla__container">
                        {mediaItems.map((item, index) => (
                            <div key={index} className="embla__slide">
                                {renderSlideMedia(item, rowSuppressHover)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div
                className={
                    isOpen
                        ? 'creative-overlay embla-row-overlay is-open'
                        : 'creative-overlay embla-row-overlay'
                }
                onClick={close}
            >
                <div className="embla-row-overlay__blur" aria-hidden="true" />
                <div ref={overlayPanelRef} className="creative-overlay-content">
                    <div className="overlay-layout">
                        <div>
                            <div
                                className={
                                    overlaySuppressHover
                                        ? 'creative-overlay-embla embla-row-expand-overlay is-dragging'
                                        : 'creative-overlay-embla embla-row-expand-overlay'
                                }
                                ref={overlayEmblaRef}
                            >
                                <div className="creative-overlay-embla__container">
                                    {mediaItems.map((item, index) => (
                                        <div
                                            key={index}
                                            className="creative-overlay-embla__slide"
                                        >
                                            {renderOverlaySlideMedia(item, overlaySuppressHover)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function App() {
    useReveal()

    return (
        <>
            <Header />
            <StickyNav />
            <FeatureProjects />
            <ExpandableEmblaRow title="" mediaItems={row1Media} />
            <ExpandableEmblaRow title="" mediaItems={row2Media} />
            <Links />
            <CreativeCanvas />
            <div className="companies-why" data-reveal>
                <Companies />
                <PersonalBio />
            </div>
            <Footer />
            <div className="page-edge" aria-hidden="true" />
        </>
    )
}

export default App
