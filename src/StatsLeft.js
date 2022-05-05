

import React, { useEffect, useState } from 'react';
import './App.css';




function StatsLeft(props) {

    const fps = props.fps;
    const duration = props.duration
    
    
    
  return (
    <div className='statsLeft'>
      <div className={`${fps===undefined ? "beforeDrop" : ""}`}>{fps} Frames per Second</div>
      <div className={`${duration===undefined ? "beforeDrop" : ""}`}>{duration} Seconds</div>
       
     
    </div>
  );
}

export default StatsLeft;
