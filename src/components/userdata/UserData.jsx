import React from "react";
import Header from "../../layouts/header/Header";
import Footer from "../../layouts/footer/Footer";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AddIcon from "@mui/icons-material/Add";
import  {useNavigate}  from 'react-router-dom';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from "@mui/material/Modal";
import {Formik, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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

function UserData() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const history = useNavigate();
 

  const initialValues = {
    name: "",
    email: "",
    documentname: "",
    uploadDocument: "",
  };

  const signInSchema = Yup.object().shape({
    name: Yup.string().required("Name is required*"),
    email: Yup.string().email().required("Email is required*"),
    documentname: Yup.string().required("Document name is required*"),

    uploadDocument: Yup.mixed().required("Upload Document is required*"),
    // .test(
    //   "fileSize",
    //   "File is too large. Maximum size is 10 MB.",
    //    value => value && value.size <= 10485760 // 10 MB
    // )
    // .test(
    //   "fileFormat",
    //   "Unsupported file format",
    //    value => value && ['application/pdf'].includes(value.type)
    // ),
  });

  


  

  const submitForm = (e ,values) => {
    console.log(values);
    e.stopPropagation();
   
    setOpen(false);
    toast.success("Success Submitted !", {
      position: "top-right"
    });
    history("/complete");
   
    // Add your form submission logic here
  };

  const confirmFunction = ()=>{

  }

  return (
    <>
    
      <Header />
         <ToastContainer />
      <section className="container-fluid px-4 pt-3">
        <a role="button" className="btn btn-dark" href="/dashboard">
          <ArrowBackIosNewIcon /> Back
        </a>
      </section>
      <section className="container-fluid p-4">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="d-flex justify-content-between">
                <h3>Sign Documents List</h3>
                <Button className="text-capitalize" onClick={handleOpen}>
                  {" "}
                  <AddIcon /> Upload Document
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
                      }) => (
                        <form onSubmit={handleSubmit}>
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                          >
                            <h3>Add Document Upload</h3>
                          </Typography>
                          <hr />
                          <Typography id="modal-modal-description" sx={{mt: 2}}>
                            <div className="row">
                              <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 mb-3">
                                <label
                                  htmlFor="name"
                                  className="form-label mb-0"
                                >
                                  Name<span className="text-danger">*</span>
                                </label>
                                <Field
                                  type="text"
                                  value={values.name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    "form-control" +
                                    (errors.name && touched.name
                                      ? " input-error"
                                      : "")
                                  }
                                  name="name"
                                  id="name"
                                />
                                <ErrorMessage
                                  name="name"
                                  component="span"
                                  className="error text-danger"
                                />
                              </div>
                              <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 mb-3">
                                <label
                                  htmlFor="email"
                                  className="form-label mb-0"
                                >
                                  Email<span className="text-danger">*</span>
                                </label>
                                <Field
                                  type="email"
                                  value={values.email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    "form-control" +
                                    (errors.email && touched.email
                                      ? " input-error"
                                      : "")
                                  }
                                  name="email"
                                  id="email"
                                />
                                <ErrorMessage
                                  name="email"
                                  component="span"
                                  className="error text-danger"
                                />
                              </div>
                              <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 mb-3">
                                <label
                                  htmlFor="documentname"
                                  className="form-label mb-0"
                                >
                                  Document Name{" "}
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
                                  Upload Document
                                  <span className="text-danger">*</span>
                                </label>
                                <Field
                                  type="file"
                                  value={values.uploadDocument}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  accept=".pdf"
                                  className={
                                    "form-control" +
                                    (errors.uploadDocument &&
                                    touched.uploadDocument
                                      ? " input-error"
                                      : "")
                                  }
                                  name="uploadDocument"
                                  id="uploadDocument"
                                />
                                <ErrorMessage
                                  name="uploadDocument"
                                  component="span"
                                  className="error text-danger"
                                />
                              </div>
                              <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 mb-3">
                                <button
                                  className={
                                    "btn btn-primary" +
                                    (dirty && isValid ? "" : " disabled-btn")
                                  }
                                  onClick={submitForm}
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
            <div className="overflow-auto ">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>

                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Date Time</th>
                    <th scope="col">Document Name</th>
                    <th scope="col">Orginal Document</th>
                    <th scope="col">Sign Document</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>{new Date().toDateString()}</td>
                    <td>@mdo</td>
                    <td><a href="#"> Evidence </a></td>
                    <td><a href="#"> View </a></td>
                    <td>
                    <Button className="text-capitalize" onClick={confirmFunction}>
                     <DeleteIcon className="text-danger" /> 
                   </Button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>{new Date().toDateString()}</td>
                    <td>@mdo</td>
                    <td><a href="#"> Evidence </a></td>
                    <td><a href="#"> View </a></td>
                    <td>
                    <Button className="text-capitalize" onClick={confirmFunction}>
                     <DeleteIcon className="text-danger" /> 
                   </Button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>{new Date().toDateString()}</td>
                    <td>@mdo</td>
                    <td><a href="#"> Evidence </a></td>
                    <td><a href="#"> View </a></td>
                    <td>
                    <Button className="text-capitalize" onClick={confirmFunction}>
                     <DeleteIcon  className="text-danger" /> 
                   </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default UserData;
