import React,{useEffect} from 'react';
import Header from "../../layouts/header/Header";
import Footer from "../../layouts/footer/Footer";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import   {useNavigate}  from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

import axios from "axios";
import Modal from "@mui/material/Modal";
import {Formik, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {ToastContainer, toast} from "react-toastify";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import './templateStyle.css';
import "react-toastify/dist/ReactToastify.css";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
const TemplateMaster = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [gettoken, setGettoken] = React.useState(null);
  const [templateDetails, setTemplatesDetails] = React.useState([]);
  const [loader, setLoader] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const redirect = useNavigate();
 
  useEffect(() => {
    fetchData();
  }, [redirect, gettoken]);
  const initialValues = {
    documentname: "",
    uploadDocument: "",
  };

  const signInSchema = Yup.object().shape({
    documentname: Yup.string().required("Document name is required*"),

    uploadDocument: Yup.mixed()
      .nullable()
      .required("Upload Document is required*")
      .test(
        "fileFormat",
        "Unsupported file format, Only supported word file",
        (value) => value && ["application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(value.type)
      )
      .test(
        "fileSize",
        "File is too large. Maximum size is 10 MB.",
        (value) => {
          if (!value) return true; // no file selected, so valid
          return value.size <= 10485760; // 10 MB
        }
      ),
  });
  const fetchData = async () => {
    const retrievedValue = sessionStorage.getItem("KeyId");
    if (!retrievedValue) {
      redirect("/"); // Redirect to home page if session is not set
      // Show loading indicator
      return;
    }
    setGettoken(retrievedValue);
    setTimeout(() => {
      setLoader(false); // Hide loader after data is loaded
    }, 100);

    if (gettoken !== null) {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/template?token=${gettoken}`
        );

        const obj = JSON.parse(JSON.stringify(response));

        if (obj.status === 200) {
          setTemplatesDetails(obj.data.data);
        } else {
          toast.danger(obj.msg, {
            position: "top-right",
          });
        }
      } catch (error) {
        // toast.danger( error.ErrorMessage, {
        //   position: "top-right",
        // });
        console.error(error);
      }
    }
  };
  const submitForm = async(values) => {
    // console.log(values);
    const formData = new FormData();
    formData.append('documentName', values.documentname);
    formData.append('document', values.uploadDocument);
    formData.append('token', gettoken);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    

    try {
      const response = await axios.post("http://localhost:8000/api/template", formData, config);

      const objJson = JSON.parse(JSON.stringify(response));

      if (objJson.status === 201) {
        setOpen(false);
        toast.success(objJson.data.msg, {
          position: "top-right",
        });
        fetchData();
      } else {
        toast.danger(objJson.msg, {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.danger(error.ErrorMessage, {
        position: "top-right",
      });
      redirect("/");
      console.error("Error submitting form:", error);
    }

  };

  const confirmFunction = () => {};

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = templateDetails.slice(indexOfFirstItem, indexOfLastItem);
  // const sendFunction = () =>{};

    return (
    <>
     {loader ? (
        <div className="loader-container d-flex justify-content-center align-items-center">
          <img
            src="../../../assets/images/loader.gif"
            alt="Loading..."
            className="loader-image"
          />
        </div>
      ) : (
    <div>
     <Header />
      <ToastContainer />
       
      <section className="container-fluid px-4 pt-3">
        <a role="button" className="btn btn-dark" href="/dashboard">
          <ArrowBackIosNewIcon /> Back
        </a>
      </section>
      <section className="shifted container-fluid p-4 col-md-10 col-sm-12">
        <div className="card w-100 border-0">
          <div className="card-header">
            <div className="row">
              <div className="d-flex justify-content-between">
                <h3>Template Details</h3>
                <Button className="text-capitalize" onClick={handleOpen}>
                  {" "}
                  <PersonAddIcon /> Add Template
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={signInSchema}
                      onSubmit={submitForm}
                    >
                      {({
                        values,
                        handleChange,
                        handleSubmit,
                        errors,
                        touched,
                        handleBlur,
                        isValid,
                        dirty,
                        setFieldValue,
                       
                      }) => (
                        <form onSubmit={handleSubmit}>
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                          >
                            <h3>Add Template</h3>
                          </Typography>
                          <hr />
                          <Typography id="modal-modal-description" sx={{mt: 2}}>
                            <div className="row">
                            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 mb-3">
                                <label
                                  htmlFor="documentname"
                                  className="form-label mb-0"
                                >
                                  Template Name{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <Field
                                  type="text"
                                  value={values.documentname}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    "form-control" +
                                    (errors.documentname && touched.documentname
                                      ? " input-error"
                                      : "")
                                  }
                                  name="documentname"
                                  id="documentname"
                                />
                                <ErrorMessage
                                  name="documentname"
                                  component="span"
                                  className="error text-danger"
                                />
                              </div>
                              <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 mb-3">
                                <label
                                  htmlFor="uploadDocument"
                                  className="form-label mb-0"
                                >
                                  Upload Template Document
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="file"
                                  onChange={(event) => {
                                    setFieldValue(
                                      "uploadDocument",
                                      event.target.files[0]
                                    );
                                  }}
                                  onBlur={handleBlur}
                                  className={
                                    "form-control" +
                                    (errors.uploadDocument &&
                                    touched.uploadDocument
                                      ? " input-error"
                                      : "")
                                  }
                                  name="uploadDocument"
                                  id="uploadDocument"
                                  accept="application/msword"
                                />
                                <ErrorMessage
                                  name="uploadDocument"
                                  component="span"
                                  className="error text-danger"
                                />
                              </div>
                           
                              <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 mb-3">
                                <button
                                  type="submit"
                                  className={
                                    "btn btn-primary" +
                                    (dirty && isValid ? "" : " disabled-btn")
                                  }
                                  disabled={!(dirty && isValid)}
                                >
                                  {" "}
                                  Submit
                                </button>
                              </div>
                            </div>
                          </Typography>
                        </form>
                      )}
                    </Formik>
                  </Box>
                </Modal>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="overflow-auto mostly-customized-scrollbar">
              <table className="table table-hover">
                <thead>
                  <tr >
                    <th scope="col">#</th>

                    <th scope="col"> Templates Name</th>
                    <th scope="col">Templates Evidence </th>
                    <th scope="col">Date Time</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>

                {templateDetails &&
                        currentItems.map((item, index) => (
                 <tr key={item._id}>
                 <td scope="row">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td>{item.documentName}</td>
                    <td>
                      <a href="#">
                         <DownloadForOfflineIcon color="success" />
                      </a>
                    </td>
                    <td>
                      {new Date(item.createdAt).toLocaleDateString()}
                      <br />
                      {new Date(item.createdAt).toLocaleTimeString()}
                    </td>
                    <td>
                      <Button
                        className="text-capitalize"
                        onClick={confirmFunction}
                        title="Delete Client"
                      >
                        <DeleteIcon className="text-danger" />
                      </Button>
                     
                    </td>
                  </tr>
                 ))}

                 
                </tbody>
                {templateDetails && templateDetails.length > 0 && (
                    <Stack spacing={1} justifyContent="center">
                      <Pagination
                        count={Math.ceil(templateDetails.length / itemsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                      />
                    </Stack>
                  )}
              </table>
            </div>
          </div>
        </div>
      </section>
      <Footer />

    </div>
      )}
    </>
    );
}

export default TemplateMaster;