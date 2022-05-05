

import React, { useEffect, useState } from 'react';
import './App.css';

function StatsMiddle(props) {
    const extension = props.extension;
    const fileSize = props.fileSize;
    const codec = props.codec;

    return (
        <div className='statsMiddle'>
            <div className={`${extension===undefined ? "beforeDrop" : ""}`}>Extension: {extension}</div>
            <div className={`${fileSize===undefined ? "beforeDrop" : ""}`}>File Size: {fileSize}</div>
            <div className={`${codec===undefined ? "beforeDrop" : ""}`}>Codec: {codec}</div>

        </div>
    );
}

export default StatsMiddle;
