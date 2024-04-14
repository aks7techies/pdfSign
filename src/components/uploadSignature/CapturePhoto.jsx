import React, { useEffect } from 'react';
import Webcam from "react-webcam";
import { useDispatch } from "react-redux";
import { saveData } from "../../redux/slices/captureImage";

const CapturePhoto = () => {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(saveData(0));
    },[])
   
  
    const capture = () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
        if(imageSrc!==null){
          dispatch(saveData(1));
        }else{
          dispatch(saveData(0));
        }
       };
     
    
  
    const retake = () => {
      setImgSrc(null);
    };
    
    return (
      <div className="container d-flex justify-content-center flex-column align-items-center">
        {imgSrc ? (
          <img src={imgSrc} alt="webcam" style={{ width: "100%", height: "auto" }} />
        ) : (
          <Webcam
            ref={webcamRef}
            style={{ width:"100%" }}
            screenshotFormat="image/jpeg" // Capture photo instead of video
          />
        )}
        <div className="btn-container">
          {imgSrc ? (
            <button className="btn btn-primary my-1" onClick={retake}>Retake photo</button>
          ) : (
            <button className="btn btn-primary my-1" onClick={capture}>Capture photo</button>
          )}
        </div>
      </div>
    );
}

export default CapturePhoto;
