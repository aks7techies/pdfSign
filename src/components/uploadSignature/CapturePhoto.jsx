import React from 'react';
import Webcam from "react-webcam";
const CapturePhoto = () => {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
  
    const capture = () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
     
    };
  
    const retake = () => {
      setImgSrc(null);
    };
    console.log(imgSrc)
    
  

    return( <>
    <div className="container  d-flex justify-content-center flex-column align-items-center">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" style={{ width: "100%", height: "auto" }} />
      ) : (
        <Webcam height={300} width={300} ref={webcamRef} />
      )}
      <div className="btn-container">
        {imgSrc ? (
          <button className="btn btn-primary my-1" onClick={retake}>Retake photo</button>
        ) : (
          <button className="btn btn-primary my-1" onClick={capture}>Capture photo</button>
        )}
      </div>
    </div>

    
    
    </>);
}

export default CapturePhoto;