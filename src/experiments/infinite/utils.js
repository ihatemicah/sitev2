import * as THREE from 'three'
import { CHUNK_SIZE } from './constants.js'

const MAX_PLANE_CACHE = 256
const planeCache = new Map()

function hashString(str) {
    let h = 0
    for (let i = 0; i < str.length; i++) {
        h = ((h << 5) - h + str.charCodeAt(i)) | 0
    }
    return Math.abs(h)
}

function seededRandom(seed) {
    const x = Math.sin(seed * 9999) * 10000
    return x - Math.floor(x)
}

export function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v))
}

export function lerp(a, b, t) {
    return a + (b - a) * t
}

export function getChunkUpdateThrottleMs(isZooming, zoomSpeed) {
    if (zoomSpeed > 1) return 500
    if (isZooming) return 400
    return 100
}

export function shouldThrottleUpdate(lastUpdateTime, throttleMs, currentTime) {
    return currentTime - lastUpdateTime >= throttleMs
}

function generateChunkPlanes(cx, cy, cz) {
    const planes = []
    const seed = hashString(`${cx},${cy},${cz}`)

    for (let i = 0; i < 5; i++) {
        const s = seed + i * 1000
        const r = (n) => seededRandom(s + n)
        const size = 12 + r(4) * 8

        planes.push({
            id: `${cx}-${cy}-${cz}-${i}`,
            position: new THREE.Vector3(
                cx * CHUNK_SIZE + r(0) * CHUNK_SIZE,
                cy * CHUNK_SIZE + r(1) * CHUNK_SIZE,
                cz * CHUNK_SIZE + r(2) * CHUNK_SIZE,
            ),
            scale: new THREE.Vector3(size, size, 1),
            mediaIndex: Math.floor(r(5) * 1_000_000),
        })
    }

    return planes
}

export function generateChunkPlanesCached(cx, cy, cz) {
    const key = `${cx},${cy},${cz}`
    const cached = planeCache.get(key)
    if (cached) {
        planeCache.delete(key)
        planeCache.set(key, cached)
        return cached
    }

    const planes = generateChunkPlanes(cx, cy, cz)
    planeCache.set(key, planes)
    while (planeCache.size > MAX_PLANE_CACHE) {
        const firstKey = planeCache.keys().next().value
        if (!firstKey) break
        planeCache.delete(firstKey)
    }
    return planes
}
