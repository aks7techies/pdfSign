import React,{useEffect} from 'react';
import { PDFDocument } from 'pdf-lib';
import {Document, Page} from "react-pdf";

function Selectorpdf() {
  const [pdfBytes, setPdfBytes] = React.useState(null);
  useEffect(() => {
    createForm();
  }, []);

  const createForm = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([550, 750]);
    const form = pdfDoc.getForm();

    page.drawText('Enter your favorite superhero:', { x: 50, y: 700, size: 20 });

    const superheroField = form.createTextField('favorite.superhero');
    superheroField.setText('One Punch Man');
    superheroField.addToPage(page, { x: 55, y: 640 });

    // Similar setup for other form fields...

    const pdfBytes = await pdfDoc.save();
    setPdfBytes(pdfBytes);
    // Handle pdfBytes, for example, you can save it to state or local storage
  };
  return (
    <div>
      {pdfBytes ? (
        <Document file={'assets/uploads/file2.pdf'}>
          <Page pageNumber={1} />
        </Document>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  )
}

export default Selectorpdf