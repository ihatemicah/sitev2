import { useMemo, useState } from 'react'
import './experiments-entry.css'
import { CANVAS_ITEMS } from './canvasMedia.js'
import { InfiniteCanvas } from './infinite/InfiniteCanvas.jsx'

function InfoButton() {
    const [open, setOpen] = useState(false)

    return (
        <div className="experiments-info">
            {open ? (
                <div className="experiments-info-panel" role="dialog">
                    <p>Drag to move. Scroll or pinch to travel through the space.</p>
                    <a
                        href="https://github.com/edoardolunardi/infinite-canvas"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Infinite Canvas
                    </a>
                </div>
            ) : null}
            <button
                type="button"
                className="experiments-info-button"
                aria-expanded={open}
                aria-label="About this canvas"
                onClick={() => setOpen((current) => !current)}
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM13 10.5V17H11V10.5H13Z"
                        fill="currentColor"
                    />
                    <path
                        d="M13.5 7.99999C13.5 8.82842 12.8284 9.49999 12 9.49999C11.1715 9.49999 10.5 8.82842 10.5 7.99999C10.5 7.17157 11.1715 6.49999 12 6.49999C12.8284 6.49999 13.5 7.17157 13.5 7.99999Z"
                        fill="currentColor"
                    />
                </svg>
            </button>
        </div>
    )
}

export default function ExperimentsPage() {
    const media = useMemo(
        () =>
            CANVAS_ITEMS.map((item) => ({
                url: item.src,
                label: item.tooltipLabel,
                type: item.type,
                width: 4,
                height: 3,
            })),
        [],
    )

    return (
        <div className="experiments-app">
            <a className="experiments-home-link" href="index.html">
                ← Home
            </a>
            <InfoButton />
            <InfiniteCanvas media={media} />
        </div>
    )
}
