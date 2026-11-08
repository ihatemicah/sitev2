import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import PortfolioHoverVideo from './PortfolioHoverVideo.jsx'
import ProjectModal from './ProjectModal.jsx'
import './Components.css'
import { featuredProjectRows } from './portfolioMedia.js'

function ProjectMedia({ item }) {
  if (item.type === 'video') {
    return (
      <PortfolioHoverVideo
        videoSrc={item.videoSrc}
        thumbnail={item.thumbnail}
        className="s-default"
      />
    )
  }
  return <img src={item.src} alt="" decoding="async" />
}

function SoonIcon() {
  return (
    <svg
      className="coming-soon-label__icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.21922 3H14.7808L18.7808 19H21V21H3V19H5.21922L9.21922 3ZM7.28078 19H16.7192L15.7192 15H8.28078L7.28078 19ZM8.78078 13H15.2192L14.7192 11H9.28078L8.78078 13ZM9.78078 9H14.2192L13.2192 5H10.7808L9.78078 9Z"
        fill="currentColor"
      />
    </svg>
  )
}

function placeLabel(el, x, y) {
  const width = el.offsetWidth
  const height = el.offsetHeight
  let left = x
  let top = y
  if (left + width > window.innerWidth) left = x - 32 - width
  if (top + height > window.innerHeight) top = y - 32 - height
  left = Math.max(8, Math.min(left, window.innerWidth - width - 8))
  top = Math.max(8, Math.min(top, window.innerHeight - height - 8))
  el.style.transform = `translate(${left}px, ${top}px)`
}

function ComingSoonLabel() {
  const labelRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const stateRef = useRef({
    hovering: false,
    focused: false,
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    frame: 0,
  })

  const reduced = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const stop = () => {
    const state = stateRef.current
    cancelAnimationFrame(state.frame)
    state.frame = 0
  }

  const follow = () => {
    const state = stateRef.current
    const el = labelRef.current
    if (!state.hovering || !el) {
      state.frame = 0
      return
    }
    if (reduced()) {
      state.x = state.targetX
      state.y = state.targetY
    } else {
      state.x += (state.targetX - state.x) * 0.2
      state.y += (state.targetY - state.y) * 0.2
    }
    placeLabel(el, state.x + 16, state.y + 16)
    state.frame = requestAnimationFrame(follow)
  }

  useEffect(() => () => stop(), [])

  useEffect(() => {
    const showAt = (event) => {
      if (event.pointerType !== 'mouse') return
      const el = labelRef.current
      const state = stateRef.current
      if (!el) return
      state.hovering = true
      state.targetX = event.clientX
      state.targetY = event.clientY
      state.x = event.clientX
      state.y = event.clientY
      placeLabel(el, state.x + 16, state.y + 16)
      setVisible(true)
      stop()
      if (!reduced()) state.frame = requestAnimationFrame(follow)
    }

    const moveTo = (event) => {
      if (event.pointerType !== 'mouse') return
      const state = stateRef.current
      const el = labelRef.current
      if (!state.hovering || !el) return
      state.targetX = event.clientX
      state.targetY = event.clientY
      if (reduced()) {
        state.x = event.clientX
        state.y = event.clientY
        placeLabel(el, state.x + 16, state.y + 16)
      } else if (!state.frame) {
        state.frame = requestAnimationFrame(follow)
      }
    }

    const hideHover = (event) => {
      if (event.pointerType !== 'mouse') return
      const state = stateRef.current
      state.hovering = false
      stop()
      if (!state.focused) setVisible(false)
    }

    const showFocus = (event) => {
      const card = event.target
      if (!(card instanceof Element) || !card.matches(':focus-visible')) return
      const el = labelRef.current
      const state = stateRef.current
      if (!el) return
      const rect = card.getBoundingClientRect()
      state.focused = true
      state.hovering = false
      stop()
      placeLabel(el, rect.left + 16, rect.top + 16)
      setVisible(true)
    }

    const hideFocus = () => {
      const state = stateRef.current
      state.focused = false
      if (!state.hovering) setVisible(false)
    }

    const cards = document.querySelectorAll('[data-coming-soon]')
    cards.forEach((card) => {
      card.addEventListener('pointerenter', showAt)
      card.addEventListener('pointermove', moveTo)
      card.addEventListener('pointerleave', hideHover)
      card.addEventListener('focus', showFocus)
      card.addEventListener('blur', hideFocus)
    })
    return () => {
      cards.forEach((card) => {
        card.removeEventListener('pointerenter', showAt)
        card.removeEventListener('pointermove', moveTo)
        card.removeEventListener('pointerleave', hideHover)
        card.removeEventListener('focus', showFocus)
        card.removeEventListener('blur', hideFocus)
      })
    }
  }, [])

  return createPortal(
    <div
      ref={labelRef}
      className={visible ? 'coming-soon-label is-visible' : 'coming-soon-label'}
      aria-hidden="true"
    >
      <div className="coming-soon-label__pill">
        <SoonIcon />
        Case study coming soon
      </div>
    </div>,
    document.body
  )
}

function FeatureProjects() {
  const [activeProject, setActiveProject] = useState(null)
  const hasComingSoon = featuredProjectRows.some((row) =>
    row.some((item) => item.comingSoon)
  )

  return (
    <section className="projects">

      <div className='projects-header'>
        <div className='project-header-1'>
          <p> Recent favorites</p>
        </div>
        <div className='project-header-2'>
        <p> Last updated: October 2026</p>
        </div>
      </div>
      {featuredProjectRows.map((row, rowIndex) => (
        <div key={rowIndex} className="projects-row">
          {row.map((item) => {
            const soon = Boolean(item.comingSoon)
            const caption = (
              <div className="project-info">
                <span className="project-date">{item.date}</span>
                <p className="project-title">
                  {item.title}
                  {soon ? (
                    <span className="visually-hidden"> — case study coming soon</span>
                  ) : null}
                </p>
              </div>
            )
            const media = (
              <div className="project-image">
                <ProjectMedia item={item} />
                {soon ? <span className="project-soon-tag">Case study coming soon</span> : null}
              </div>
            )

            if (soon) {
              return (
                <div
                  key={item.id}
                  className="project-item project-item--soon"
                  data-coming-soon=""
                  tabIndex={0}
                >
                  {media}
                  {caption}
                </div>
              )
            }

            return (
              <button
                type="button"
                key={item.id}
                className="project-item"
                onClick={() => setActiveProject(item)}
              >
                {media}
                {caption}
              </button>
            )
          })}
        </div>
      ))}
      {activeProject?.caseStudy ? (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      ) : null}
      {hasComingSoon ? <ComingSoonLabel /> : null}
    </section>
  )
}

export default FeatureProjects
