import * as THREE from 'three'

const textureCache = new Map()
const loadCallbacks = new Map()
const videoTextures = new Set()
const loader = new THREE.TextureLoader()
loader.setCrossOrigin('anonymous')

function isVideoUrl(url) {
    return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url)
}

function finishTexture(texture) {
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.colorSpace = THREE.SRGBColorSpace
    texture.needsUpdate = true
}

function isTextureLoaded(tex) {
    const img = tex.image
    if (img instanceof HTMLVideoElement) return img.readyState >= 2
    return img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0
}

function createVideoTexture(url, onReady) {
    const video = document.createElement('video')
    video.crossOrigin = 'anonymous'
    video.muted = true
    video.loop = true
    video.playsInline = true
    video.preload = 'auto'
    video.src = url

    const texture = new THREE.VideoTexture(video)
    finishTexture(texture)
    texture.generateMipmaps = false
    videoTextures.add(texture)

    const ready = () => onReady(texture)
    video.addEventListener('loadeddata', () => {
        try {
            video.currentTime = 0.05
        } catch {
            ready()
        }
    })
    video.addEventListener('seeked', ready, { once: true })
    video.addEventListener('error', () => {
        console.error('Video texture failed:', url)
    })

    return texture
}

export function getTexture(item, onLoad) {
    const key = item.url
    const existing = textureCache.get(key)

    if (existing) {
        if (onLoad) {
            if (isTextureLoaded(existing)) onLoad(existing)
            else loadCallbacks.get(key)?.add(onLoad)
        }
        return existing
    }

    const callbacks = new Set()
    if (onLoad) callbacks.add(onLoad)
    loadCallbacks.set(key, callbacks)

    const notify = (tex) => {
        loadCallbacks.get(key)?.forEach((cb) => {
            try {
                cb(tex)
            } catch (err) {
                console.error(err)
            }
        })
        loadCallbacks.delete(key)
    }

    if (isVideoUrl(key) || item.type === 'video') {
        const texture = createVideoTexture(key, notify)
        textureCache.set(key, texture)
        return texture
    }

    const texture = loader.load(
        key,
        (tex) => {
            tex.generateMipmaps = true
            tex.anisotropy = 4
            finishTexture(tex)
            notify(tex)
        },
        undefined,
        (err) => console.error('Texture load failed:', key, err),
    )

    textureCache.set(key, texture)
    return texture
}

export function setActiveVideoTexture(texture) {
    for (const tex of videoTextures) {
        const video = tex.image
        if (!(video instanceof HTMLVideoElement)) continue
        if (tex === texture) video.play().catch(() => {})
        else video.pause()
    }
}

export function updateVideoTextures() {
    for (const tex of videoTextures) {
        const video = tex.image
        if (video instanceof HTMLVideoElement && !video.paused) {
            tex.needsUpdate = true
        }
    }
}
