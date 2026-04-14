import './Components.css'

function Links() {
    return (
        <div className="links-container">
            <div className='links-header'>
                <p> Places I exist on the internet</p>
                <p> Last updated Dec 30th 2025</p>

            </div>
            <div className='links-content'> 
                <div className='links-column'>
                    <div className='link-row-1'>
                        <div className='link-obj'>
                             <a href="https://www.youtube.com/@multimicah" target='_blank' className='link-link'>
                                <p> Main Youtube Channel</p>
                                <p className='op-50'> youtube.com</p>
                             </a>
                        </div>
                        <div className='link-obj'>
                             <a href="https://www.youtube.com/@datashrine-z" target='_blank' className='link-link'>
                                <p> Retro Gaming Channel</p>
                                <p className='op-50'> youtube.com</p>
                             </a>
                        </div>
                        <div className='link-obj'>
                             <a href="https://www.youtube.com/@gentleos" target='_blank' className='link-link'>
                                <p> Vlogging channel</p>
                                <p className='op-50'> youtube.com</p>
                             </a>
                        </div>
                    </div>
                    <div className='link-row-2'>
                        <div className='link-obj'>
                             <a href="https://dribbble.com/MicahCarroll" target='_blank' className='link-link'>
                                <p> Dribbble (Designs)</p>
                                <p className='op-50'> dribbble.com</p>
                             </a>
                        </div>
                        <div className='link-obj'>
                             <a href="https://www.are.na/micah-carroll/index" target='_blank' className='link-link'>
                                <p> Are.na (Moodboard)</p>
                                <p className='op-50'> are.na</p>
                             </a>
                        </div>
                        <div className='link-obj'>
                             <a href="https://www.pinterest.com/multimicah/" target='_blank' className='link-link'>
                                <p> Pinterest</p>
                                <p className='op-50'> pinterest.com</p>
                             </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Links