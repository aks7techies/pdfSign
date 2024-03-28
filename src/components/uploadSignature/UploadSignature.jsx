import React, {useCallback, useEffect} from "react";
import Modal from "@mui/material/Modal";

import CloseIcon from '@mui/icons-material/Close';
import {useDropzone} from "react-dropzone";
import "./uploadSignature.css";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {PDFDocument, rgb, degrees, StandardFonts} from "pdf-lib";
// import Webcam from "react-webcam";
import {Document, Page, pdfjs} from "react-pdf";
import CapturePhoto from "./CapturePhoto";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const UploadSignature = () => {
  const [numPages, setNumPages] = React.useState(null);
  // const [openbox, setOpenbox] = React.useState(false);
  const [preview, setPreview] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [fileName, setFileName] = React.useState(null);
  const [writeName, setWriteName] = React.useState(null);
  const [scale, setScale] = React.useState(1.2);
  const [value, setValue] = React.useState("1");

  // const [pdfBytes, setPdfBytes] = React.useState(null);
  const [pdfLink, setPdfLink] = React.useState("assets/uploads/file2.pdf");
  const [showModal, setShowModal] = React.useState(false);

  useEffect(() => {
    setShowModal(true);
  }, []);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const embedImages = async (pdfLink, imageUrl) => {
    const pdfUrl = pdfLink; // Replace with the path to your existing PDF
    // Path to the image you want to embed

    try {
      const [pdfBytes2, imageBytes] = await Promise.all([
        fetch(pdfUrl).then((res) => res.arrayBuffer()),
        fetch(imageUrl).then((res) => res.arrayBuffer()),
      ]);

      const pdfDoc = await PDFDocument.load(pdfBytes2);
      let image;

      // Determine the image type based on the file extension
      const isJpeg = imageUrl.toLowerCase().endsWith(".jpg");
      const isPng = imageUrl.toLowerCase().endsWith(".png");

      if (isJpeg) {
        image = await pdfDoc.embedJpg(imageBytes);
      } else if (isPng) {
        image = await pdfDoc.embedPng(imageBytes);
      } else {
        // If the image format cannot be determined from the extension, try embedding as PNG
        try {
          image = await pdfDoc.embedPng(imageBytes);
        } catch (error) {
          throw new Error(
            "Failed to embed image: Unsupported image format. Only JPEG and PNG images are supported."
          );
        }
      }
      const page = pdfDoc.getPages()[0];

      // Adjust the scale as needed

      // Draw the PNG image on the page
      // page.drawImage(pngImage, {
      //     x: 100,
      //     y: 100,
      //     width: pngDims.width,
      //     height: pngDims.height,
      // });

      // Draw the JPG image on the page
      page.drawImage(image, {
        x: 460,
        y: 140,
        width: 100,
        height: 50,
      });

      const modifiedPdfBytes = await pdfDoc.save();
      const uint8Array = new Uint8Array(modifiedPdfBytes);
      const blob = new Blob([uint8Array], {type: "application/pdf"});
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "modified_pdf.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Now, modifiedPdfBytes contains the bytes of the modified PDF with the image embedded.
      // You can save it to a file or use it as needed.
    } catch (error) {
      console.error("Error embedding image into PDF:", error);
    }
  };

  const modifyPdf = async (pdfLink1, text) => {
    try {
      const existingPdfBytes = await fetch(pdfLink1).then((res) =>
        res.arrayBuffer()
      );

      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const {width, height} = firstPage.getSize();
      firstPage.drawText(text, {
        x: 480,
        y: height / 2 + 180,
        size: 8,
        font: helveticaFont,
        color: rgb(0.95, 0.1, 0.1),
        rotate: degrees(0),
      });

      const pdfBytess = await pdfDoc.save();
      const uint8Array = new Uint8Array(pdfBytess);
      const blob = new Blob([uint8Array], {type: "application/pdf"});
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "modified_pdf.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error modifying PDF:", error);
    }
  };

  const handleChange_123 = (event, newValue) => {
    setValue(newValue);
  };

  // console.log(error)
  // const handleZoomIn = () => {
  //   setScale(scale + 0.1);
  // };

  // const handleZoomOut = () => {
  //   setScale(scale - 0.1);
  // };

  const onDrop = useCallback((acceptedFiles) => {
    const valid = typeValidator(acceptedFiles[0]);

    if (valid.code) {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const binaryStr = reader.result;
          setPreview(binaryStr);
          setError(null);
          setFileName(acceptedFiles[0].path);
          handleupload(acceptedFiles[0].path);
          setWriteName(null);
        };
      });
    } else {
      setError(valid.message);
      setPreview(null);
      setFileName(null);
      setWriteName(null);
    }
  }, []);

  const handleupload = async (file) => {
    const formData = new FormData();
    console.log(file);
    formData.append("file", file);

    try {
      const response = await fetch("assets/images/", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("File uploaded successfully.");
        // Optionally, you can clear the selected file state here
      } else {
        console.error("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const typeValidator = (file) => {
    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      if (file.size > 9 * 1024 * 1024) {
        // 10MB limit
        return {
          code: false,
          message: "File is too large. Maximum size is 10 MB.",
        };
      }
      return {
        code: false,
        message: "Unsupported file format, Only  jpg and jpeg, png file",
      };
    }
    return {
      code: true,
      message: "formate right and file size right",
    };
  };
  const handleChange = (values) => {
    setWriteName(values);
    setFileName(null);
  };

  const submitForm_123 = () => {
    console.log(fileName);
    // if (fileName) {
    embedImages(pdfLink, `assets/images/${fileName}`);
    // }
  };
  const submitForm = () => {
    if (writeName) {
      console.log(writeName);

      modifyPdf(pdfLink, writeName);
    }
  };

  function onDocumentLoadSuccess({numPages}) {
    setNumPages(numPages);
  }

  // const customStyles = `
  //   .react-pdf__Page__textContent {
  //     display: none !important;
  //   }
  //   .react-pdf__Page__annotations {
  //     display: none !important;
  //   }
  // `;
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  return (
    <>
      <nav className="navbar bg-background px-5 mb-4">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 text-light">PDFSigner</span>
        </div>
      </nav>
      <div className="container-fluid ">
        <Modal
          open={showModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
               width:"40%",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <div className="row border-bottom mb-5 ">
              <div className="col-md-12 d-flex justify-content-between align-items-center">
                <h5 id="modal-title">Take a Picture</h5>
                <button
                  className="btn btn-outline-dark rounded-circle"
                  style={{position: "relative", top: "-6px"}}
                  onClick={handleCloseModal}
                >
                 <CloseIcon />
                  
                </button>
              </div>
            </div>

            <CapturePhoto />
            {/* <div className="row mb-3">
             
              <div className="col-md-12 text-center">
               
                <img
                  src="../assets/images/small/small-1.jpg"
                  alt="Your Image"
                  className="rounded-circle"
                  style={{width: "200px", height: "200px"}}
                />
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-12 d-flex justify-content-center">
                
                <button className="btn btn-primary me-2">Retake</button>
              
                <button className="btn btn-success">Submit</button>
              </div>
            </div> */}
          </Box>
        </Modal>

        <section className="">
          <div className="card border-0">
            <div className="card-body">
              <div className="row">
                <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12 mb-4">
                  <div className="card" style={{width: "100%"}}>
                    <div className="card-header text-center">
                      <Box sx={{width: "100%"}}>
                        <Tabs
                          value={value}
                          onChange={handleChange_123}
                          textColor="primary"
                          indicatorColor="primary"
                          aria-label="secondary tabs example"
                        >
                          <Tab value="1" label="Upload file" />
                          <Tab value="2" label="Written Type" />
                        </Tabs>
                      </Box>
                    </div>

                    <div
                      className={
                        "card-body" + (value === "1" ? " d-block" : " d-none")
                      }
                    >
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
                          <span className="text-danger ">{error}</span>

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
                      </ul>
                      <div className="mt-3 text-center">
                        <button
                          onClick={submitForm_123}
                          className="btn btn-primary"
                          name="btn"
                        >
                          Submit
                        </button>
                      </div>
                    </div>

                    <div
                      className={
                        "card-body" + (value === "2" ? " d-block" : " d-none")
                      }
                    >
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <div className="">
                            <label htmlFor="writentype" className="form-label">
                              Enter Signature
                            </label>
                            <input
                              type="text"
                              name="writentype"
                              onChange={(e) => handleChange(e.target.value)}
                              id="writentype"
                              placeholder="Enter Signature"
                              className="form-control"
                              required={value === "2" ? true : false}
                            />
                          </div>
                        </li>
                      </ul>
                      <div className="mt-3 text-center">
                        <button
                          onClick={submitForm}
                          className="btn btn-primary"
                          name="btn"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-9 col-lg-9 col-sm-12 col-xs-12 ">
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
