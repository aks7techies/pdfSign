import React, { useCallback, useEffect,useRef} from "react";
import Modal from "@mui/material/Modal";

// import CloseIcon from "@mui/icons-material/Close";
import { useDropzone } from "react-dropzone";
import "./uploadSignature.css";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Webcam from "react-webcam";
import DrawIcon from "@mui/icons-material/Draw";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AutoFixOffIcon from "@mui/icons-material/AutoFixOff";
import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";
// import Webcam from "react-webcam";
import { Document, Page, pdfjs } from "react-pdf";
// import CapturePhoto from "./CapturePhoto";
// import { useSelector } from "react-redux";

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
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const inputRef = useRef(null);

  // const [pdfBytes, setPdfBytes] = React.useState(null);
  const [pdfLink, setPdfLink] = React.useState("assets/uploads/file2.pdf");
  const [showModal, setShowModal] = React.useState(false);
  const [showSingerModal, setShowSingerModal] = React.useState(false);
  // const captureImageData = useSelector((state)=> state.captureImage.value);
  // console.log(captureImageData);

  useEffect(() => {
    setShowModal(true);
  }, []);

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };
  // const handleSingerCloseModal = () => {
  //   setShowSingerModal(false);
  // };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    if (imageSrc !== null) {
      setShowSingerModal(true);
      // dispatch(saveData(1));
      setShowModal(false);
    } else {
      // dispatch(saveData(0));
      setShowSingerModal(false);
    }
  };

  const retake = () => {
    setImgSrc(null);
    // dispatch(saveData(0));
  };
  const handleSingerCloseModal = () => {
    setShowSingerModal(false);
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
      const blob = new Blob([uint8Array], { type: "application/pdf" });
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
      const { width, height } = firstPage.getSize();
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
      const blob = new Blob([uint8Array], { type: "application/pdf" });
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
         console.log(acceptedFiles);
    if (valid.code) {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const binaryStr = reader.result;
          setPreview(binaryStr);
          setError(null);
          setFileName(acceptedFiles[0].path);
          handleUpload(acceptedFiles[0]);
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

  const handleUpload = async (file) => {
    const formData = new FormData();
  
    formData.append("file", file);
    // console.log(formData);
  
    try {
      const response = await fetch("https://example.com/upload", {
        // Replace "https://example.com/upload" with your actual upload URL
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
  const resetSignature = () => {
    setWriteName(null);
    setPreview(null);
    setFileName(null);
    inputRef.current.value='';

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

  function onDocumentLoadSuccess({ numPages }) {
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
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <>
      <nav className="navbar bg-background px-5 mb-4">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <h1 className="navbar-brand mb-0 fs-2 text-light">PDFSigner</h1>
          <div className="profile1 dropdown d-flex align-items-center">
            <span className="px-2 fs-6 fw-bold text-white">Hi, Ananya Roy</span>
            <img
              className="dropbtn"
              src="https://1.bp.blogspot.com/-vhmWFWO2r8U/YLjr2A57toI/AAAAAAAACO4/0GBonlEZPmAiQW4uvkCTm5LvlJVd_-l_wCNcBGAsYHQ/s16000/team-1-2.jpg"
              alt="profile_picture"
            />
          </div>
        </div>
      </nav>
      <div className="container-fluid ">
        <Modal
          open={showModal}
          // onClose={handleCloseModal}
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
              width: "50%",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <div className="row border-bottom mb-5 ">
              <div className="col-md-12 d-flex justify-content-between align-items-center">
                <h5 id="modal-title">Capture Your Picture</h5>
                {/* <button
                  className="btn btn-outline-dark rounded-circle"
                  style={{position: "relative", top: "-6px"}}
                  onClick={handleCloseModal}
                >
                  <CloseIcon />
                </button> */}
              </div>
            </div>
            <div className="container  d-flex justify-content-center flex-column align-items-center">
              {imgSrc ? (
                <img
                  src={imgSrc}
                  alt="webcam"
                  style={{ width: "100%", height: "auto" }}
                />
              ) : (
                <Webcam ref={webcamRef} style={{ width: "100%" }} />
              )}
              <div className="btn-container">
                {imgSrc ? (
                  <button className="btn btn-primary my-1" onClick={retake}>
                    Retake photo
                  </button>
                ) : (
                  <button className="btn btn-primary my-1" onClick={capture}>
                    Capture photo
                  </button>
                )}
              </div>
            </div>
            {/* <CapturePhoto /> */}
          </Box>
        </Modal>

        <section className="">
          <div className="card border-0">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 ">
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
                <Modal
                  open={showSingerModal}
                  // onClose={handleSingerCloseModal}
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
                      width: "60%",
                      backgroundColor: "white",
                      padding: "20px",
                      borderRadius: "8px",
                    }}
                  >
                    <div className="row border-bottom mb-2 ">
                      <div className="col-md-12 d-flex justify-content-between align-items-center">
                        <h5 id="modal-title">
                          Please Sign Your name on the pad below
                        </h5>
                        {/* <button
                          className="btn btn-outline-dark rounded-circle"
                          style={{position: "relative", top: "-6px"}}
                          onClick={handleSingerCloseModal}
                        >
                          <CloseIcon />
                        </button> */}
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 mb-4">
                      <div className="" style={{ width: "100%" }}>
                        <div
                          className={
                            "card-body" +
                            (value === "1" ? " d-block" : " d-none")
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
                                <div
                                  {...getRootProps()}
                                  style={{ height: "120px" }}
                                  className="d-flex justify-content-center align-items-center"
                                >
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
                                    style={{ border: "1px solid #000" }}
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
                        </div>

                        <div
                          className={
                            "card-body" +
                            (value === "2" ? " d-block" : " d-none")
                          }
                        >
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              <label
                                htmlFor="writentype"
                                className="form-label"
                              >
                                Enter Signature
                              </label>
                              <div className="div-signature">
                                <input
                                  type="text"
                                  name="writentype"
                                  onChange={(e) => handleChange(e.target.value)}
                                  id="writentype"
                                  placeholder="Enter Signature"
                                  className="form-control"
                                  ref={inputRef}
                                  required={value === "2" ? true : false}
                                />
                              </div>
                              <div className="d-flex justify-content-end align-content-center mt-2">
                                <div
                                  className={
                                    writeName
                                      ? "previewStyleClass border border-1 px-4 py-2  rounded"
                                      : "d-none"
                                  }
                                >
                                  {writeName}
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <div className=" text-center mb-2">
                        <Box sx={{ width: "100%" }}>
                          <Tabs
                            value={value}
                            onChange={handleChange_123}
                            textColor="primary"
                            indicatorColor="primary"
                            aria-label="secondary tabs example"
                          >
                            <Tab
                              value="1"
                              label="Upload file"
                              icon={<FileUploadIcon />}
                              className="flex-row"
                            />
                            <Tab
                              value="2"
                              label="Convert Signature"
                              icon={<DrawIcon />}
                              className="flex-row"
                            />
                          </Tabs>
                        </Box>
                      </div>
                      <div className="card-body">
                        <div className=" text-center">
                          <button onClick={resetSignature} title="Erase" >
                            <AutoFixOffIcon />
                          </button>
                        </div>
                      </div>
                      <div
                        className={
                          "card-body" + (value === "1" ? " d-block" : " d-none")
                        }
                      >
                        <div className=" text-end">
                          <button
                            onClick={submitForm_123}
                            className="btn btn-primary"
                            name="btn"
                          >
                            Sign
                          </button>
                        </div>
                      </div>
                      <div
                        className={
                          "card-body" + (value === "2" ? " d-block" : " d-none")
                        }
                      >
                        <div className=" text-end">
                          <button
                            onClick={submitForm}
                            className="btn btn-primary"
                            name="btn"
                          >
                            Sign
                          </button>
                        </div>
                      </div>
                    </div>
                  </Box>
                </Modal>
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
