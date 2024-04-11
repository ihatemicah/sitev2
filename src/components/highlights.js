import * as React from "react"
import "../styles/mystyles.scss"
import "../styles/projects.css"
import { StaticImage } from "gatsby-plugin-image"
import { Link} from "gatsby"


export default function HighlightedProjects({}){
    return (
        <>
        <div className="title-3"> Highlighted projects</div>
        <div className="featured-projects-bottom">
        <Link to="../landingb">  
            <div className="case-feature-project">
                <div className="caption"> Landing.Space (Brand)  </div>
                <div className="case-feature-project-image"> 
                <StaticImage src="../images/project-images/footer/landing-brand-hl-1@2x.png" alt="hello"/>
                 </div>    
            </div>
        </Link>
        <Link to="../ring">  
            <div className="case-feature-project">
                <div className="caption"> Ring  </div>
                <div className="case-feature-project-image"> 
                <StaticImage src="../images/project-images/footer/ring-hl-1@2x.png" alt="hello"/>
                 </div>    
            </div>
            </Link>
            <Link to="../teika">  
            <div className="case-feature-project">
                <div className="caption"> Teikametrics  </div>
                <div className="case-feature-project-image"> 
                <StaticImage src="../images/project-images/footer/teikametrics-hl-1@2x.png" alt="hello"/>
                 </div>    
            </div>
            </Link>
            <Link to="../tome">  
            <div className="case-feature-project">
                <div className="caption"> Tome  </div>
                <div className="case-feature-project-image"> 
                <StaticImage src="../images/project-images/footer/tome-hl-1@2x.png" alt="hello"/>
                 </div>    
            </div>
            </Link>
        </div>
        {/* put in links for the social page */}
          <div className="callouts-grid">
          </div> 
          <div className="callouts-grid"> 
            <div className="title-3"> Mainstream destinations. </div>
          </div>
          <div className="callouts-grid"> 
            <div className="social-links">

                <p className="social-link-1"><a href="https://www.instagram.com/multimicah/">  Instagram </a></p>
              

                <p className="social-link-2"><a href="https://twitter.com/multimicah">  Twitter </a></p>
              

                <p className="social-link-3"><a href="https://www.are.na/micah-carroll">  Are.na </a></p>
              

                <p className="social-link-4"><a href="https://www.linkedin.com/feed/">  Linkedin </a></p>
              

                <p className="social-link-5"><a href="https://www.youtube.com/@MicahCarroll/featured">  Youtube </a></p>
              

            </div>
          </div>
          <div className="callouts-grid"> 
            <div className="opening-hours"> 
            <p> Opening hours</p>
            <p> Monday to Friday 9AM - 6PM</p>
            </div>
          </div>

        </>
        
    )
}