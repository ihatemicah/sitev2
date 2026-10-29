import { useState, useEffect } from 'react'
import { DateTime } from 'luxon'
import './Components.css'

function Footer() {
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const time = DateTime.now().setZone('America/Los_Angeles')
      setCurrentTime(time.toFormat('HH:mm:ss'))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="footer-container">
      <hr/>
      <div className='footer-section'>
        <div>
            <p> There are no ordinary moments </p>
            <div className='footer-links'>
            <a href="https://www.linkedin.com/in/carrollmicah/" target="_blank">Linkedin</a>
            <a href="https://x.com/multimicah" target="_blank">X (Twitter)</a>
            <a href="https://www.instagram.com/multimicah" target="_blank">Instagram</a>
       
            <a href="experiments.html">Experiments</a>
            </div>
        </div>
        <div className='local-clock'>
            {currentTime}
        </div>
      </div>
    </div>
  )
}

export default Footer
