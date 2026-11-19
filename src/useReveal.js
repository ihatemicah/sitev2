import { useEffect } from 'react'

/**
 * Sections marked data-reveal fade up as they scroll into view (styles in index.css).
 * Sections that arrive together, like everything above the fold on load, cascade
 * 60ms apart. Each one reveals once and is then left alone.
 */
export function useReveal() {
    useEffect(() => {
        const root = document.documentElement
        if (!root.classList.contains('reveal-ready')) return

        const io = new IntersectionObserver(
            (entries) => {
                entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
                    .forEach((entry, n) => {
                        const el = entry.target
                        // cap the cascade so a fast scroll never queues a long wait
                        el.style.setProperty('--reveal-delay', `${Math.min(n, 4) * 60}ms`)
                        el.classList.add('is-in')
                        io.unobserve(el)
                    })
            },
            // a low threshold so short sections (the footer) still trigger
            { threshold: 0.12 }
        )

        document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el))
        return () => io.disconnect()
    }, [])
}
