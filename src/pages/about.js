import * as React from "react"
import "../styles/mystyles.scss"
import Layout from "../components/layout"
import Rowheader from "../components/Rowheader"
import { StaticImage } from "gatsby-plugin-image"
import HighlightedProjects from "../components/highlights"


export default function About() {
    return (
        <>
        <Layout>
            <div className="container"> 
                <div className='project-intro-grid'>
                    <div className='project-details'>
                        <div className='about-me-container'>
                            <div className='code-name'> Learning </div>
                            <div className='project-name'> Various 3D tools (Blender, C4D, Unreal Engine) alongside generative art tools like TouchDesigner + overall brand presentation </div>
                        </div>  
                        <div className='about-me-container'>
                            <div className='code-name'> Playing </div>
                            <div className='project-name'> Starfield, Skyrim, Cyberpunk 2077, Maplestory, and occasional Fortnite matches </div>
                        </div>
                        <div className='about-me-container'>
                            <div className='code-name'> Reading </div>
                            <div className='project-name'> The Creative Act, Journey to the Heart, A Job to Love </div>
                        </div>
                        <div className='about-me-container'>
                            <div className='code-name'> More About </div>
                            <div className='project-name'> Currently deeply finding my way around my career, I've spent years designing for fortune 100 companies helping build their web applications and now I found myself in love with the tools behind creating unique pieces that help brands discovery themselves as well as make a statement. You'll notice this in the work to come.  </div>
                        </div>
                    </div>
                    <div className='project-image'> <StaticImage src="../images/my-image.png"/> </div>
                    <div className='project-image'> 
                        <iframe width="437" height="315" src="https://www.youtube.com/embed/qCSe4BUp2sU?&autoplay=1&mute=1"  title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                </div>
                <div className="maxims-container">
                    <div className="caption"> Maxims</div>
                    <div className="maxims-css-grid">
                        <div className="maxim-object"> Who are you when you are not performing for the people inside your mind</div>
                        <div className="maxim-object"> Who’s to say we just have to share one part of ourselves on the web?</div>
                        <div className="maxim-object"> Accepting limitation = creating boundaries that allow the build up of energy</div>
                        <div className="maxim-object"> The absence of limitations is the enemy of art.</div>
                        <div className="maxim-object"> Your sacred space is where you can find yourself over and over again.</div>
                        <div className="maxim-object"> A butterfly does not become a butterfly without isolation.</div>
                        <div className="maxim-object"> The process is the practice, the artifacts are just the side effects.</div>
                        <div className="maxim-object"> Art and love are the same thing: It's the process of seeing yourself in things that are not you.</div>
                    </div> 
                    <HighlightedProjects/>
                </div>
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