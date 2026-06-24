import { experimentsMedia } from './experimentsMedia.js'
import { TILE_HEIGHT_PX, TILE_WIDTH_PX } from './tileLayout.js'

/** Fixed seed so scatter stays stable between visits and hot reloads */
const SCATTER_SEED = 0xc0ffee47

/** Minimum gap between tile edges (pixels) */
const TILE_GAP = 14

const W = TILE_WIDTH_PX
const H = TILE_HEIGHT_PX

/** Mulberry32 — fast deterministic PRNG */
function mulberry32(seed) {
    return function rand() {
        let t = (seed += 0x6d2b79f5)
        t = Math.imul(t ^ (t >>> 15), t | 1)
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

function shuffle(items, rng) {
    const out = items.slice()
    for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1))
        ;[out[i], out[j]] = [out[j], out[i]]
    }
    return out
}

function overlaps(ax, ay, aw, ah, bx, by, bw, bh, g) {
    const separated =
        ax + aw + g <= bx ||
        bx + bw + g <= ax ||
        ay + ah + g <= by ||
        by + bh + g <= ay
    return !separated
}

/**
 * Irregular scatter: random positions with spacing; spiral+jitter fallback if the box is tight.
 */
function assignScatter(items) {
    const rng = mulberry32(SCATTER_SEED)
    const ordered = shuffle(items, rng)
    const placed = []

    const n = ordered.length
    const cell = Math.max(W, H) + TILE_GAP
    let arenaW = Math.max(720, Math.sqrt(Math.max(n, 1)) * cell * 0.92)
    let arenaH = Math.max(560, Math.sqrt(Math.max(n, 1)) * cell * 0.78)

    for (let idx = 0; idx < ordered.length; idx++) {
        const item = ordered[idx]
        let x = 0
        let y = 0
        let found = false

        for (let attempt = 0; attempt < 160; attempt++) {
            x = rng() * arenaW
            y = rng() * arenaH
            found = true
            for (const p of placed) {
                if (overlaps(x, y, W, H, p.x, p.y, W, H, TILE_GAP)) {
                    found = false
                    break
                }
            }
            if (found) break
        }

        if (!found) {
            const golden = Math.PI * (3 - Math.sqrt(5))
            for (let spiral = 0; spiral < 90 && !found; spiral++) {
                const i = placed.length + spiral * 0.18
                const angle = i * golden + rng() * 1.25
                const rad =
                    (22 +
                        Math.sqrt(i + spiral + 2) * 38 +
                        spiral * 2.4) *
                    (0.76 + rng() * 0.48)
                x = arenaW * 0.42 + Math.cos(angle) * rad + (rng() - 0.5) * 72
                y = arenaH * 0.4 + Math.sin(angle) * rad + (rng() - 0.5) * 72
                x = Math.max(0, Math.min(x, arenaW - W))
                y = Math.max(0, Math.min(y, arenaH - H))
                found = true
                for (const p of placed) {
                    if (overlaps(x, y, W, H, p.x, p.y, W, H, TILE_GAP)) {
                        found = false
                        break
                    }
                }
            }
        }

        if (!found) {
            arenaW += cell * 2
            arenaH += cell * 2
            for (let attempt = 0; attempt < 140; attempt++) {
                x = rng() * Math.max(0, arenaW - W)
                y = rng() * Math.max(0, arenaH - H)
                found = true
                for (const p of placed) {
                    if (overlaps(x, y, W, H, p.x, p.y, W, H, TILE_GAP)) {
                        found = false
                        break
                    }
                }
                if (found) break
            }
        }

        if (!found) {
            const maxRight = placed.reduce((m, p) => Math.max(m, p.x + W), 0)
            x = maxRight + TILE_GAP
            y = rng() * Math.max(0, Math.min(arenaH, 2400) - H)
        }

        placed.push({ ...item, x, y })

        if ((idx + 1) % 7 === 0 && idx + 1 < ordered.length) {
            arenaW *= 1.04
            arenaH *= 1.04
        }
    }

    let minX = Infinity
    let minY = Infinity
    for (const p of placed) {
        minX = Math.min(minX, p.x)
        minY = Math.min(minY, p.y)
    }
    const margin = 48
    return placed.map((p) => ({
        ...p,
        x: p.x - minX + margin,
        y: p.y - minY + margin,
    }))
}

function labelFromUrl(src) {
    try {
        const u = new URL(src)
        const seg = u.pathname.split('/').filter(Boolean).pop() ?? ''
        const base = decodeURIComponent(seg).replace(/\.[^.]+$/, '')
        if (base) return base.replace(/[-_]+/g, ' ')
    } catch {
        /* ignore */
    }
    return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(src) ? 'Video' : 'Image'
}

function urlLooksLikeVideo(url) {
    return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url)
}

function normalizeMediaEntry(entry) {
    const url =
        typeof entry === 'string'
            ? entry.trim()
            : typeof entry?.url === 'string'
              ? entry.url.trim()
              : ''
    if (!url) return null

    const tooltipLabel =
        typeof entry === 'object' && entry != null && entry.label
            ? String(entry.label).trim() || labelFromUrl(url)
            : labelFromUrl(url)

    return {
        type: urlLooksLikeVideo(url) ? 'video' : 'image',
        src: url,
        tooltipLabel,
    }
}

function collectCanvasItems() {
    const seen = new Set()
    const list = []

    for (const entry of experimentsMedia) {
        const item = normalizeMediaEntry(entry)
        if (!item || seen.has(item.src)) continue
        seen.add(item.src)
        list.push(item)
    }

    return list
}

export const CANVAS_MEDIA = assignScatter(collectCanvasItems())
