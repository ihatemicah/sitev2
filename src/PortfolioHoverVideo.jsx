import { useEffect, useState } from 'react'
import HoverVideoPlayer from 'react-hover-video-player'

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
 * Hardened hover video for carousels:
 * - short start delay reduces play/pause AbortErrors while Embla drags
 * - while suppressHover is true, swap to a static thumbnail so play state can't get stuck
 */
function PortfolioHoverVideo({
    videoSrc,
    thumbnail,
    className = 's-default',
    suppressHover = false,
}) {
    // Unmount the player during drag — resets any stuck isHovering/isPlaying state
    if (suppressHover) {
        return <img src={thumbnail} alt="" className={className} />
    }

    return (
        <HoverVideoPlayer
            videoSrc={videoSrc}
            pausedOverlay={<img src={thumbnail} alt="" className={className} />}
            className={className}
            restartOnPaused
            unloadVideoOnPaused={false}
            preload="metadata"
            playbackStartDelay={80}
        />
    )
}

export default PortfolioHoverVideo
