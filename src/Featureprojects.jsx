import HoverVideoPlayer from 'react-hover-video-player'
import './Components.css'
import { featuredProjectRows } from './portfolioMedia.js'

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

