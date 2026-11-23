import { useReveal } from '../useReveal.js'
import './Pages.css'

// Placeholder until the Writing page is designed.
function Writing() {
    useReveal()

    return (
        <main className="page" data-reveal>
            <h1 className="page-title">Writing</h1>
            <p className="page-lede">Notes on brand, 3D, and motion.</p>
            <p className="page-note">First posts coming soon.</p>
        </main>
    )
}

export default Writing
