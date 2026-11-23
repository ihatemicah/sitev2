import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import Link from './Link.jsx'
import './Components.css'

gsap.registerPlugin(CustomEase)

const NAV_LINKS = [
    { to: 'work', label: 'Work' },
    { to: 'about', label: 'About' },
    { to: 'writing', label: 'Writing' },
]

const SOCIAL_LINKS = [
    { href: 'https://www.linkedin.com/in/carrollmicah/', label: 'Linkedin' },
    { href: 'https://x.com/multimicah', label: 'X (Twitter)' },
    { href: 'https://www.instagram.com/multimicah', label: 'Instagram' },
]

const EMAIL = 'work@micahcarroll.com'

function NavLinks({ route, className, onNavigate }) {
    return (
        <nav className={className} aria-label="Primary">
            {NAV_LINKS.map((link) => (
                <Link
                    key={link.to}
                    to={link.to}
                    onClick={onNavigate}
                    aria-current={route === link.to ? 'page' : undefined}
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    )
}

// Full-screen menu for phones and tablets. Portaled to <body>, because the nav's
// transform and backdrop-filter would otherwise trap a fixed child inside the bar.
function MobileMenu({ open, route, onClose }) {
    useEffect(() => {
        if (!open) return
        const onKey = (e) => {
            if (e.key === 'Escape') onClose()
        }
        const { overflow } = document.body.style
        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', onKey)
        return () => {
            document.body.style.overflow = overflow
            window.removeEventListener('keydown', onKey)
        }
    }, [open, onClose])

    return createPortal(
        <div
            id="mobile-menu"
            className={open ? 'mobile-menu is-open' : 'mobile-menu'}
            aria-hidden={!open}
            inert={!open}
        >
            <div className="mobile-menu-bar">
                <p className="mobile-menu-name">Micah Carroll</p>
                <button type="button" className="nav-menu-button" onClick={onClose}>
                    Close
                </button>
            </div>
            <NavLinks route={route} className="mobile-menu-links" onNavigate={onClose} />
            <div className="mobile-menu-footer">
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <div className="mobile-menu-socials">
                    {SOCIAL_LINKS.map((link) => (
                        <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </div>,
        document.body
    )
}

function StickyNav({ route }) {
    const navRef = useRef(null)
    const [menuOpen, setMenuOpen] = useState(false)
    const closeMenu = () => setMenuOpen(false)

    useEffect(() => {
        // Off the home page there is no header to scroll past, so the bar is just there
        if (route !== 'work') {
            gsap.set(navRef.current, { y: 0, opacity: 1 })
            return
        }

        const ease = CustomEase.create('custom', 'M0,0 C0.274,0 -0.139,1 1,1 ')

        // Set initial state (hidden above viewport)
        gsap.set(navRef.current, {
            y: -100,
            opacity: 0,
        })

        // Create ScrollTrigger animation (runs on all viewport sizes including desktop)
        const scrollTrigger = ScrollTrigger.create({
            trigger: 'header',
            start: 'bottom top',
            end: 'bottom top',
            onEnter: () => {
                gsap.to(navRef.current, { y: 0, opacity: 1, duration: 0.5, ease })
            },
            onLeaveBack: () => {
                gsap.to(navRef.current, { y: -100, opacity: 0, duration: 0.5, ease })
            },
        })

        return () => {
            scrollTrigger.kill()
        }
    }, [route])

    return (
        <div ref={navRef} className="sticky-nav">
            <div className="sticky-nav-container">
                <h1>Micah Carroll</h1>
                <NavLinks route={route} className="nav-links" />
                <p className="sticky-nav-email">{EMAIL}</p>
                <button
                    type="button"
                    className="nav-menu-button"
                    aria-expanded={menuOpen}
                    aria-controls="mobile-menu"
                    onClick={() => setMenuOpen(true)}
                >
                    Menu
                </button>
            </div>
            <MobileMenu open={menuOpen} route={route} onClose={closeMenu} />
        </div>
    )
}

export default StickyNav
