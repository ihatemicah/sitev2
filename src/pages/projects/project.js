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


export default function project() {
    return (
        <Layout>
            <div className="container"> 
            <Intro caseStudy={{ codeName: 'LMT2',projectLink:'https://example.com', projectName: 'Landing.Space',
             description: 'During my time at Landing, I focused on designing features such as X, Y, and Z, which contributed to a 30% increase in user engagement and a 20% increase in revenue. By following a user-centered design process and leveraging data-driven insights, I was able to design solutions that not only improved key growth metrics but also aligned with the companys broader business goals.',
            imageArea:
             <StaticImage
                src ="../../images/project-header-preview.png"
                alt="dino"
                placeholder="blurred" 
            />
             }} />
            <BigImage bigImage ={{ 
                bigCaption: 'hello world',
                bigImageImage: <StaticImage src="../../images/big-image.png" alt="hello"/>
            }}/>
            <ProjectDescription textDescription = {{
                phototitle: 'hello world',
                photosrc: <StaticImage src="../../images/problem-description-photo.png" alt="hello"/>,
                words: 'Many consumers struggle to articulate their design preferences when decorating their homes, leading to frustration and dissatisfaction with their choices.',
            }}/>
            <DoubleCol doubleImgCol={{
                caption01: 'caption 01',
                image01: <StaticImage src="../../images/double-img-preview.png" alt="hello"/>,
                caption02: 'caption 02',
                image02: <StaticImage src="../../images/double-img-preview.png" alt="hello"/>,
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