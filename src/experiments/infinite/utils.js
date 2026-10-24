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

function mulberry32(seed) {
    let a = seed >>> 0
    return function rand() {
        a |= 0
        a = (a + 0x6d2b79f5) | 0
        let t = Math.imul(a ^ (a >>> 15), 1 | a)
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

const PLANES_PER_CHUNK = 5
const DUPLICATE_GAP = 56

const layoutMemo = new Map()
const deckMemo = new Map()

function pureMediaIndices(cx, cy, cz, mediaCount) {
    const key = `${cx},${cy},${cz}:${mediaCount}`
    const cached = deckMemo.get(key)
    if (cached) return cached

    const count = Math.min(PLANES_PER_CHUNK, mediaCount)
    const deck = Array.from({ length: mediaCount }, (_, index) => index)
    const rand = mulberry32(hashString(`${cx},${cy},${cz}:deck`) + 1)
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1))
        ;[deck[i], deck[j]] = [deck[j], deck[i]]
    }
    const picked = deck.slice(0, count)
    deckMemo.set(key, picked)
    return picked
}

function layoutChunk(cx, cy, cz) {
    const key = `${cx},${cy},${cz}`
    const cached = layoutMemo.get(key)
    if (cached) return cached

    const planes = []
    const seed = hashString(`${cx},${cy},${cz}`)

    for (let i = 0; i < PLANES_PER_CHUNK; i++) {
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
        })
    }

    layoutMemo.set(key, planes)
    return planes
}

function mediaIndexForPlane(cx, cy, cz, planeIndex, mediaCount, extraForbidden) {
    const mine = pureMediaIndices(cx, cy, cz, mediaCount)
    const mineLayout = layoutChunk(cx, cy, cz)
    const forbidden = new Set(mine.filter((_, index) => index !== planeIndex))
    for (const index of extraForbidden) forbidden.add(index)
    const myPosition = mineLayout[planeIndex].position

    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            for (let dz = -1; dz <= 1; dz++) {
                if (dx === 0 && dy === 0 && dz === 0) continue
                const nx = cx + dx
                const ny = cy + dy
                const nz = cz + dz
                const neighborMedia = pureMediaIndices(nx, ny, nz, mediaCount)
                const neighborLayout = layoutChunk(nx, ny, nz)
                for (let j = 0; j < neighborMedia.length; j++) {
                    if (myPosition.distanceTo(neighborLayout[j].position) >= DUPLICATE_GAP) {
                        continue
                    }
                    forbidden.add(neighborMedia[j])
                }
            }
        }
    }

    let index = mine[planeIndex]
    if (!forbidden.has(index)) return index

    const rand = mulberry32(hashString(`${cx},${cy},${cz},${planeIndex}:repair`) + 1)
    for (let attempt = 0; attempt < mediaCount; attempt++) {
        const candidate = Math.floor(rand() * mediaCount)
        if (!forbidden.has(candidate)) return candidate
    }
    return index
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

function generateChunkPlanes(cx, cy, cz, mediaCount) {
    const planes = layoutChunk(cx, cy, cz)
    if (mediaCount > 0) {
        const used = new Set()
        for (let i = 0; i < planes.length; i++) {
            const index = mediaIndexForPlane(cx, cy, cz, i, mediaCount, used)
            used.add(index)
            planes[i].mediaIndex = index
        }
    }
    return planes
}

export function generateChunkPlanesCached(cx, cy, cz, mediaCount = 0) {
    const key = `${cx},${cy},${cz}:${mediaCount}`
    const cached = planeCache.get(key)
    if (cached) {
        planeCache.delete(key)
        planeCache.set(key, cached)
        return cached
    }

    const planes = generateChunkPlanes(cx, cy, cz, mediaCount)
    planeCache.set(key, planes)
    while (planeCache.size > MAX_PLANE_CACHE) {
        const firstKey = planeCache.keys().next().value
        if (!firstKey) break
        planeCache.delete(firstKey)
    }
    return planes
}
