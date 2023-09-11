import React from 'react'
import '../styles/global.css'
import '../styles/projects.css'
import { StaticImage } from "gatsby-plugin-image"

export default function Intro ({ caseStudy }) {
    return (
        <div className='project-intro-grid'>
            <div className='project-details'>
                <div className='project-name-container'>
                    <div className='code-name'> {caseStudy.codeName} </div>
                    <div className='project-name'> <a href={caseStudy.projectLink} target='_blank'> {caseStudy.projectName} </a></div>
                </div>
                <div className='case-study-description-container'>
                    <div className='code-name'> Project Details </div>
                    <div className='project-description'> {caseStudy.description}</div>
                </div>
            </div>
            <div className='project-image'> {caseStudy.imageArea} </div>
        </div>
    )
}