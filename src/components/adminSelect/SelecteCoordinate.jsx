import React, { useEffect, useRef } from 'react';
import { Designer } from '@pdfme/ui';
import { Template } from '@pdfme/common';

const SelecteCoordinate = () => {
  const domContainerRef = React.useRef(null);

  useEffect(() => {
  //   const response =  fetch('assets/uploads/file2.pdf');
  //   const template = {
  //     schemas: [], // Define your schema array here
  // basePdf: '', // Provide the base PDF file or URL
  // fileName: '',
  //   };

    // if (domContainerRef.current) {
      

    //   const designer = new Designer({
    //     domContainer: domContainerRef.current,
    //     template,
    //   });

      // return () => {
       
      //   designer.destroy();
      // };
    // }
  }, []);

  return (
    <div>
      <div id="container" ref={domContainerRef}></div>
    </div>
  );
};

export default SelecteCoordinate;
