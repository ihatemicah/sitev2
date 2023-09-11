import React, { useState } from 'react';
import '../styles/global.css';
import '../styles/mystyles.scss';
import Projectthumbnail from './Projectthumbnail';
import { StaticImage } from "gatsby-plugin-image";


function ImageComponent({ imageObjects }) {
  const [activeElementId, setActiveElementId] = useState(null);

  const handleClick = (index) => {
    if (activeElementId === index) {
      setActiveElementId(null);
    } else {
      setActiveElementId(index);
    }
  };

  return (
    <div className='varied-project-grid-1'>
      {imageObjects.map((imageObject, index) => (
        <div
          key={index}
          className={`image-object ${activeElementId === index ? 'image-object-full' : ''}`}
          onClick={() => handleClick(index)}
        >
          <Projectthumbnail getImageUrl={imageObject.imgNative} />
          <div className='project-description-container'>
            <div>{imageObject.projectName}</div>
            <div>{imageObject.projectLink}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProjectContainer({ imageObjects }) {
  return <ImageComponent imageObjects={imageObjects} />;
}
