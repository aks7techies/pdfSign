import React, {useEffect} from "react";
import Header from "../../layouts/header/Header";
import Footer from "../../layouts/footer/Footer";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import axios from "axios";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import Modal from "@mui/material/Modal";
import {Formik, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import "./clientstyle.css";
import {ToastContainer, toast} from "react-toastify";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch } from 'react-redux';
import {saveData} from '../../redux/slices/clientData';

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
  const [gettoken, setGettoken] = React.useState(null);
  const [clientDetails, setClientsDetails] = React.useState([]);
  const [loader, setLoader] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const dispatch = useDispatch();

  const redirect = useNavigate();
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
          `http://localhost:8000/api/client?token=${gettoken}&insertedUser=${sessionStorage.getItem("userId")}`
        );

        const obj = JSON.parse(JSON.stringify(response));

        if (obj.status === 200) {
          setClientsDetails(obj.data.data);
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
  useEffect(() => {
    fetchData();
  }, [redirect, gettoken]);

  const initialValues = {
    name: "",
    email: "",
    mobileNo:"",
  };

  const signInSchema = Yup.object().shape({
    name: Yup.string().required("Name is required*"),
    email: Yup.string().email().required("Email is required*"),
    mobileNo: Yup.string()
    .matches(/^[6-9][0-9]{9}$/, 'Mobile number must start with a digit between 6 and 9 and be 10 digits in total')
    .required('Mobile number is required'),
  });

  const submitForm = async (values) => {
    try {
      const response = await axios.post("http://localhost:8000/api/client", {
        name: values.name,
        email: values.email,
        mobileNo: values.mobileNo,
        insertedUser: sessionStorage.getItem("userId"),
        token: gettoken,
      });

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
  const sendFunction = (value) => {
    dispatch(saveData(value));
  //  const base64Encoded = btoa(value);
    redirect(`/clientMaster/draft`);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = clientDetails.slice(indexOfFirstItem, indexOfLastItem);
  // console.log(currentItems);
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
                    <h3>Clients Details</h3>
                    <Button className="text-capitalize" onClick={handleOpen}>
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
                              <Typography
                                id="modal-modal-description"
                                sx={{mt: 2}}
                              >
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
                                      Email
                                      <span className="text-danger">*</span>
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
                                      htmlFor="mobileNo"
                                      className="form-label mb-0"
                                    >
                                      Mobile No.
                                      <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                      type="number"
                                      value={values.mobileNo}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      className={
                                        "form-control" +
                                        (errors.mobileNo && touched.mobileNo
                                          ? " input-error"
                                          : "")
                                      }
                                      name="mobileNo"
                                      id="mobileNo"
                                    />
                                    <ErrorMessage
                                      name="mobileNo"
                                      component="span"
                                      className="error text-danger"
                                    />
                                  </div>

                                  <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 mb-3">
                                    <button
                                      type="submit"
                                      className={
                                        "btn btn-primary" +
                                        (dirty && isValid
                                          ? ""
                                          : " disabled-btn")
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
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Mobile No.</th>
                        <th scope="col">Date Time</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientDetails &&
                        currentItems.map((item, index) => (
                          <tr key={item._id}>
                            <td scope="row">
                              {index + 1 + (currentPage - 1) * itemsPerPage}
                            </td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.mobileNo}</td>
                            <td>
                              {new Date(item.createdAt).toLocaleDateString()}
                              <br />
                              {new Date(item.createdAt).toLocaleTimeString()}
                            </td>
                            <td>
                              <Button
                                className="text-capitalize"
                                onClick={() => sendFunction(item._id)}
                                title="Send Client"
                              >
                                <SendIcon className="text-success" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>

                  {clientDetails && clientDetails.length > 0 && (
                    <Stack spacing={1} justifyContent="center">
                      <Pagination
                        count={Math.ceil(clientDetails.length / itemsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                      />
                    </Stack>
                  )}
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      )}
    </>
  );
};

export default ClientMaster;
