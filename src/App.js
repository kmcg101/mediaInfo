// git init
// git add .
// git remote add origin git@github.com:kmcg101/mediaInfo.git
// git commit -m 'first commit'
// git push origin master

import React, { useEffect, useState } from 'react'
import Dropzone from './Dropzone'
import './App.css';
import WidthComponent from './WidthComponent';
import HeightComponent from './HeightComponent';
import AspectRatio from './AspectRatio';
import AudioChannel from './AudioChannel';
import StatsLeft from './StatsLeft'
import StatsMiddle from './StatsMiddle'


function App(props) {

  const [productIndex, setProductIndex] = useState(0);
  const [videoAttributes, setVideoAttributes] = useState([])

  const handleAttributesChange = (name, value) => {
    setVideoAttributes((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }


  return (
    <section className="container">
      <div className="contentArea">

        <AspectRatio aspectRatio={videoAttributes.AspectRatio} />
        <div className='centerContent'>
          <WidthComponent width={videoAttributes.Width} />
          <Dropzone handleAttributesChange={handleAttributesChange}/>
          <div className='statsContainer'>
            <StatsLeft fps={videoAttributes.FPS} duration={videoAttributes.Duration} />
            <StatsMiddle extension={videoAttributes.Extension} fileSize={videoAttributes.FileSize} codec={videoAttributes.Codec} />
            <AudioChannel value={videoAttributes.AudioCount} />
          </div>
        </div>
        <div className='rightContent'>
          <HeightComponent width={videoAttributes.Height} />
        </div>


      </div>
      <div className="warningArea">Warnings:</div>


    </section>
  );
}

export default App;
