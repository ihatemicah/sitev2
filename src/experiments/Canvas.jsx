import { useCanvas } from './useCanvas.js'
import './canvas.css'

export function Canvas({ children, fitContent }) {
    const { outerRef, worldRef } = useCanvas({ fitContent })

    return (
        <div ref={outerRef} className="canvas-outer">
            <div ref={worldRef} className="canvas-world">
                {children}
            </div>
        </div>
    )
}
