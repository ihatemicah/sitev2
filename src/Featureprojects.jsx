import HoverVideoPlayer from 'react-hover-video-player'
import './Components.css'

/**
 * One row = one array. Each tile is its own object with its own URLs (no shared image constants).
 *
 * Image tile:  { type: 'image',  src: 'https://…',  date, title }
 * Video tile: { type: 'video', videoSrc: 'https://…', thumbnail: 'https://…', date, title }
 */
const featuredProjectRows = [
  [
    {
      type: 'video',
      videoSrc: 'https://zone-multi.b-cdn.net/Motion%20Projects/jb_teaser_1.mp4',
      thumbnail: 'https://zone-multi.b-cdn.net/Static/j_b_thumbnail.jpg',
      date: '2025.01',
      title: 'J+B | Motion + 3D Product Renders',
    },
    {
      type: 'image',
      src: 'https://zone-multi.b-cdn.net/Static/brat_c.jpg',
      date: '2026.04',
      title: 'Charlie XCX (Fan Project) | 3D Renders',
    },
    {
      type: 'image',
      src: 'https://zone-multi.b-cdn.net/Static/Subframe%203D%20Project.jpg',
      date: '2025.02',
      title: 'Subframe | Device 3D Renders',
    },
    {
      type: 'image',
      src: 'https://zone-multi.b-cdn.net/Static/All%20Product%20Blokes.jpg',
      date: '2023.02',
      title: 'J+B | E-Comm 3D Renders',
    },
  ],
  [
    {
      type: 'image',
      src: 'https://zone-multi.b-cdn.net/Static/seedling.jpg',
      date: '2026.04',
      title: 'Seedling | Interface + Brand Design',
    },
    {
      type: 'image',
      src: 'https://zone-multi.b-cdn.net/Static/ring-neighbors.jpg',
      date: '2023.02',
      title: 'Ring | Product Design',
    },
    {
      type: 'image',
      src: 'https://zone-multi.b-cdn.net/Static/landing-space.jpg',
      date: '2023.02',
      title: 'Landing | Product Design',
    },
    {
      type: 'image',
      src: 'https://zone-multi.b-cdn.net/Static/aritzia.jpg',
      date: '2023.02',
      title: 'Aritzia | Experience Design',
    },
  ],
]

function ProjectMedia({ item }) {
  if (item.type === 'video') {
    return (
      <HoverVideoPlayer
        videoSrc={item.videoSrc}
        pausedOverlay={<img src={item.thumbnail} alt="" className="s-default" />}
        className="s-default"
        restartOnPaused
        unloadVideoOnPaused={false}
        preload="metadata"
      />
    )
  }
  return <img src={item.src} alt="" />
}

function FeatureProjects() {
  return (
    <section className="projects">

      <div className='projects-header'>
        <div className='project-header-1'>
          <p> Recent favorites</p>
        </div>
        <div className='project-header-2'>
        <p> Last updated: April 2026</p>
        </div>
      </div>
      {featuredProjectRows.map((row, rowIndex) => (
        <div key={rowIndex} className="projects-row">
          {row.map((item, index) => (
            <div
              key={`${rowIndex}-${item.type === 'video' ? item.videoSrc : item.src}-${index}`}
              className="project-item"
            >
              <div className="project-image">
                <ProjectMedia item={item} />
              </div>
              <div className="project-info">
                <span className="project-date">{item.date}</span>
                <p className="project-title">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  )
}

export default FeatureProjects

