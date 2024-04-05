import React from "react";
import Header from "../../layouts/header/Header";
import Footer from "../../layouts/footer/Footer";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import   {useNavigate}  from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from '@mui/icons-material/Send';
import Modal from "@mui/material/Modal";
import {Formik, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {ToastContainer, toast} from "react-toastify";

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
const ClientMaster = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const redirect = useNavigate();
   
  
    const initialValues = {
      name: "",
      email: "",
      
    };
  
    const signInSchema = Yup.object().shape({
      name: Yup.string().required("Name is required*"),
      email: Yup.string().email().required("Email is required*"),
    });
  
    const submitForm = (values) => {
      console.log(values);
      // e.stopPropagation();
  
      setOpen(false);
      toast.success("Success Submitted !", {
        position: "top-right",
      });
      redirect("draft");
  
      // Add your form submission logic here
    };
  
    
    const sendFunction = () =>{
      redirect("/clientMaster/draft");
    };

  return (
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
                <h3>Clients Details</h3>
                <Button className="text-capitalize" onClick={handleOpen}>
                  {" "}
                  <PersonAddIcon /> Add Client
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
                            <h3>Add Client</h3>
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
            <div className="overflow-auto ">
              <table className="table table-hover">
                <thead>
                  <tr >
                    <th scope="col">#</th>

                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Date Time</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto1@gmail.com</td>
                    <td>{new Date().toLocaleDateString()}
                    <br />
                    {new Date().toLocaleTimeString()}
                    </td>
                    <td>
                     
                      <Button
                        className="text-capitalize"
                        onClick={sendFunction}
                        title="Send Client"
                      >
                        <SendIcon className="text-success"  />
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
    </div>
  );
};

export default ClientMaster;
