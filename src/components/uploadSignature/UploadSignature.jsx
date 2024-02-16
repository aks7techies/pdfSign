import React, {useCallback} from "react";
// import {Formik, Field, ErrorMessage} from "formik";
// import * as Yup from "yup";
import {useDropzone} from "react-dropzone";
import "./uploadSignature.css";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {Document, Page, pdfjs} from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const UploadSignature = () => {
  const [numPages, setNumPages] = React.useState(null);
  const [openbox, setOpenbox] = React.useState(false);
  const [preview, setPreview] = React.useState(null);
  const [error,setError] = React.useState(null);
  const [fileName, setFileName] = React.useState(null);
  const [writeName, setWriteName] = React.useState(null);
  const [scale, setScale] = React.useState(1.2);

  console.log(error)
  // const handleZoomIn = () => {
  //   setScale(scale + 0.1);
  // };

  // const handleZoomOut = () => {
  //   setScale(scale - 0.1);
  // };

  const onDrop = useCallback((acceptedFiles) => {
   const valid =  typeValidator(acceptedFiles[0]);
   if(valid.code){
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const binaryStr = reader.result;
        setPreview(binaryStr);
        setError(null)
        setFileName(acceptedFiles[0].name);
        setWriteName(null);
      };
    });
   }else{
    setError(valid.message);
    setPreview(null);
    setFileName(null);
    setWriteName(null);
   }
  }, []);

  const typeValidator = (file) => {
   if (!(['image/jpeg','image/jpg','image/png'].includes(file.type) )) {
      if (file.size > 9 * 1024 * 1024) {
        // 10MB limit
        return {
          code:false,
          message:'File is too large. Maximum size is 10 MB.'
        };
      }
      return {
        code:false,
        message:'Unsupported file format, Only  jpg and jpeg, png file'
      };
    }
    return {
      code:true,
      message:'formate right and file size right'
    };
  };
const handleChange = (value)=>{
     setWriteName(value);
     setFileName(null);
   
}
  const submitForm = () => {
    // console.log();
      if(fileName){
      }
      if(writeName){

      }


  };

  function onDocumentLoadSuccess({numPages}) {
    setNumPages(numPages);
  }

  const checkfun = (event) => {
    if(fileName){
      setError("Please choose one Option file")
    }else{

    }
    setOpenbox(event.target.checked);
  };
  const customStyles = `
    .react-pdf__Page__textContent {
      display: none !important;
    }
    .react-pdf__Page__annotations {
      display: none !important;
    }
  `;
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  return (
    <>
      <nav className="navbar bg-background px-5 mb-4">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 text-light">PDFSigner</span>
        </div>
      </nav>
      <div className="container-fluid ">
        <section className="">
          <div className="card border-0">
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12 mb-4">
                  <div className="card" style={{width: "100%"}}>
                    <div className="card-header text-center">
                      <h3>Upload Sign</h3>
                    </div>
                        <form method="post">
                          <div className="card-body">
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item">
                                <label
                                  htmlFor="uploadSignature"
                                  className="form-label"
                                >
                                  Upload Signature
                                </label>
                                <div className="image-upload-wrap ">
                                  <div {...getRootProps()}>
                                    <input
                                      {...getInputProps()}
                                      name="Uploadsign"
                                      type="file"
                                      required={!openbox}
                                    />
                                    {isDragActive ? (
                                      <h4 className="text-center">
                                        <i>Drop the files</i>
                                      </h4>
                                    ) : (
                                      <h4 className="text-center">
                                        <i> Drop down, or Select files</i>
                                      </h4>
                                    )}
                                  </div>
                                 
                                </div>
                                <span className="text-danger " >{error}</span>
                                
                                <div className="d-flex justify-content-end align-content-center mt-2">
                                  {preview ? (
                                    <img
                                      style={{border: "1px solid #000"}}
                                      src={preview}
                                      alt={preview}
                                      width={150}
                                      height={50}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </li>
                              <li className="list-group-item">
                                <h5 className="text-center mb-0">-OR-</h5>
                              </li>
                              <li className="list-group-item">
                                <FormGroup>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={openbox}
                                        onChange={checkfun}
                                      />
                                    }
                                    label="Writtern Type Signature"
                                  />
                                </FormGroup>
                              </li>
                              <li
                                className={
                                  "list-group-item" +
                                  (!openbox ? " d-none" : " d-block")
                                }
                              >
                                <div className="">
                                  <label
                                    htmlFor="writentype"
                                    className="form-label"
                                  >
                                    Enter Signature
                                  </label>
                                  <input
                                    type="text"
                                    name="writentype"
                                    onChange={(e)=>handleChange(e.target.value)}
                                    id="writentype"
                                    className="form-control"                                  
                                    required={openbox}
                                  />
                                 
                                </div>
                              </li>
                            </ul>
                            <div className="mt-3">
                              <button
                                onClick={submitForm}
                                className= "btn btn-primary"  
                                name="btn"
                               
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </form>
                     
                  </div>
                </div>
                <div className="col-md-8 col-lg-8 col-sm-12 col-xs-12 ">
                  <div className="card">
                    {/* <div className="button-css">
                      <button className="btn btn-outline-dark circles mb-2" onClick={handleZoomIn}><b>+</b></button>
                     <br />
                     <button className="btn btn-outline-dark circles" onClick={handleZoomOut}><b>-</b></button>
                    </div> */}
                    <div
                      className="card-body overflow-auto css_sty"
                      id="style-3"
                    >
                      <Document
                        file="assets/uploads/file2.pdf"
                        onLoadSuccess={onDocumentLoadSuccess}
                        className="pdf-container"
                      >
                        {Array.from(new Array(numPages), (el, index) => (
                          <div
                            key={`page_${index + 1}`}
                            style={{
                              pageBreakAfter: "always",
                              marginBottom: "10px",
                            }}
                            className="pdf-page-wrapper"
                          >
                            <Page
                              key={`page_${index + 1}`}
                              pageNumber={index + 1}
                              renderTextLayer={false} // Disable text layer rendering
                              renderAnnotationLayer={false} // Disable annotation layer rendering
                              scale={scale}
                            />
                          </div>
                        ))}
                      </Document>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

// #endregion

export default UploadSignature;
