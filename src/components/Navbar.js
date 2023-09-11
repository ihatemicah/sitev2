import { Link } from 'gatsby'
import React from 'react'
import logo from '../images/nav/name.svg'
import "../styles/mystyles.scss"

export default function Navbar() {
  return (
    <nav class="container">
     <div class="navbar-brand">
        <div class="navbar-item nav-header"> 
        <Link to ="/"> 
        <img src={logo} height="46px" />
        </Link>
        </div>
        <div class="navbar-end"> 33.8492° N, 118.3884° W</div>
        {/* <div class="navbar-item"></div> */}
     </div>
    </nav>
  )
}
