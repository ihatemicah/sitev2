import * as React from "react"
import "../styles/mystyles.scss"
import "../styles/projects.css"

export default function ProjectDescription({textDescription}) {
    return (
        
        <div className="description-component-container">
            <div className="description-image">
                <div className="caption"> {textDescription.phototitle}</div>
                {textDescription.photosrc}
            </div>    
            <div className="description-content">
                <div className="description-title">
                   {textDescription.wordstitle}
                </div>
                <div className="description-words">
                    {textDescription.words}
                </div>
            </div>
        </div>
    
    )}