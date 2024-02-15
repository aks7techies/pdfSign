import React,{useState} from "react";
import "./uploadSignature.css";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {Document, Page, pdfjs} from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const UploadSignature = () => {
  const [numPages, setNumPages] = React.useState(null);
  const [openbox, setOpenbox] = React.useState(false);
  const [scale, setScale] = React.useState(1.2);

  const handleZoomIn = () => {
    setScale(scale + 0.1);
  };

  const handleZoomOut = () => {
    setScale(scale - 0.1);
  };

  function onDocumentLoadSuccess({numPages}) {
    setNumPages(numPages);
  }

  const checkfun = (event) => {
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
                    <div className="card-body">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <label
                            htmlFor="uploadSignature"
                            className="form-label"
                          >
                            Upload Signature
                          </label>
                          <div className="image-upload-wrap">
                            <input
                              className="file-upload-input"
                              type="file"
                              accept="image/*"
                            />
                            <div className="drag-text">
                              <h3>
                                {" "}
                                <i> Select file </i>{" "}
                              </h3>
                            </div>
                          </div>
                          {/* <div className="dropdowncss">
                          <input
                            className="file-upload-input" 
                            type="file"
                            name="uploadSignature"
                            id="uploadSignature"
                            required={!openbox}
                          />
                           <h3 className="drophtag">Select File</h3>
                          </div> */}
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
                            <label htmlFor="writentype" className="form-label">
                              Enter Signature
                            </label>
                            <input
                              type="text"
                              name="writentype"
                              id="writentype"
                              className="form-control"
                            />
                          </div>
                        </li>
                      </ul>
                      <div className="mt-3">
                        <button className="btn btn-primary" name="btn">
                          Submit
                        </button>
                      </div>
                    </div>
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
