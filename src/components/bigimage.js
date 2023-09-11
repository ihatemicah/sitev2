import * as React from "react"
import "../styles/mystyles.scss"
import "../styles/projects.css"

export default function BigImage({bigImage}) {
return (
    
    <div className="big-image-container"> 
        <div className="big-image-caption"> {bigImage.bigCaption} </div>
        <div className="big-image-image"> {bigImage.bigImageImage}</div>
    </div>

)}