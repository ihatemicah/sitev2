import * as React from "react"
import "../../styles/mystyles.scss"
import Layout from "../../components/layout"
import Intro from "../../components/intro"
import BigImage from "../../components/bigimage"
import ProjectDescription from "../../components/description"
import DoubleCol from "../../components/project-doublecol"
import HighlightedProjects from "../../components/highlights"
import "../../styles/global.css"
import "../../styles/projects.css"
import { StaticImage } from "gatsby-plugin-image"

export default function tome(){
    return (
        <Layout>
            <div className="container">
                <Intro caseStudy={{ codeName: 'TM2L',projectLink:'https://tome.app/', projectName: 'Tome',
                    description: "While at Tome, I played a significant role in enhancing the brand's visual identity across various social media platforms. My primary focus was ensuring that influencer-generated content remained consistent with our brand's essence while allowing room for their creative expression. Additionally, I created a comprehensive style guide to assist in generating on-brand imagery. ",
                    imageArea:
                    <StaticImage
                        src ="../../images/project-images/tome/tome-cs-1.png"
                        alt="Tome, general image of social assets I created"
                        placeholder="blurred" 
                    />
                }} />
                <BigImage bigImage ={{ 
                bigCaption: 'Social media assets created for use',
                bigImageImage: <StaticImage src="../../images/project-images/tome/tome-cs-2.png" alt="hello"/>
                }}/>
                <BigImage bigImage ={{ 
                bigCaption: 'Since this was going from 0-1 there was a massive intention on iteration',
                bigImageImage: <StaticImage src="../../images/project-images/tome/tome-cs-2-2.png" alt="hello"/>
                }}/>
                <BigImage bigImage ={{ 
                bigCaption: "Crafted an outline for all influencer videos",
                bigImageImage: <StaticImage src="../../images/project-images/tome/tome-cs-3.png" alt="hello"/>
                }}/>
                <ProjectDescription textDescription = {{
                // phototitle: 'hello world',
                // photosrc: <StaticImage src="../../images/project-images/landing-p/landing-case-study-container-5.png" alt="hello"/>,
                // wordstitle: 'DATA',
                words: "We didn't just work on improving the design language; we also addressed storytelling. I played a pivotal role in crafting a foundational outline to ensure we consistently had the necessary materials",
                }}/>
                <BigImage bigImage ={{ 
                bigCaption: 'Midjourney + Stable Diffusion created imagery',
                bigImageImage: <StaticImage src="../../images/project-images/tome/tome-cs-4.png" alt="hello"/>
                }}/>
                <BigImage bigImage ={{ 
                bigCaption: "Prompting's role in brand development",
                bigImageImage: <StaticImage src="../../images/project-images/tome/tome-cs-4-1.png" alt="hello"/>
                }}/>
                <HighlightedProjects/>
            </div>
        </Layout>
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