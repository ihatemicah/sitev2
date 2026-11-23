import { useReveal } from '../useReveal.js'
import './Pages.css'

// Placeholder until the About page is designed.
function About() {
    useReveal()

    return (
        <main className="page" data-reveal>
            <h1 className="page-title">About</h1>
            <p className="page-lede">
                A long-term creative partner for brands that want to stand out. 3D, motion,
                and visual design, embedded with your team.
            </p>
            <p className="page-note">More here soon.</p>
        </main>
    )
}

export default About
