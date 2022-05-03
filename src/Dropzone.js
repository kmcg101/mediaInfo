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
  const handleDropzoneChange = (name, value) => {
    props.handleAllDropzoneChanges(name, value);
  };

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      maxFiles: 1,
      accept: {
        'image/jpeg': [],
        'image/png': [],
        'image/svg+xml': [],
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
          console.log("FileSize = ", result.media.track[0].FileSize)
          console.log("Format = ", result.media.track[0].Format)
          console.log("Width = ", result.media.track[1].Width)
          console.log("Height = ", result.media.track[1].Height)
          console.log("FPS = ", result.media.track[0].FrameRate)
          console.log("Codec = ", result.media.track[1].CodecID)
          console.log("Aspect Ratio = ", result.media.track[1].DisplayAspectRatio)
          console.log("Format = ", result.media.track[1].Format)
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
    </div>
  );
}
export default Dropzone;
