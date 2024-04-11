import * as React from "react"
import "../styles/mystyles.scss"
import Layout from "../components/layout"
import Rowheader from "../components/Rowheader"
import { StaticImage } from "gatsby-plugin-image"
import Projectcontainer from "../components/Projectcontainer"
import { Link} from "gatsby"

const imageObjectsRow1 = [
  {
    imgNative: require('../../static/temp-images/bastila-2.gif').default,
    projectName: '2023',
    projectLink: 'Bastila | Keycap Asset'
  },
  {
    imgNative: require('../../static/temp-images/bastila-1.jpg').default,
    projectName: '2023',
    projectLink: 'Bastila | Shipping Container'
  },
  {
    imgNative: require('../../static/temp-images/mike-1.png').default,
    projectName: '2023',
    projectLink: 'Dreamcore | Dreamstation Asset'
  },
  {
    imgNative: require('../../static/temp-images/t-shirt-1.gif').default,
    projectName: '2023',
    projectLink: 'RM21 | Clothing Experience'
  },
  {
    imgNative: require('../../static/temp-images/oct-1.png').default,
    projectName: '2023',
    projectLink: 'LL21 | Unlocked Material'
  },
  {
    imgNative: require('../../static/temp-images/pill-1.png').default,
    projectName: '2023',
    projectLink: 'MDZ2 | Core Station'
  },
  {
    imgNative: require('../../static/temp-images/pill-2.png').default,
    projectName: '2023',
    projectLink: 'MDZ2 | Core Station'
  },
  {
    imgNative: require('../../static/temp-images/recharge-1.gif').default,
    projectName: '2023',
    projectLink: 'Breakeven | Cover Asset'
  },
  {
    imgNative: require('../../static/temp-images/vv-1.gif').default,
    projectName: '2023',
    projectLink: 'Visualize Value | Checks'
  },
  {
    imgNative: require('../../static/temp-images/fabric-1.png').default,
    projectName: '2023',
    projectLink: 'FB63 | Fabric Visualization'
  },
  {
    imgNative: require('../../static/temp-images/boys-2.gif').default,
    projectName: '2023',
    projectLink: 'Boy Smells | Candle Visualization'
  },
  {
    imgNative: require('../../static/temp-images/konami.gif').default,
    projectName: '2023',
    projectLink: 'Konami | Retro Visualization'
  },
];
const imageObjectsRow2 = [
  {
    imgNative: require('../../static/temp-images/do-it-yourself.jpg').default,
    projectName: '2021',
    projectLink: 'MEL2 | Self Expression'
  },
  {
    imgNative: require('../../static/temp-images/ducky-3d-multimicah.jpg').default,
    projectName: '2022',
    projectLink: 'Ducky3D | Sculpture Exploration'
  },
  {
    imgNative: require('../../static/temp-images/feel-tired.jpg').default,
    projectName: '2022',
    projectLink: 'D2-31 | Tired'
  },
  {
    imgNative: require('../../static/temp-images/higher-self-1.jpg').default,
    projectName: '2022',
    projectLink: 'Multi | Next Album'
  },
  {
    imgNative: require('../../static/temp-images/ram-dass-syf.jpg').default,
    projectName: '2021',
    projectLink: 'Multi | SYF 2021 Update'
  },
  {
    imgNative: require('../../static/temp-images/silence-mind-sticker.jpg').default,
    projectName: '2023',
    projectLink: 'Multi | Silence Mind'
  },
  {
    imgNative: require('../../static/temp-images/version-of-you.jpg').default,
    projectName: '2023',
    projectLink: 'Multi | V'
  },
];

export default function Home() {
  return (
    <>
    <Layout>
        <div className="container">
          <div className="intro-grid-text">
            <div>
            Unique blend of creativity, technical skill, and an innovative approach that draws upon a wide range of disciplines, including graphic design, web development, product design, and <Link to="/about"> more. </Link> 
            </div>
          </div>
        </div>
        {/* highlighted project grid */}
        <div className="container">
        <Rowheader titleCategory={'Highlighted Projects'} dateProject={'2010-2023'} />
          <div className="highlighted-project-grid-1">
            <div className="hl-1">
              <Link to="/projects/landingp">  
                <StaticImage
                  src="../images/highlighted-projects/landing-space-h1.png"
                  alt="Landing.Space Project"
                  placeholder="blurred"
                  objectFit="fill"
                  />
                  <div className="hl-description-container"> 
                    <p> Product Design (Early Stage Growth)</p>
                    <p> Landing.Space | ↗︎</p>
                  </div>
                </Link>
            </div>
            <div className="hl-2">
            <Link to="/projects/hardsurface">
            <StaticImage
              src="../images/highlighted-projects/devices-h2.png"
              alt="3D Hard Surface Design"
              placeholder="blurred"
              />
              </Link>
              <div className="hl-description-container"> 
                    <p> Hard Surface Modeling  </p>
                    <p> Device™ | ↗︎ </p>
                  </div>
            </div>
            <div className="hl-3">
              <Link to="projects/aritzia">
            <StaticImage
              src="../images/highlighted-projects/aritzia-h1.png"
              alt="Aritzia Case Study"
              placeholder="blurred"
              />
              <div className="hl-description-container"> 
              <p> Product Design (E-Com)</p>
              <p> Aritzia | ↗︎</p>
              </div>
              </Link>
            </div>
            <div className="hl-4">
              <Link to ="/projects/tome">
              <StaticImage
                src="../images/highlighted-projects/tome-branding-h3.png"
                alt="Tome Brand Design"
                placeholder="blurred"
                />
                <div className="hl-description-container"> 
                <p> Brand Design</p>
                <p> Magical Tome | ↗︎ </p>
                </div>
                </Link>
            </div>
            <div className="hl-5">
            <Link to="/projects/ring">             
              <StaticImage
                src="../images/highlighted-projects/ring-neighborhood-h4.png"
                alt="Ring Neighborhoods"
                placeholder="blurred"
               
                />
                <div className="hl-description-container"> 
                <p> Product Design (Early Stage)</p>
                <p> Ring | ↗︎ </p>
                </div>
            </Link>
            </div>
            <div className="hl-6">
              <Link to="/projects/teika">
            <StaticImage
              src="../images/highlighted-projects/teikametrics-h5.png"
              alt="Teikametrics Product Design"
              placeholder="blurred"
              // width={608}
              // height={310}
              />
                <div className="hl-description-container"> 
                <p> Product Design</p>
                <p> Teikametrics | ↗︎  </p>
                </div>
              </Link>
            </div>
            <div className="hl-7">
              <Link to="/projects/landingb">
            <StaticImage
              src="../images/highlighted-projects/landing-branding-h6.png"
              alt="A dinosaur"
              placeholder="blurred"
              // width={452}
              // height={310}
              />
                <div className="hl-description-container"> 
                <p> Brand Design</p>
                <p> Landing.Space | ↗︎ </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/* project lists - dynamic portion */}
        {/* working section */}
        <div className="container"> 
          <Rowheader titleCategory={'3D Artifacts'} dateProject={'2019-2023'} />
          <div>
          <Projectcontainer imageObjects={imageObjectsRow1} />
        </div>
        </div>
        <div className="container"> 
          <Rowheader titleCategory={'Graphic Design Artifacts'} dateProject={'2019-2023'} />
          <div>
          <Projectcontainer imageObjects={imageObjectsRow2} />
        </div>
        </div>
        <div className="container">
          <div className="callouts-grid"> 
            <div className="title-3"> Who’s to say we just have to share one part of ourselves on the web? </div>
          </div>
          <div className="callouts-grid">
          <div className="featured-links-container">
            {/* random links from the web */}
              <div className="feature-object">
                  <a href="https://www.youtube.com/@MicahCarroll" target="_blank"> 
                  <p className="feature-title"> Youtube Channel</p>
                  <p className="feature-description"> Teaching Blender & tricks</p>
                  <p className="feature-year"> 2022</p>
                  </a>
                </div>
              <div className="feature-object">
                <a href="https://news.feltzine.us/2022/08/19/desktop-a-generative-web3d-collection-by-felt-zine/" target="_blank"> 
                <p className="feature-title"> Desktop : A Generative Web3D Collection</p>
                <p className="feature-description"> Responsible for content generation and environment creation.</p>
                <p className="feature-year"> 2022</p>
                </a>
              </div>
              <div className="feature-object">
                <a href="https://www.youtube.com/watch?v=tWGzLXLdRY8&t=69s" target="_blank"> 
                <p className="feature-title"> Dreamcore, Vol 1 Album Art</p>
                <p className="feature-description"> Setup the 3D modeling & motion work</p>
                <p className="feature-year"> 2023</p>
                </a>
              </div>
              <div className="feature-object">
                <a href="https://dribbble.com/MicahCarroll" target="_blank"> 
                <p className="feature-title"> Dribbble</p>
                <p className="feature-description"> Showcasing random assortments of design.</p>
                <p className="feature-year"> 2023</p>
                </a>
              </div>
              <div className="feature-object">
                <a href="https://vimeo.com/manage/folders/10023201" target="_blank"> 
                <p className="feature-title"> Audio Visual Loops</p>
                <p className="feature-description"> While learning 3D I got into "concert visuals"</p>
                <p className="feature-year"> 2022</p>
                </a>
              </div>
          </div>
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
          <div className="callouts-grid mb-5"> 
            <div className="opening-hours"> 
            <p> Opening hours</p>
            <p> Monday to Friday 9AM - 6PM</p>
            </div>
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
<meta property="og:image" content="../../static/metadata-image.png" />

<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="https://micahcarroll.com/" />
<meta property="twitter:title" content="Micah Carroll " />
<meta property="twitter:description" content="Design utilizing a unique blend of creativity, technical skill, and an innovative approach that draws upon a wide range of disciplines, including graphic design, 3D tooling, product design, and more" />
<meta property="twitter:image" content="../../static/metadata-image.png" />


</>
)
   
  
