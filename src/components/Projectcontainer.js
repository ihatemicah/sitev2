import React, { useState,useEffect } from 'react';
import '../styles/global.css';
import '../styles/mystyles.scss';
import Projectthumbnail from './Projectthumbnail';


function ImageComponent({ imageObjects }) {
  const [activeElementId, setActiveElementId] = useState(null);

  const handleClick = (index) => {
    if (activeElementId === index) {
      setActiveElementId(null);
    } else {
      setActiveElementId(index);
    }
  };

// New Code
useEffect(() => {
    // Add an event listener to the project-description-container
    const containerClass = '.varied-project-grid-1';
    const containers = document.querySelectorAll(containerClass);
    const body = document.body;
    const html = window.document.documentElement;

    const enterContainer = () => {
      body.style.overflowY = 'hidden';
      html.style.overflowY = 'hidden';
    };

    const leaveContainer = () => {
      body.style.overflowY = 'auto';
      html.style.overflowY = 'auto';
    };

    containers.forEach((container) => {
      container.addEventListener('mouseenter', enterContainer);
      container.addEventListener('mouseleave', leaveContainer);
    });

    // Add an event listener to handle horizontal scrolling within the containers
    const handleWheel = (e) => {
      containers.forEach((container) => {
        if (container.contains(e.target)) {
          // Scroll horizontally by default when the user scrolls
          container.scrollLeft += e.deltaY;
        }
      });
    };

    body.addEventListener('wheel', handleWheel);

    // Clean up the event listeners when the component unmounts
    return () => {
      containers.forEach((container) => {
        container.removeEventListener('mouseenter', enterContainer);
        container.removeEventListener('mouseleave', leaveContainer);
      });
      body.removeEventListener('wheel', handleWheel);
    };
}, []);

// New Code

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
