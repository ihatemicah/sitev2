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


export default function ring(){
    return(
        <Layout>
            <div className="container"> 
            <Intro caseStudy={{ codeName: 'RN01',projectLink:'https://ring.com/', projectName: 'Ring Neighborhoods Portal',
                    description: "I worked on a web application that complements Ring's products, enabling law enforcement to play a pivotal role in enhancing neighborhood safety and investigations. My involvement spanned the entire end-to-end product design process for this project",
                    imageArea:
                    <StaticImage
                        src ="../../images/project-images/ring/ring-neighbors-1.png"
                        alt="Tome, general image of social assets I created"
                        placeholder="blurred" 
                    />
            }} />
            <BigImage bigImage ={{ 
            bigCaption: 'Main feed of previous design',
            bigImageImage: <StaticImage src="../../images/project-images/ring/ring-neighbors-2.png" alt="hello"/>
            }}/>
            <DoubleCol doubleImgCol={{
            caption01: 'Managing user videos',
            image01: <StaticImage src="../../images/project-images/ring/ring-neighbors-3.png" alt="hello"/>,
            caption02: 'Modifying information',
            image02: <StaticImage src="../../images/project-images/ring/ring-neighbors-4.png" alt="hello"/>,
            }}/>
             <ProjectDescription textDescription = {{
                // phototitle: 'hello world',
                // photosrc: <StaticImage src="../../images/project-images/landing-p/landing-case-study-container-5.png" alt="hello"/>,
                // wordstitle: 'Takeaways',
                words: 'My time at Landing taught me a lot, combining product design and brand building in a small startup. Looking back, Id enjoy enhancing the experience with refined micro-interactions and subtle adjustments for a more cohesive feel. Nonetheless, Im confident their current direction will lead to great success..',
                }}/>
            <BigImage bigImage ={{ 
            bigCaption: 'New home feed',
            bigImageImage: <StaticImage src="../../images/project-images/ring/ring-neighbors-5.png" alt="hello"/>
            }}/>
            <BigImage bigImage ={{ 
            bigCaption: 'Requesting videos from the neighborhood',
            bigImageImage: <StaticImage src="../../images/project-images/ring/ring-neighbors-6.png" alt="hello"/>
            }}/>
            <BigImage bigImage ={{ 
            bigCaption: 'Providing new mobile solutions',
            bigImageImage: <StaticImage src="../../images/project-images/ring/ring-neighbors-7.png" alt="hello"/>
            }}/>
            <BigImage bigImage ={{ 
            bigCaption: 'Crafting a small design system behind the new layouts',
            bigImageImage: <StaticImage src="../../images/project-images/ring/ring-neighbors-8.png" alt="hello"/>
            }}/>
            <ProjectDescription textDescription = {{
            // phototitle: 'hello world',
            // photosrc: <StaticImage src="../../images/project-images/landing-p/landing-case-study-container-5.png" alt="hello"/>,
            // wordstitle: 'Takeaways',
            words: "My first product design role was with the Neighbors Public Safety Portal, which brought several challenges, including being the sole designer on the team, mastering cross-team communication, and advocating for design principles that the team initially overlooked. This experience provided me with a platform for substantial personal growth, which I have since carried into subsequent projects.",
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