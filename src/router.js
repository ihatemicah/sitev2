import { useSyncExternalStore } from 'react'

/**
 * A tiny history-API router: no dependency, one listener.
 *
 * The site deploys under a sub-path (github.io/sitev2/) with a relative Vite base, so the
 * app root is worked out from this module's own URL. In dev it is /src/router.js, in a
 * build /<root>/assets/index-[hash].js, and one level up is the root either way.
 */
export const ROOT = new URL(/* @vite-ignore */ '../', import.meta.url).pathname

// path segment → route name. The build writes about.html and writing.html next to
// index.html (vite.config.js), which GitHub Pages serves at /about and /writing.
export const ROUTES = {
    '': 'work',
    about: 'about',
    writing: 'writing',
}

const TITLES = {
    work: 'Micah Carroll — Brand, 3D & Motion Designer',
    about: 'About — Micah Carroll',
    writing: 'Writing — Micah Carroll',
}

function readRoute() {
    let path = window.location.pathname
    if (path.startsWith(ROOT)) path = path.slice(ROOT.length)
    path = path.replace(/\/+$/, '').replace(/\.html$/, '').replace(/^index$/, '')
    return ROUTES[path] ?? 'work'
}

const listeners = new Set()
let route = readRoute()

function emit() {
    const next = readRoute()
    if (next === route) return
    route = next
    document.title = TITLES[route]
    listeners.forEach((fn) => fn())
}

window.addEventListener('popstate', emit)

function subscribe(fn) {
    listeners.add(fn)
    return () => listeners.delete(fn)
}

export function useRoute() {
    return useSyncExternalStore(subscribe, () => route)
}

export const hrefFor = (name) =>
    ROOT + (Object.keys(ROUTES).find((key) => ROUTES[key] === name) ?? '')

export function navigate(name) {
    const href = hrefFor(name)
    if (href === window.location.pathname) {
        window.scrollTo(0, 0)
        return
    }
    window.history.pushState(null, '', href)
    window.scrollTo(0, 0)
    emit()
}

document.title = TITLES[route]
