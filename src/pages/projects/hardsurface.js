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
export default function hardsurface() {
    return (
        <>
        <Layout>
            <div className="container"> 
                <Intro caseStudy={{ codeName: 'HS3D',projectLink:'https://www.instagram.com/multimicah/', projectName: 'Device Renders',
                description: "This page would showcase an assortment of 3D renders highlighting techniques with modeling and device presentation. Along with Sci-Fi UI practice.",
                imageArea:
                <StaticImage
                    src ="../../images/project-images/device-studies/ds-1.png"
                    alt="FWB 3D device"
                    placeholder="blurred" 
                />
                }} />
                <BigImage bigImage ={{ 
                bigCaption: 'AI powered meditative companion, after a session you recite your downloads and the AI will bring together the findings.',
                bigImageImage: <StaticImage src="../../images/project-images/device-studies/meditative-device-1.png" alt="Chat GPT interface"/>
                }}/>
                <BigImage bigImage ={{ 
                bigCaption: 'AI powered air filter',
                bigImageImage: <StaticImage src="../../images/project-images/device-studies/airflow-1.png" alt="image of a 3D render, cylinder like structure with LEDs"/>
                }}/>
                <BigImage bigImage ={{ 
                bigCaption: 'Chat GPT, listening device that has your memories with your profile.',
                bigImageImage: <StaticImage src="../../images/project-images/device-studies/ds-2.png" alt="Chat GPT interface"/>
                }}/>
                <DoubleCol doubleImgCol={{
                caption01: 'Advanced mental recording device.',
                image01: <StaticImage src="../../images/project-images/device-studies/ds-3.png" alt="Device sitting on kitchen floor, with audio interface within it's UI"/>,
                caption02: 'Recording UI',
                image02: <StaticImage src="../../images/project-images/device-studies/ds-4.png" alt="UI"/>,
                }}/>
                <BigImage bigImage ={{ 
                bigCaption: 'FWB speaker, records data from all playing sessions',
                bigImageImage: <StaticImage src="../../images/project-images/device-studies/ds-5.png" alt="FWB device, larger image"/>
                }}/>
                <DoubleCol doubleImgCol={{
                caption01: 'Heavy emphasis on hierarchy within this UI',
                image01: <StaticImage src="../../images/project-images/device-studies/ds-6.png" alt="UI"/>,
                caption02: 'I typically love the small labels on tech devices with warnings',
                image02: <StaticImage src="../../images/project-images/device-studies/ds-7.png" alt="hello"/>,
                }}/>
                <BigImage bigImage ={{ 
                bigCaption: 'Fictional amazon workplace monitor',
                bigImageImage: <StaticImage src="../../images/project-images/device-studies/ds-8.png" alt="hello"/>
                }}/>
                <DoubleCol doubleImgCol={{
                caption01: 'Device can register your bodily functions, to avoid unnecessary breaks.',
                image01: <StaticImage src="../../images/project-images/device-studies/ds-9.png" alt="hello"/>,
                caption02: 'Experimenting with how screens protrude.',
                image02: <StaticImage src="../../images/project-images/device-studies/ds-10.png" alt="hello"/>,
                }}/>
                <BigImage bigImage ={{ 
                bigCaption: 'Astral projection tracker device',
                bigImageImage: <StaticImage src="../../images/project-images/device-studies/ds-11.png" alt="hello"/>
                }}/>
                <DoubleCol doubleImgCol={{
                caption01: 'A small struggle with just coming up with a layout with hierarchy in this one.',
                image01: <StaticImage src="../../images/project-images/device-studies/ds-12.png" alt="hello"/>,
                caption02: 'I thought Nike would love a play in this :o ?',
                image02: <StaticImage src="../../images/project-images/device-studies/ds-13.png" alt="hello"/>,
                }}/>
                <DoubleCol doubleImgCol={{
                caption01: 'The Amazon toaster',
                image01: <StaticImage src="../../images/project-images/device-studies/ds-14.png" alt="hello"/>,
                caption02: 'Please renew your prime subscription',
                image02: <StaticImage src="../../images/project-images/device-studies/ds-15.png" alt="hello"/>,
                }}/>
                <DoubleCol doubleImgCol={{
                caption01: 'My first attempt :)',
                image01: <StaticImage src="../../images/project-images/device-studies/ds-16.png" alt="hello"/>,
                caption02: 'Experimented a little bit with C4D, still have much to learn.',
                image02: <StaticImage src="../../images/project-images/device-studies/ds-17.png" alt="hello"/>,
                }}/>
                <ProjectDescription textDescription = {{
                // phototitle: 'hello world',
                // photosrc: <StaticImage src="../../images/project-images/landing-p/landing-case-study-container-5.png" alt="hello"/>,
                wordstitle: 'Takeaways',
                words: 'Making small devices that make you pause for a second to think about the world around us, has and will always be a fun little project of mine',
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