

import React, { useEffect, useState } from 'react'
import './App.css'


function WidthComponent(props) {

  return (
    <div className='widthContainer'>
      <div className='flexRow'>
        <hr></hr>
        <div className={`titleText ${props.width===undefined ? "beforeDrop" : ""}`}>
          {props.width} px

        </div>
        <hr></hr>
      </div>
    </div>
  );
}

export default WidthComponent;
