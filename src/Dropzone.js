import React, { useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { getInfo } from 'react-mediainfo'
import "./dropzone.css";

const baseStyle = {
  position: "absolute",
  width: "160px",
  height: "220px",
  borderWidth: 1,
  borderRadius: 2,
  borderColor: "blue",
  borderStyle: "dashed",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  left: "10px",
  top: "570px"
};
const acceptStyle = {
  borderColor: "#00e676",
  borderWidth: 4,
};

const rejectStyle = {
  borderColor: "#ff1744",
  borderWidth: 4,
};

function Dropzone(props) {
  const [files, setFiles] = useState([]);
  const [isVideo, setIsVideo] = useState([false]);
  

  const handleAttributesChange = (name, value) => {
    props.handleAttributesChange(name, value);
    
  }

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      maxFiles: 1,
      accept: {
        'video/mp4': []
      },


      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
        // get width and height of preview
        const newFile = acceptedFiles[0];
        const newInfo = getInfo(newFile).then((result) => {
          console.log(result)
          const extArray = acceptedFiles[0].path.split(".")
          const ext = extArray[1]
          setIsVideo(ext==="mp4")
          handleAttributesChange("Extension", ext)
          handleAttributesChange("FileType", acceptedFiles[0].type)
          
          const ac= result.media.track[0].AudioCount
          handleAttributesChange("AudioCount", ac==="1" ? 1 : 0)
          
          handleAttributesChange("Duration", result.media.track[1].Duration)
          handleAttributesChange("FileSize", `${result.media.track[0].FileSize/1000000} MB`)
          handleAttributesChange("Format", result.media.track[0].Format)
          handleAttributesChange("Width", result.media.track[1].Width)
          handleAttributesChange("Height", result.media.track[1].Height)
          handleAttributesChange("FPS", result.media.track[0].FrameRate)
          handleAttributesChange("Codec", result.media.track[1].CodecID)
          handleAttributesChange("AspectRatio", result.media.track[1].DisplayAspectRatio)
          handleAttributesChange("Format", result.media.track[1].Format)

        })

      },
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragAccept, isDragReject]
  );



  const imagePreview = files.map((file) => (
    <div className='dropzoneImageKey' key={file.name}>
      <div className="dropzoneImageParent">
        <img src={file.preview} style={{ width: "100%" }} alt="preview" />
      </div>
    </div>
  ));

  const videoPreview = files.map((file) => (
    <div className='dropzoneImageKey' key={file.name}>
      <div className="dropzoneImageParent">
        <video autoPlay loop style={{ width: "100%" }}>
          <source src={URL.createObjectURL(file)} />
        </video>
      </div>
    </div>

  ));



  return (
    <div className='dropzone'>
      <div className="dropzoneImageGrandParent">
      <div className="droppedImageHolder">{isVideo ? videoPreview : imagePreview}</div>
        <div {...getRootProps({ style })} className="dropZone">
          <input {...getInputProps()} />Drop mp4 here
        </div>
        
      </div>


     
    </div>
  );
}
export default Dropzone;
