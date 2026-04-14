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
            <a href="#">Dribbble</a>
            <a href="#">Linkedin</a>
            <a href="#">X</a>
            <a href="#">Instagram</a>
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
