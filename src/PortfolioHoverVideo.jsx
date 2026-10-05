import { useEffect, useRef, useState } from 'react'

/**
 * True only while the pointer is down and Embla is actually scrolling.
 * Avoids killing hover on a simple click.
 */
export function useEmblaDragSuppress(emblaApi) {
    const [suppressHover, setSuppressHover] = useState(false)

    useEffect(() => {
        if (!emblaApi) return

        let pointerIsDown = false

        const onPointerDown = () => {
            pointerIsDown = true
        }

        const onScroll = () => {
            if (pointerIsDown) setSuppressHover(true)
        }

        const onPointerUp = () => {
            pointerIsDown = false
            setSuppressHover(false)
        }

        emblaApi.on('pointerDown', onPointerDown)
        emblaApi.on('scroll', onScroll)
        emblaApi.on('pointerUp', onPointerUp)

        return () => {
            emblaApi.off('pointerDown', onPointerDown)
            emblaApi.off('scroll', onScroll)
            emblaApi.off('pointerUp', onPointerUp)
        }
    }, [emblaApi])

    return suppressHover
}

/**
 * Hover-to-play video.
 * Playback is driven only by whether the pointer is over the tile.
 * A short delay ignores drag flicker, and a failed play is retried while
 * the pointer is still inside so a seek/pause race cannot leave it stuck.
 */
function PortfolioHoverVideo({
    videoSrc,
    thumbnail,
    className = 's-default',
    suppressHover = false,
}) {
    const videoRef = useRef(null)
    const hoveringRef = useRef(false)
    const playTimeoutRef = useRef(null)
    const [showPoster, setShowPoster] = useState(true)

    const clearPlayTimeout = () => {
        if (playTimeoutRef.current) {
            window.clearTimeout(playTimeoutRef.current)
            playTimeoutRef.current = null
        }
    }

    const attemptPlay = (retriesLeft = 4) => {
        const video = videoRef.current
        if (!video || !hoveringRef.current) return

        video.play().catch((error) => {
            if (!hoveringRef.current || retriesLeft <= 0) return
            // Seek-to-start or a previous pause often aborts the first play().
            if (error?.name === 'AbortError') {
                playTimeoutRef.current = window.setTimeout(() => {
                    playTimeoutRef.current = null
                    attemptPlay(retriesLeft - 1)
                }, 60)
            }
        })
    }

    useEffect(() => () => clearPlayTimeout(), [])

    const handleEnter = () => {
        hoveringRef.current = true
        clearPlayTimeout()
        playTimeoutRef.current = window.setTimeout(() => {
            playTimeoutRef.current = null
            attemptPlay()
        }, 80)
    }

    const handleLeave = () => {
        hoveringRef.current = false
        clearPlayTimeout()
        const video = videoRef.current
        if (!video) return
        video.pause()
        try {
            video.currentTime = 0
        } catch {
            // Metadata may not be ready yet.
        }
        setShowPoster(true)
    }

    if (suppressHover) {
        return <img src={thumbnail} alt="" className={className} />
    }

    return (
        <div
            className={`hover-video-player ${className}`}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            <video
                ref={videoRef}
                src={videoSrc}
                className={className}
                muted
                loop
                playsInline
                preload="metadata"
                onPlaying={() => {
                    if (hoveringRef.current) setShowPoster(false)
                }}
                onPause={() => setShowPoster(true)}
            />
            <img
                src={thumbnail}
                alt=""
                className={className}
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 1,
                    opacity: showPoster ? 1 : 0,
                    visibility: showPoster ? 'visible' : 'hidden',
                    transition: 'opacity 200ms ease',
                    pointerEvents: 'none',
                }}
            />
        </div>
    )
}

export default PortfolioHoverVideo
