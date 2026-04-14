import './Components.css'

function Header() {
  return (
    <header>
        <div className="header-container">
                <div> 
                  <h1>Micah Carroll</h1>
                  <p className='mobile-email-address'> work@micahcarroll.com</p>
                  <p className='about-me-lite'> Designer partnering with brands across 3D, motion, and visual design.</p> 
                  <p className='work-style-info'> Specializing in embedded, long-term collaborations.</p>
                   
                </div>
                    <div>
                        <p className='email-address'> work@micahcarroll.com </p>
                        <p className='location'> 33.8492° N, 118.3884° W</p>
                    </div>
                
        </div>
      

    </header>
  )
}

export default Header

