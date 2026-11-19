import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import Header from './Header.jsx'
import FeatureProjects from './Featureprojects.jsx'
import StickyNav from './StickyNav.jsx'
import Links from './Links.jsx'
import CreativeCanvas from './CreativeCanvas.jsx'
import Companies from './Companies.jsx'
import PersonalBio from './PersonalBio.jsx'
import Footer from './Footer.jsx'
import { row1Media, row2Media } from './portfolioMedia.js'
import useEmblaCarousel from 'embla-carousel-react'
import PortfolioHoverVideo, {
    useEmblaDragSuppress,
} from './PortfolioHoverVideo.jsx'
import { emblaRowOptions, useEmblaClickReset } from './embla.js'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'

// Mirrors --ease-smooth-out in index.css (transitions.dev motion tokens).
const smoothOut = CustomEase.create('smoothOut', '0.22,1,0.36,1')

// Read a duration token from :root as seconds for GSAP.
// The build minifier rewrites 350ms to .35s, so the unit has to be read too.
const tokenSeconds = (name, fallbackMs) => {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    const value = parseFloat(raw)
    if (!Number.isFinite(value)) return fallbackMs / 1000
    if (raw.endsWith('ms')) return value / 1000
    if (raw.endsWith('s')) return value
    return fallbackMs / 1000
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
            <img src={still} alt="" className="s-default" decoding="async" />
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
    const overlayRef = useRef(null)
    const overlayPanelRef = useRef(null)
    const overlayOpenRef = useRef(false)
    const overlayTlRef = useRef(null)
    const pointerStartRef = useRef({ x: 0, y: 0 })
    const pointerDraggedRef = useRef(false)

    const [overlayVisible, setOverlayVisible] = useState(false)

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
            <img
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

    const toggleOverlay = useCallback(() => {
        const backdrop = overlayRef.current
        const panel = overlayPanelRef.current
        if (!backdrop || !panel) return

        const reduceMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches

        // Interrupting mid-animation: stop the running timeline and continue
        // from wherever the panel currently is.
        overlayTlRef.current?.kill()

        if (overlayOpenRef.current) {
            overlayOpenRef.current = false
            const duration = tokenSeconds('--duration-medium', 350)
            const tl = gsap.timeline({
                onComplete: () => {
                    backdrop.style.visibility = 'hidden'
                    setOverlayVisible(false)
                    gsap.set(panel, { yPercent: 100 })
                },
            })
            if (!reduceMotion) {
                tl.to(panel, { yPercent: 100, duration, ease: smoothOut, force3D: true }, 0)
            }
            overlayTlRef.current = tl
        } else {
            const opening = backdrop.style.visibility !== 'visible'
            overlayOpenRef.current = true
            backdrop.style.visibility = 'visible'
            setOverlayVisible(true)
            if (opening) {
                gsap.set(panel, { yPercent: reduceMotion ? 0 : 100 })
            }
            const tl = gsap.timeline()
            if (!reduceMotion) {
                tl.to(panel, {
                    yPercent: 0,
                    duration: tokenSeconds('--duration-slow', 400) + 0.1,
                    ease: smoothOut,
                    force3D: true,
                })
            }
            overlayTlRef.current = tl
        }
    }, [])

    useEffect(() => {
        if (!overlayRef.current || !overlayPanelRef.current) return
        gsap.set(overlayPanelRef.current, { yPercent: 100 })
    }, [])

    useEffect(() => () => overlayTlRef.current?.kill(), [])

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

    const handleRowClick = () => {
        if (pointerDraggedRef.current) return
        toggleOverlay()
    }

    return (
        <>
            <div
                className="embla-row embla-row--expandable"
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
                ref={overlayRef}
                className="creative-overlay embla-row-overlay"
                onClick={toggleOverlay}
                style={{
                    visibility: overlayVisible ? 'visible' : 'hidden',
                }}
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
    return (
        <>
            <Header />
            <StickyNav />
            <FeatureProjects />
            <ExpandableEmblaRow title="" mediaItems={row1Media} />
            <ExpandableEmblaRow title="" mediaItems={row2Media} />
            <Links />
            <CreativeCanvas />
            <div className="companies-why">
                <Companies />
                <PersonalBio />
            </div>
            <Footer />
            <div className="page-edge" aria-hidden="true" />
        </>
    )
}

export default App
