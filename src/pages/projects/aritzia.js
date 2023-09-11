import * as React from "react"
import "../../styles/mystyles.scss"
import Layout from "../../components/layout"
import Intro from "../../components/intro"
import BigImage from "../../components/bigimage"
import ProjectDescription from "../../components/description"
import DoubleCol from "../../components/project-doublecol"
import HighlightedProjects from "../../components/highlights"
import "../../styles/projects.css"
import { StaticImage } from "gatsby-plugin-image"

export default function aritzia() {
    return(
        <Layout>
            <div className="container">
            <Intro caseStudy={{ codeName: 'MM2L',projectLink:'https://www.aritzia.com/us/en/aritzia/corporate-hub/corporate-landing.html', projectName: 'Aritzia',
                description: " While at Aritzia, I focused on enhancing UI polish through motion design. I also became an integral part of the team dedicated to improving the user experience in product discovery, including search and filtering features. ",
                imageArea:
                <StaticImage
                    src ="../../images/project-images/aritzia/aritzia-cs-1.png"
                    alt="Landing.Space, general feed"
                    placeholder="blurred" 
                />
            }} />
            <BigImage bigImage ={{ 
            bigCaption: 'New dynamic entry point to the search',
            bigImageImage: <StaticImage src="../../images/project-images/aritzia/aritzia-cs-2.png" alt="hello"/>
            }}/>
            <ProjectDescription textDescription = {{
            // phototitle: 'hello world',
            // photosrc: <StaticImage src="../../images/project-images/landing-p/landing-case-study-container-5.png" alt="hello"/>,
            // wordstitle: 'Takeaways',
            words: 'At Aritzia, while enhancing the search component, a pivotal goal was to inspire users. Previously, recommendations were static. I helped concept with another designer the idea of introducing a dynamic, AI-driven empty state that generated recommendations based on multiple factors.',
            }}/>
            <BigImage bigImage ={{ 
            bigCaption: 'Desktop example + previous design',
            bigImageImage: <StaticImage src="../../images/project-images/aritzia/aritzia-cs-3.png" alt="hello"/>
            }}/>
            <BigImage bigImage ={{ 
            bigCaption: 'Subtle filter improvements for UX',
            bigImageImage: <StaticImage src="../../images/project-images/aritzia/aritzia-cs-4.png" alt="hello"/>
            }}/>
            <BigImage bigImage ={{ 
                bigCaption: 'Ghost loader implementation',
                bigImageImage: <StaticImage src="../../images/project-images/aritzia/aritzia-cs-5.png" alt="hello"/>
            }}/>
            <ProjectDescription textDescription = {{
            // phototitle: 'hello world',
            // photosrc: <StaticImage src="../../images/project-images/landing-p/landing-case-study-container-5.png" alt="hello"/>,
            // wordstitle: 'Takeaways',
            words: 'My tenure at Aritzia was short, but I am grateful for the valuable experiences gained while collaborating with the talented design team. The most significant lesson I took away from this experience was the importance of working within a larger team and integrating extensive research supported by prominent research organizations, all while navigating through various levels of approval.',
            }}/>
            <HighlightedProjects/>
            </div>
        </Layout>
    )}

    export const Head = () =>(
        <>
        <title>Micah Carroll</title>
        <meta name="title" content="Micah Carroll" />
        <meta name="description" content="Design utilizing a unique blend of creativity, technical skill, and an innovative approach that draws upon a wide range of disciplines, including graphic design, 3D tooling, product design, and more" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://micahcarroll.com/" />
        <meta property="og:title" content="Micah Carroll" />
        <meta property="og:description" content="Design utilizing a unique blend of creativity, technical skill, and an innovative approach that draws upon a wide range of disciplines, including graphic design, 3D tooling, product design, and more" />
        <meta property="og:image" content="/static/metadata-image.png" />
        
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://micahcarroll.com/" />
        <meta property="twitter:title" content="Micah Carroll " />
        <meta property="twitter:description" content="Design utilizing a unique blend of creativity, technical skill, and an innovative approach that draws upon a wide range of disciplines, including graphic design, 3D tooling, product design, and more" />
        <meta property="twitter:image" content="/static/metadata-image.png" />
        
        
        </>
        )