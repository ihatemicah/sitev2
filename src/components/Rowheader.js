import React, { Children } from 'react'
import '../styles/global.css'
import "../styles/mystyles.scss"
export default function Rowheader({titleCategory, dateProject}) {
    return (
        <div className='project-title'>
            <div> {titleCategory} </div>
            <div> {dateProject} </div>
        </div>
    )
}
