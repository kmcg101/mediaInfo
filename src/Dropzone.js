import React, { useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { getInfo } from 'react-mediainfo'
import "./dropzone.css";

const baseStyle = {
  borderWidth: 1,
  borderRadius: 2,
  borderColor: "blue",
  borderStyle: "dashed",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
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
  const [mediaAttributes, setMediaAttributes] = useState([]);


  
 

  const handleAttributesChange = (name, value) => {
    setMediaAttributes((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      maxFiles: 1,
      accept: {
        //'image/jpeg': [],
        //'image/png': [],
        //'image/svg+xml': [],
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
          console.log("duration = ", result.media.track[1].Duration)
          handleAttributesChange("Duration", result.media.track[1].Duration)
          handleAttributesChange("FileSize", result.media.track[0].FileSize)
          handleAttributesChange("Format",result.media.track[0].Format )
          handleAttributesChange("Width",result.media.track[1].Width )
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
    <div>
      <div className="dropzoneImageGrandParent">
        <div {...getRootProps({ style })} className="dropZone">
          <input {...getInputProps()} />
        </div>
        <div className="droppedImageHolder">{videoPreview}</div>
      </div>
    

      <table className="resultsTable">
        <tbody>
        <tr>
          <td className='tableLabel'>Width</td>
          <td>{mediaAttributes.Width}</td>
        </tr>
        <tr>
          <td className='tableLabel'>Height</td>
          <td>{mediaAttributes.Height}</td>
        </tr>
        <tr>
          <td className='tableLabel'>FileSize</td>
          <td>{mediaAttributes.FileSize}</td>
        </tr>
        <tr>
          <td className='tableLabel'>Format</td>
          <td>{mediaAttributes.Format}</td>
        </tr>
        <tr>
          <td className='tableLabel'>Duration</td>
          <td>{mediaAttributes.Duration}</td>
        </tr>
        <tr>
          <td className='tableLabel'>Codec</td>
          <td>{mediaAttributes.Codec}</td>
        </tr>
        <tr>
          <td className='tableLabel'>Aspect Ratio</td>
          <td>{mediaAttributes.AspectRatio}</td>
        </tr>
        <tr >
          <td className='tableLabel'>Format</td>
          <td>{mediaAttributes.Format}</td>
        </tr>
        <tr>
        <td className='tableLabel'>Frame Rate</td>
        <td>{mediaAttributes.FPS}</td>
      </tr>
        </tbody>

      </table>
    </div>
  );
}
export default Dropzone;
