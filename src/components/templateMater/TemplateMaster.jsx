import React from 'react';
import Header from "../../layouts/header/Header";
import Footer from "../../layouts/footer/Footer";
import {ToastContainer, toast} from "react-toastify";
const TemplateMaster = () => {
    return (<div>
     <Header />
      <ToastContainer />
       

      <Footer />

    </div>);
}

export default TemplateMaster;