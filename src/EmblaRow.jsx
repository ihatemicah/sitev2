import useEmblaCarousel from 'embla-carousel-react'
import PortfolioHoverVideo, {
    useEmblaDragSuppress,
} from './PortfolioHoverVideo.jsx'
import './Components.css'

function EmblaRow({ title = '', mediaItems = [] }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: 'start',
        dragFree: true,
    })
    const suppressHover = useEmblaDragSuppress(emblaApi)

    return (
        <div className="embla-row">
            {title && <p className="mixed-projects">{title}</p>}
            <div
                className={suppressHover ? 'embla is-dragging' : 'embla'}
                ref={emblaRef}
            >
                <div className="embla__container">
                    {mediaItems.map((item, index) => (
                        <div key={index} className="embla__slide">
                            {item.type === 'video' ? (
                                <PortfolioHoverVideo
                                    videoSrc={item.videoSrc}
                                    thumbnail={item.thumbnail}
                                    className="s-default"
                                    suppressHover={suppressHover}
                                />
                            ) : (
                                <img
                                    src={item.src}
                                    alt=""
                                    className="s-default"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EmblaRow
