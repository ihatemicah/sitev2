import useEmblaCarousel from 'embla-carousel-react'
import HoverVideoPlayer from 'react-hover-video-player'
import './Components.css'

function EmblaRow({ title = '', mediaItems = [] }) {
    const [emblaRef] = useEmblaCarousel({
        loop: false,
        align: 'start',
        dragFree: true,
    })

    return (
        <div className="embla-row">
            {title && <p className="mixed-projects">{title}</p>}
            <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                    {mediaItems.map((item, index) => (
                        <div key={index} className="embla__slide">
                            {item.type === 'video' ? (
                                <HoverVideoPlayer
                                    key={`video-${item.videoSrc}`}
                                    videoSrc={item.videoSrc}
                                    pausedOverlay={
                                        <img
                                            src={item.thumbnail}
                                            alt=""
                                            className="s-default"
                                        />
                                    }
                                    className="s-default"
                                    restartOnPaused
                                    unloadVideoOnPaused={false}
                                    preload="metadata"
                                />
                            ) : (
                                <img src={item.src} alt="" className="s-default" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EmblaRow
