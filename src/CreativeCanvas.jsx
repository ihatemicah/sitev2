import { useState, useRef, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import './Components.css'

const defaultImages1 = [
    "https://zone-multi.b-cdn.net/Ai%20Images/image%2011.jpg",
    "https://zone-multi.b-cdn.net/Ai%20Images/image%2012.jpg",
    "https://zone-multi.b-cdn.net/Ai%20Images/image%2021.jpg",
    "https://zone-multi.b-cdn.net/Ai%20Images/image%202.jpg",
    "https://zone-multi.b-cdn.net/Ai%20Images/image%2024.jpg",
    "https://zone-multi.b-cdn.net/Ai%20Images/image%2025.jpg",
    "https://zone-multi.b-cdn.net/Ai%20Images/image%204.jpg",
    "https://zone-multi.b-cdn.net/Ai%20Images/image%205.jpg",
    "https://zone-multi.b-cdn.net/Ai%20Images/image%203.jpg",

    "https://zone-multi.b-cdn.net/Ai%20Images/image%2026.jpg",
]

const defaultImages2 = [
    "https://zone-multi.b-cdn.net/proof-of-life/photo-1.jpg",
    "https://zone-multi.b-cdn.net/proof-of-life/photo-5.jpg",
    "https://zone-multi.b-cdn.net/proof-of-life/AYN%20THOR.mp4",
    "https://zone-multi.b-cdn.net/proof-of-life/photo-2.jpg",
    "https://zone-multi.b-cdn.net/proof-of-life/photo-3.jpg",
    "https://zone-multi.b-cdn.net/proof-of-life/Crimson%20Desert.mp4",
    "https://zone-multi.b-cdn.net/proof-of-life/photo-4.jpg",
    "https://zone-multi.b-cdn.net/proof-of-life/Work%20Example%20-%201.mp4",
    "https://zone-multi.b-cdn.net/proof-of-life/photo-7.jpg",
    "https://zone-multi.b-cdn.net/proof-of-life/photo-8.jpg",
    "https://zone-multi.b-cdn.net/proof-of-life/photo-2.jpg",


]

function CreativeCanvas({ imageArrays = [defaultImages1, defaultImages2] }) {
    const [activeContainer, setActiveContainer] = useState(null)
    const overlayRef = useRef(null)

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

    const handleContainerClick = (containerIndex) => {
        if (activeContainer === containerIndex) {
            // Close overlay - slide down and out
            gsap.to(overlayRef.current, {
                y: '100%',
                duration: 0.5,
                ease: CustomEase.create("custom", "M0,0 C0.274,0 -0.139,1 1,1 "),
                onComplete: () => {
                    setActiveContainer(null)
                }
            })
        } else {
            // Open overlay - slide up from below
            setActiveContainer(containerIndex)
            gsap.to(overlayRef.current, {
                y: 0,
                xPercent: -50,
                duration: 0.5,
                ease: CustomEase.create("custom", "M0,0 C0.274,0 -0.139,1 1,1 "),
            })
        }
    }

    useEffect(() => {
        // Ensure initial position is set (hidden below screen)
        if (overlayRef.current) {
            gsap.set(overlayRef.current, {
                y: '100%',
                xPercent: -50
            })
        }
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
                        <img src="/src/assets/circle.svg" alt="circle shape" className='circle-icon' />
                        <p> AI Creations</p>
                    </div>
                    <img src="/src/assets/zoom.svg" alt="viewfinder icon" className='viewfinder-icon' />
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
                        <img src="/src/assets/circle.svg" alt="circle shape" className='circle-icon' />
                        <p> Proof of life </p>
                    </div>
                    <img src="/src/assets/zoom.svg" alt="viewfinder icon" className='viewfinder-icon' />
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
                className="creative-overlay"
                onClick={() => activeContainer && handleContainerClick(activeContainer)}
                style={{ visibility: activeContainer ? 'visible' : 'hidden' }}
            >
                <div className="creative-overlay-content">
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
