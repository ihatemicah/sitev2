import * as React from "react"
import "../styles/mystyles.scss"
import "../styles/projects.css"

export default function DoubleCol({doubleImgCol}) {
    return (
        <div className="doublecol-container">
            <div className="double-col-img">
                <div className="caption"> {doubleImgCol.caption01} </div>
                {doubleImgCol.image01}
            </div>
            <div className="double-col-img">
                <div className="caption"> {doubleImgCol.caption02} </div>
                {doubleImgCol.image02}
            </div>
        </div>
    )
}