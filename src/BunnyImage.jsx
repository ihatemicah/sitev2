import { useRef, useState } from 'react'
import './BunnyImage.css'

// Bunny Optimizer + Dynamic Image API must be on for the pull zone, with
// "Vary cache: URL query string" enabled. Without it every query string returns the original file, so the "placeholder"
// would be a second full-size download.
const BUNNY_HOST = /(^|\.)b-cdn\.net$/

const PLACEHOLDER_PARAMS = 'width=20&quality=30&blur=30'

function isBunny(src) {
    try {
        return BUNNY_HOST.test(new URL(src).hostname)
    } catch {
        return false
    }
}

function withParams(src, params) {
    return src + (src.includes('?') ? '&' : '?') + params
}

/**
 * Image from Bunny CDN with an instant blurred placeholder.
 * The 20px placeholder sits in normal flow, so it takes the image's exact box
 * (same classes, same aspect ratio). The full image is stacked on top and fades
 * in once it has loaded and decoded. Non-Bunny sources render a plain <img>.
 *
 * `className` goes on both images so existing CSS (size, radius, object-fit,
 * aspect-ratio) applies exactly as before. `wrapperClassName` / `wrapperStyle`
 * style the wrapper itself.
 */
function BunnyImage({
    src,
    alt = '',
    className,
    width = 1200,
    quality = 85,
    wrapperClassName = '',
    wrapperStyle,
    onError,
    ...rest
}) {
    const mountedAt = useRef(0)
    const [loaded, setLoaded] = useState(false)
    const [instant, setInstant] = useState(false)

    if (!src || !isBunny(src)) {
        const style = wrapperStyle ? { ...wrapperStyle, ...rest.style } : rest.style
        const cls = [className, wrapperClassName].filter(Boolean).join(' ') || undefined
        return <img src={src} alt={alt} className={cls} onError={onError} {...rest} style={style} />
    }

    const fullSrc = withParams(src, `width=${width}&quality=${quality}`)
    const placeholderSrc = withParams(src, PLACEHOLDER_PARAMS)

    const handleLoad = (event) => {
        const img = event.currentTarget
        // Loaded within a frame or two of mounting = came from cache: skip the fade.
        if (performance.now() - mountedAt.current < 50) setInstant(true)
        // decode() keeps the fade from starting on a half-painted frame.
        const done = () => setLoaded(true)
        if (img.decode) img.decode().then(done, done)
        else done()
    }

    const state = loaded ? (instant ? ' is-loaded is-instant' : ' is-loaded') : ''

    return (
        <span
            className={`bunny-img${state}${wrapperClassName ? ` ${wrapperClassName}` : ''}`}
            style={wrapperStyle}
        >
            {/* Full image first so existing querySelector('img').decode() calls target it. */}
            <img
                ref={(el) => {
                    if (el && !mountedAt.current) mountedAt.current = performance.now()
                }}
                src={fullSrc}
                alt={alt}
                className={`${className ? `${className} ` : ''}bunny-img__full`}
                onLoad={handleLoad}
                onError={onError}
                {...rest}
            />
            <img
                src={placeholderSrc}
                alt=""
                aria-hidden="true"
                className={`${className ? `${className} ` : ''}bunny-img__placeholder`}
                draggable="false"
                decoding="sync"
                fetchPriority="high"
            />
        </span>
    )
}

export default BunnyImage
