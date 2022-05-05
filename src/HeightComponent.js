

import React, { useEffect, useState } from 'react'
import './App.css'


function HeightComponent(props) {
 

  return (
    <div className='flexColumn'>
      <div className='vl'></div>
      <div className={`titleText ${props.width===undefined ? "beforeDrop" : ""}`}>
          {props.width} px  
      
      </div>
      <div className='vl'></div>
    </div>
  );
}

export default HeightComponent;
