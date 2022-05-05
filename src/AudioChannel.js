

import React, { useEffect, useState } from 'react';
import './App.css';
import noAudio from './noAudio.png'
import yesAudio from './yesAudio.png'
import preAudio from './preAudio.png'



function AudioChannel(props) {

    const audioChannel = props.value;
    
    
    
  return (
    <div className='statsRight'>
      
        <img className='audioImage' src={`${props.value === 0 ? noAudio : props.value === 1 ? yesAudio : preAudio}`}/>
       
     
    </div>
  );
}

export default AudioChannel;
