import React, { useEffect } from 'react'
import '../styles/global.css'
import "../styles/mystyles.scss"


export default function Projectthumbnail({getImageUrl, autoplay}) {
    console.log(getImageUrl)
    // checking if content is a video: 
    const isVideo = typeof getImageUrl === 'string' && getImageUrl.endsWith('.webm');

    return (
        <>
      {isVideo ? (
        <video controls autoPlay={true} muted={true} controls={false} loop >
          <source src={getImageUrl} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img className='' src={getImageUrl} alt="image" />
      )}
    </>
  );
}
    //  <img className='' src={getImageUrl} alt ="image"></img>       

        
