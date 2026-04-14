import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'
import App from './App.jsx'

gsap.registerPlugin(ScrollTrigger)

function ensureHeadLink(rel, attrs) {
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  Object.assign(el, attrs)
}

ensureHeadLink('icon', {
  // Resolved in the browser from the bundle URL (not the document URL).
  href: new URL(/* @vite-ignore */ '../favi-3.svg', import.meta.url).href,
  type: 'image/svg+xml',
})
ensureHeadLink('apple-touch-icon', {
  href: new URL(/* @vite-ignore */ '../favi.png', import.meta.url).href,
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
