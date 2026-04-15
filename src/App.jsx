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
import useEmblaCarousel from 'embla-carousel-react'
import HoverVideoPlayer from 'react-hover-video-player'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'

const overlayEase = CustomEase.create('custom', 'M0,0 C0.274,0 -0.139,1 1,1 ')

function ExpandableEmblaRow({ title = '', mediaItems = [] }) {
    const overlayRef = useRef(null)
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
        if (!overlayRef.current) return

        if (overlayOpenRef.current) {
            gsap.to(overlayRef.current, {
                y: '100%',
                duration: 0.5,
                ease: overlayEase,
                onComplete: () => {
                    overlayOpenRef.current = false
                    setOverlayVisible(false)
                },
            })
        } else {
            overlayOpenRef.current = true
            setOverlayVisible(true)
            requestAnimationFrame(() => {
                if (!overlayRef.current) return
                gsap.to(overlayRef.current, {
                    y: 0,
                    xPercent: -50,
                    duration: 0.5,
                    ease: overlayEase,
                })
            })
        }
    }, [])

    useEffect(() => {
        if (!overlayRef.current) return
        gsap.set(overlayRef.current, {
            y: '100%',
            xPercent: -50,
        })
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
                <div className="creative-overlay-content">
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
  // Define your media arrays
  const row1Media = [
    { type: 'image', src: "https://zone-multi.b-cdn.net/Static/rows/SKN_C.jpg" },
    { type: 'image', src: "https://zone-multi.b-cdn.net/Static/rows/SKIN-GLASS_C.jpg" },
    { type: 'image', src: "https://zone-multi.b-cdn.net/Static/rows/SKIN-MACRO-C.jpg" },
    { type: 'image', src: "https://zone-multi.b-cdn.net/Static/rows/octane-exp.jpg" },



    { type: 'image', src: "https://zone-multi.b-cdn.net/Static/rows/multiple-view.jpg" },
    { type: 'video', videoSrc: "https://zone-multi.b-cdn.net/Motion%20Projects/rows/Miffy-Motion-2.mp4", thumbnail: "https://zone-multi.b-cdn.net/Static/rows/Miffy-Thumbnail.jpg" },
    { type: 'image', src: "https://zone-multi.b-cdn.net/Static/rows/version-u.jpg" },
    { type: 'image', src: "https://zone-multi.b-cdn.net/Static/rows/zest_a.jpg" },
    { type: 'image', src: "https://zone-multi.b-cdn.net/Static/Logo%20Presentation%20-%20Digital.jpg" },
  ]

  const row2Media = [
    { type: 'video', videoSrc: "https://zone-multi.b-cdn.net/Motion%20Projects/rows/metalheart-1-090c1bed25e0d082280f05a73a2ce4af.webm", thumbnail: "https://zone-multi.b-cdn.net/Static/rows/delicate.png" },

    { type: 'image', src: "https://zone-multi.b-cdn.net/Static/rows/ram-dass-syf-02ea4ecb748b32878e1fd68465717492.jpg" },
    { type: 'image', src: "https://zone-multi.b-cdn.net/Static/rows/silence-mind-sticker-0cfa778762a90f1766c31961d6e27b6d.jpg" },
    { type: 'video', videoSrc: "https://zone-multi.b-cdn.net/Motion%20Projects/rows/weekend-carti.mp4", thumbnail: "https://zone-multi.b-cdn.net/Static/rows/weekend-carti-frame.jpg" },
    { type: 'video', videoSrc: "https://zone-multi.b-cdn.net/Motion%20Projects/Umbrella%20-%201.mp4", thumbnail: "https://zone-multi.b-cdn.net/Static/Vial%20-%201.jpg" },
    { type: 'video', videoSrc: "https://zone-multi.b-cdn.net/Motion%20Projects/rows/joi-blokes-social-c.mp4", thumbnail: "https://zone-multi.b-cdn.net/Static/rows/ScreamCream.jpg" },
    { type: 'image', src: "https://zone-multi.b-cdn.net/Static/rows/ISOKNOCK-1.png" },

    
  ]

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
