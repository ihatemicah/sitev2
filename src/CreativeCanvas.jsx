import { useState, useRef, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import './Components.css'
import circleIcon from './assets/circle.svg'
import zoomIcon from './assets/zoom.svg'
import { creativeAiImages, creativeProofOfLife } from './portfolioMedia.js'

const overlayEase = CustomEase.create('custom', 'M0,0 C0.274,0 -0.139,1 1,1 ')

function CreativeCanvas({
    imageArrays = [creativeAiImages, creativeProofOfLife],
}) {
    const [activeContainer, setActiveContainer] = useState(null)
    const overlayRef = useRef(null)
    const overlayPanelRef = useRef(null)

    const [emblaRef1] = useEmblaCarousel({ 
        loop: false,
        align: 'start',
        dragFree: true
    })

    const [emblaRef2] = useEmblaCarousel({ 
        loop: false,
        align: 'start',
        dragFree: true
    })

    const [overlayEmblaRef] = useEmblaCarousel({ 
        loop: false,
        align: 'start',
        dragFree: true
    })

    const images1 = imageArrays[0] || []
    const images2 = imageArrays[1] || []

    const getMediaSource = (item) => (typeof item === 'string' ? item : item?.src || '')

    const isVideoMedia = (item) => {
        const src = getMediaSource(item)
        return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(src)
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

    const renderMedia = (item) => {
        const src = getMediaSource(item)
        if (!src) return null

        if (isVideoMedia(item)) {
            return (
                <video
                    src={src}
                    className='s-default'
                    muted
                    loop
                    playsInline
                    preload='metadata'
                    onMouseEnter={(event) => handleVideoHover(event, true)}
                    onMouseLeave={(event) => handleVideoHover(event, false)}
                />
            )
        }

        return <img src={src} alt="" className='s-default' />
    }

    const runCloseOverlay = () => {
        const backdrop = overlayRef.current
        const panel = overlayPanelRef.current
        if (!backdrop || !panel) return

        const tl = gsap.timeline({
            onComplete: () => {
                backdrop.style.visibility = 'hidden'
                setActiveContainer(null)
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
    }

    const runOpenOverlay = () => {
        const backdrop = overlayRef.current
        const panel = overlayPanelRef.current
        if (!backdrop || !panel) return

        backdrop.style.visibility = 'visible'
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

    const handleContainerClick = (containerIndex) => {
        if (activeContainer === containerIndex) {
            runCloseOverlay()
            return
        }

        if (activeContainer === null) {
            setActiveContainer(containerIndex)
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    runOpenOverlay()
                })
            })
            return
        }

        setActiveContainer(containerIndex)
    }

    useEffect(() => {
        if (!overlayRef.current || !overlayPanelRef.current) return
        gsap.set(overlayRef.current, { opacity: 0, xPercent: -50 })
        gsap.set(overlayPanelRef.current, { yPercent: 100 })
    }, [])

    return (
        <div className="creative-canvas">
            <div 
                className='creative-container' 
                onClick={() => handleContainerClick(1)}
                style={{ cursor: 'pointer' }}
            >
                <div className='upper-container'>
                    <div className='title-container'>
                        <img src={circleIcon} alt="circle shape" className='circle-icon' />
                        <p> AI Creations</p>
                    </div>
                    <img src={zoomIcon} alt="viewfinder icon" className='viewfinder-icon' />
                </div>
                <div className='lower-container'>
                    <div className="creative-embla" ref={emblaRef1}>
                        <div className="creative-embla__container">
                            {images1.map((src, index) => (
                                <div key={index} className="creative-embla__slide">
                                    {renderMedia(src)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div 
                className='creative-container'
                onClick={() => handleContainerClick(2)}
                style={{ cursor: 'pointer' }}
            >
                <div className='upper-container'>
                    <div className='title-container'>
                        <img src={circleIcon} alt="circle shape" className='circle-icon' />
                        <p> Proof of life </p>
                    </div>
                    <img src={zoomIcon} alt="viewfinder icon" className='viewfinder-icon' />
                </div>
                <div className='lower-container'>
                    <div className="creative-embla" ref={emblaRef2}>
                        <div className="creative-embla__container">
                            {images2.map((src, index) => (
                                <div key={index} className="creative-embla__slide">
                                    {renderMedia(src)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div 
                ref={overlayRef}
                className="creative-overlay creative-overlay--panel-rise"
                onClick={() => activeContainer && handleContainerClick(activeContainer)}
                style={{ visibility: activeContainer ? 'visible' : 'hidden' }}
            >
                <div ref={overlayPanelRef} className="creative-overlay-content">
                    <div className='overlay-layout'>
                        <div>
                        {activeContainer === 1 && (
                                <div className="creative-overlay-embla" ref={overlayEmblaRef}>
                                    <div className="creative-overlay-embla__container">
                                        {images1.map((src, index) => (
                                            <div key={index} className="creative-overlay-embla__slide">
                                                {renderMedia(src)}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        {activeContainer === 2 && (
                                <>
                                    <div className="creative-overlay-embla" ref={overlayEmblaRef}>
                                        <div className="creative-overlay-embla__container">
                                            {images2.map((src, index) => (
                                                <div key={index} className="creative-overlay-embla__slide">
                                                    {renderMedia(src)}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Space for different content */}
                                    <div className="creative-overlay-text-content">
                                        {/* Additional content can go here */}
                                    </div>
                                </>
                            )}
                        </div>
                        {activeContainer === 1 && (
                            <div className='overlay-description'>
                                <div className='overlay-title'>
                                    <h2>Ai creations</h2>
                                    <p> Midjourney + Local Stable Diffusion</p>
                                </div>
                                <div className='ai-description'>
                                    <p> Leveraging advanced AI workflows to create bespoke, brand-aligned visual assets that elevate your identity. </p>
                                </div>
                            </div>
                        )}
                        {activeContainer === 2 && (
                            <div className='overlay-description'>
                                <div className='overlay-title'>
                                    <h2>Ai creations 2</h2>
                                    <p> Description for container 2</p>
                                </div>
                                <div className='ai-description'>
                                    <p> Different description content</p>
                                </div>
                            </div>
                        )}
                    </div>
                    

                </div>
            </div>
        </div>
    )
}

export default CreativeCanvas
