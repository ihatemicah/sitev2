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
import HoverVideoPlayer from 'react-hover-video-player'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'

const overlayEase = CustomEase.create('custom', 'M0,0 C0.274,0 -0.139,1 1,1 ')

function ExpandableEmblaRow({ title = '', mediaItems = [] }) {
    const overlayRef = useRef(null)
    const overlayPanelRef = useRef(null)
    const overlayOpenRef = useRef(false)
    const pointerStartRef = useRef({ x: 0, y: 0 })
    const pointerDraggedRef = useRef(false)

    const [overlayVisible, setOverlayVisible] = useState(false)

    const [emblaRef] = useEmblaCarousel({
        loop: false,
        align: 'start',
        dragFree: true,
    })

    const [overlayEmblaRef] = useEmblaCarousel({
        loop: false,
        align: 'start',
        dragFree: true,
    })

    const renderSlideMedia = (item) => {
        if (item.type === 'video') {
            return (
                <HoverVideoPlayer
                    key={`video-${item.videoSrc}`}
                    videoSrc={item.videoSrc}
                    pausedOverlay={
                        <img src={item.thumbnail} alt="" className="s-default" />
                    }
                    className="s-default"
                    restartOnPaused
                    unloadVideoOnPaused={false}
                    preload="metadata"
                />
            )
        }
        return <img src={item.src} alt="" className="s-default" />
    }

    const toggleOverlay = useCallback(() => {
        const backdrop = overlayRef.current
        const panel = overlayPanelRef.current
        if (!backdrop || !panel) return

        if (overlayOpenRef.current) {
            const tl = gsap.timeline({
                onComplete: () => {
                    overlayOpenRef.current = false
                    backdrop.style.visibility = 'hidden'
                    setOverlayVisible(false)
                    gsap.set(panel, { yPercent: 100 })
                    gsap.set(backdrop, { opacity: 0 })
                },
            })
            tl.to(panel, {
                yPercent: 100,
                duration: 0.2,
                ease: overlayEase,
            })
            tl.to(
                backdrop,
                {
                    opacity: 0,
                    duration: 0.12,
                    ease: 'power2.in',
                },
                '-=0.07'
            )
        } else {
            overlayOpenRef.current = true
            backdrop.style.visibility = 'visible'
            setOverlayVisible(true)
            gsap.set(panel, { yPercent: 100 })
            gsap.set(backdrop, { opacity: 0, xPercent: -50 })
            const tl = gsap.timeline()
            tl.to(backdrop, {
                opacity: 1,
                duration: 0.2,
                ease: 'power2.out',
            })
            tl.to(
                panel,
                {
                    yPercent: 0,
                    duration: 0.45,
                    ease: overlayEase,
                },
                '-=0.15'
            )
        }
    }, [])

    useEffect(() => {
        if (!overlayRef.current || !overlayPanelRef.current) return
        gsap.set(overlayRef.current, { opacity: 0, xPercent: -50 })
        gsap.set(overlayPanelRef.current, { yPercent: 100 })
    }, [])

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
                <div className="embla" ref={emblaRef}>
                    <div className="embla__container">
                        {mediaItems.map((item, index) => (
                            <div key={index} className="embla__slide">
                                {renderSlideMedia(item)}
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
                <div ref={overlayPanelRef} className="creative-overlay-content">
                    <div className="overlay-layout">
                        <div>
                            <div
                                className="creative-overlay-embla embla-row-expand-overlay"
                                ref={overlayEmblaRef}
                            >
                                <div className="creative-overlay-embla__container">
                                    {mediaItems.map((item, index) => (
                                        <div
                                            key={index}
                                            className="creative-overlay-embla__slide"
                                        >
                                            {renderSlideMedia(item)}
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
      <CreativeCanvas/>
      <div className='companies-why'>
        <Companies/>
        <PersonalBio/>
      </div>
      <Footer/>
    </>
  )
}

export default App
