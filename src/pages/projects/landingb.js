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


export default function landingb(){

    return(
        <Layout>
            <div className="container">
            <Intro caseStudy={{ codeName: 'LB201',projectLink:'https://landing.space/', projectName: 'Landing.Space - Branding',
                    description: "During my time at Landing, I wore dual hats as a product and brand designer. Here, you can explore some of my branding projects.",
                    imageArea:
                    <StaticImage
                        src ="../../images/project-images/landing-b/landing-branding-cs-1.png"
                        alt="Tome, general image of social assets I created"
                        placeholder="blurred" 
                    />
            }} />
            <BigImage bigImage ={{ 
            bigCaption: 'At landing I worked on several marketing page designs',
            bigImageImage: <StaticImage src="../../images/project-images/landing-b/landing-branding-cs-2.png" alt="hello"/>
            }}/>
            <BigImage bigImage ={{ 
            bigCaption: 'Various creation of new visual language with rebranding.',
            bigImageImage: <StaticImage src="../../images/project-images/landing-b/landing-branding-cs-2-1.png" alt="hello"/>
            }}/>
            <ProjectDescription textDescription = {{
            // phototitle: 'hello world',
            // photosrc: <StaticImage src="../../images/project-images/landing-p/landing-case-study-container-5.png" alt="hello"/>,
            // wordstitle: 'Takeaways',
            words: "The rebrand was agency led and it only invovled the logo, with a new logo there was a need for updated visual language for all marketing elements",
            }}/>
            <BigImage bigImage ={{ 
            bigCaption: 'Glowing iteration of new logo, utilized 3D programs for this effect',
            bigImageImage: <StaticImage src="../../images/project-images/landing-b/landing-branding-cs-3.png" alt="hello"/>
            }}/>
            <BigImage bigImage ={{ 
            bigCaption: 'The logo played so well within a 3D landscape',
            bigImageImage: <StaticImage src="../../images/project-images/landing-b/landing-branding-cs-4.png" alt="hello"/>
            }}/>
            <BigImage bigImage ={{ 
            bigCaption: 'New set of instagram designs for rebrand roll-out',
            bigImageImage: <StaticImage src="../../images/project-images/landing-b/landing-branding-cs-5.png" alt="hello"/>
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