// git init
// git add .
// git remote add origin git@github.com:kmcg101/mediaInfo.git
// git commit -m 'first commit'
// git push origin master

import React, { useEffect, useState } from 'react'
import Dropzone from './Dropzone'
import './App.css';


function App(props) {
  const [files, setFiles] = useState([]);
  const [productIndex, setProductIndex] = useState(0);
  

  const handleAllDropzoneChanges = (name, value) => {
  };





  return (
    <section className="container">

      <Dropzone productIndex={productIndex} />
    </section>
  );
}

export default App;
