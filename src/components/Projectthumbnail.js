import React, { useEffect } from 'react'
import '../styles/global.css'
import "../styles/mystyles.scss"
import { StaticImage } from "gatsby-plugin-image"


export default function Projectthumbnail({getImageUrl}) {
    console.log(getImageUrl)
    return (
     <img className='' src={getImageUrl} alt ="image"></img>       

        )
}
