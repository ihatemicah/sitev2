import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import './Components.css'

gsap.registerPlugin(CustomEase)

function StickyNav() {
    const navRef = useRef(null)

    useEffect(() => {
        // Set initial state (hidden above viewport)
        gsap.set(navRef.current, {
            y: -100,
            opacity: 0
        })

        // Create ScrollTrigger animation (runs on all viewport sizes including desktop)
        const scrollTrigger = ScrollTrigger.create({
            trigger: 'header',
            start: 'bottom top',
            end: 'bottom top',
            onEnter: () => {
                gsap.to(navRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: CustomEase.create("custom", "M0,0 C0.274,0 -0.139,1 1,1 ")
                })
            },
            onLeaveBack: () => {
                gsap.to(navRef.current, {
                    y: -100,
                    opacity: 0,
                    duration: 0.5,
                    ease: CustomEase.create("custom", "M0,0 C0.274,0 -0.139,1 1,1 ")
                })
            }
        })

        return () => {
            scrollTrigger.kill()
        }
    }, [])

    return (
        <div ref={navRef} className="sticky-nav">
            <div className="sticky-nav-container">
                <h1>Micah Carroll</h1>
                <p>work@micahcarroll.com</p>
            </div>
        </div>
    )
}

export default StickyNav

