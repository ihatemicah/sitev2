import './Components.css'

function Links() {
    return (
        <div className="links-container" data-reveal>
            <div className='links-header'>
                <p> Places I exist on the internet</p>
                <p> Last updated November 2026</p>

            </div>
            <div className='links-content'> 
                <div className='links-column'>
                    <div className='link-row-1'>
                        <div className='link-obj'>
                             <a href="https://www.youtube.com/@multimicah" target='_blank' className='link-link'>
                                <p> 3D micro courses</p>
                                <p className='op-50'> youtube.com</p>
                             </a>
                        </div>
                        <div className='link-obj'>
                             <a href="https://www.youtube.com/@datashrine-z" target='_blank' className='link-link'>
                                <p> Nostaglic gaming</p>
                                <p className='op-50'> youtube.com</p>
                             </a>
                        </div>
                        <div className='link-obj'>
                             <a href="https://www.youtube.com/@gentleos" target='_blank' className='link-link'>
                                <p> Incomplete vlogs</p>
                                <p className='op-50'> youtube.com</p>
                             </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Links