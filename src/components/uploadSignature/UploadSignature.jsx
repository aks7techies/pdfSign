import React from "react";
import {Document, Page, pdfjs} from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const UploadSignature = () => {
  const [numPages, setNumPages] = React.useState(null);

  function onDocumentLoadSuccess({numPages}) {
    setNumPages(numPages);
  }
 
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
      <div className="container-fluid ">
        <nav class="navbar bg-body-tertiary px-5 mb-4">
          <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">Navbar</span>
          </div>
        </nav>
        <section className="">
          <div class="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12 mb-4">
                  <div class="card" style={{width: "100%"}}>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">An item</li>
                      <li class="list-group-item">A second item</li>
                      <li class="list-group-item">A third item</li>
                    </ul>
                    <div class="card-footer">Card footer</div>
                  </div>
                </div>
                <div className="col-md-8 col-lg-8 col-sm-12 col-xs-12 mb-4">
                  <div class="card">
                    <div class="card-body overflow-auto " style={{ backgroundColor:"lightgray", maxHeight:"85vh",display: 'flex', justifyContent: 'center' }}>
                      <Document
                        file="assets/uploads/file2.pdf"
                        onLoadSuccess={onDocumentLoadSuccess}
                      >
                        {Array.from(new Array(numPages), (el, index) => (
                             <div key={`page_${index + 1}`} style={{ pageBreakAfter: 'always',marginBottom:"10px" }}>
                          <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            renderTextLayer={false} // Disable text layer rendering
                            renderAnnotationLayer={false} // Disable annotation layer rendering
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
