import * as React from "react"
import "../../styles/mystyles.scss"
import Layout from "../../components/layout"
import Intro from "../../components/intro"
import BigImage from "../../components/bigimage"
import ProjectDescription from "../../components/description"
import DoubleCol from "../../components/project-doublecol"
import HighlightedProjects from "../../components/highlights"
import "../../styles/projects.css"
import "../../styles/global.css"
import { StaticImage } from "gatsby-plugin-image"

export default function teika() {
    return (
        <>
        <Layout>
            <div className="container"> 
                <Intro caseStudy={{ codeName: 'TK321',projectLink:'https://www.teikametrics.com/', projectName: 'Teikametrics',
                    description: "While at Teikametrics, I dedicated most of my time to feature development and, towards the end of my tenure, took the lead in orchestrating the platform's launch on Walmart, ensuring a successful integration.",
                    imageArea:
                    <StaticImage
                        src ="../../images/project-images/teika/teikametrics-cs-1.png"
                        alt="Landing.Space, general feed"
                        placeholder="blurred" 
                    />
                }} />
                <BigImage bigImage ={{ 
                bigCaption: 'Main dashboard',
                bigImageImage: <StaticImage src="../../images/project-images/teika/teikametrics-cs-2.png" alt="hello"/>
                }}/>
                <DoubleCol doubleImgCol={{
                caption01: 'Individual product metrics',
                image01: <StaticImage src="../../images/project-images/teika/teikametrics-cs-3.png" alt="hello"/>,
                caption02: 'Custom analytics dashboard',
                image02: <StaticImage src="../../images/project-images/teika/teikametrics-cs-4.png" alt="hello"/>,
                }}/>
                <BigImage bigImage ={{ 
                bigCaption: 'Microinteraction for user onboarding',
                bigImageImage: <StaticImage src="../../images/project-images/teika/teikametrics-cs-5.png" alt="hello"/>
                }}/>
                <BigImage bigImage ={{ 
                bigCaption: 'Example of developer handoff',
                bigImageImage: <StaticImage src="../../images/project-images/teika/teikametrics-cs-6.png" alt="hello"/>
                }}/>
                <ProjectDescription textDescription = {{
                // phototitle: 'hello world',
                // photosrc: <StaticImage src="../../images/project-images/landing-p/landing-case-study-container-5.png" alt="hello"/>,
                // wordstitle: 'Takeaways',
                words: "Teikametrics marked my debut in the realm of B2B web applications, serving as my introduction to the intricate world of complex web dashboards. It was also my first exposure to a previously unfamiliar user group, yielding valuable insights into user research. Despite its challenges, it was an invaluable learning experience for which I am truly grateful.",
                }}/>
                <HighlightedProjects/>
            </div>
        </Layout>
        </>
    )
}
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