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
export default function landingp() {
    return (
        <Layout>
            <div className="container"> 
                <Intro caseStudy={{ codeName: 'LMT2',projectLink:'https://app.landing.space/', projectName: 'Landing.Space',
                description: 'During my time at Landing, I focused on designing features such as X, Y, and Z, which contributed to a 30% increase in user engagement and a 20% increase in revenue. By following a user-centered design process and leveraging data-driven insights, I was able to design solutions that not only improved key growth metrics but also aligned with the companys broader business goals.',
                imageArea:
                <StaticImage
                    src ="../../images/project-images/landing-p/landing-case-study-intro.png"
                    alt="Landing.Space, general feed"
                    placeholder="blurred" 
                />
                }} />
                <BigImage bigImage ={{ 
                    bigCaption: 'The workspace for users creating moodboards',
                    bigImageImage: <StaticImage src="../../images/project-images/landing-p/landing-case-study-container-1.png" alt="hello"/>
                }}/>
                <DoubleCol doubleImgCol={{
                    caption01: 'Huge amounts of variation on the feeds.',
                    image01: <StaticImage src="../../images/project-images/landing-p/landing-case-study-container-2.png" alt="hello"/>,
                    caption02: 'Each image has links and data tracing back to the user upload.',
                    image02: <StaticImage src="../../images/project-images/landing-p/landing-case-study-container-3.png" alt="hello"/>,
                }}/>
                <ProjectDescription textDescription = {{
                    phototitle: 'Building out small moments of delights for inviting users.',
                    photosrc: <StaticImage src="../../images/project-images/landing-p/landing-case-study-container-5.png" alt="hello"/>,
                    wordstitle: 'Challenge',
                    words: 'Many consumers struggle to articulate their design preferences when decorating their homes, leading to frustration and dissatisfaction with their choices.',
                }}/>
                <BigImage bigImage ={{ 
                bigCaption: 'Comparing the old profile design that stifled user creativity.',
                bigImageImage: <StaticImage src="../../images/project-images/landing-p/landing-case-study-container-8.png" alt="hello"/>
                }}/>
                <BigImage bigImage ={{ 
                    bigCaption: 'Empty states were missing in previous designs.',
                    bigImageImage: <StaticImage src="../../images/project-images/landing-p/landing-case-study-container-5-1.png" alt="hello"/>
                }}/>
                <BigImage bigImage ={{ 
                    bigCaption: "Remixing involved users using others' images for their creations, and it was crucial to ensure proper credit attribution.",
                    bigImageImage: <StaticImage src="../../images/project-images/landing-p/landing-case-study-container-6.png" alt="hello"/>
                }}/>
                <BigImage bigImage ={{ 
                    bigCaption: 'Levels of credit and my approach to scalable design.',
                    bigImageImage: <StaticImage src="../../images/project-images/landing-p/landing-case-study-container-7.png" alt="hello"/>
                }}/>
                <ProjectDescription textDescription = {{
                // phototitle: 'hello world',
                // photosrc: <StaticImage src="../../images/project-images/landing-p/landing-case-study-container-5.png" alt="hello"/>,
                wordstitle: 'Takeaways',
                words: 'My time at Landing taught me a lot, combining product design and brand building in a small startup. Looking back, Id enjoy enhancing the experience with refined micro-interactions and subtle adjustments for a more cohesive feel. Nonetheless, Im confident their current direction will lead to great success..',
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