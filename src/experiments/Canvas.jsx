import { useInfiniteCanvas } from './useCanvas.js'
import './canvas.css'

export function Canvas({ items, children }) {
    const { outerRef, worldRef, tiles } = useInfiniteCanvas(items)

    return (
        <div ref={outerRef} className="canvas-outer">
            <div ref={worldRef} className="canvas-world canvas-world--infinite">
                {children(tiles)}
            </div>
        </div>
    )
}
