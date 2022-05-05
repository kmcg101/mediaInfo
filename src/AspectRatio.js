

import React, { useEffect, useState } from 'react'
import './App.css'


function AspectRatio(props) {

  const ar = Number(props.aspectRatio);

  return (
    <div className='leftContent'>
      <div className='flexColumn'>

        <div className='titleText'>Aspect Ratio</div>
        <div className={`normalText aspectRatioRow ${props.aspectRatio === undefined ? "beforeDrop" : ""}`}>16:9 <span className={`aspectRatioCheck ${ar === 1.778 ? "correct" : "incorrect"}`}></span></div>
        <div className={`normalText aspectRatioRow ${props.aspectRatio === undefined ? "beforeDrop" : ""}`}>9:16 <span className={`aspectRatioCheck ${ar === .562 ? "correct" : "incorrect"}`}></span></div>
        <div className={`normalText aspectRatioRow ${props.aspectRatio === undefined ? "beforeDrop" : ""}`}>4:3 <span className={`aspectRatioCheck ${ar === 1.333 ? "correct" : "incorrect"}`}></span></div>

      </div>
    </div>
  );
}

export default AspectRatio;
