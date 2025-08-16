import React, {useEffect} from "react";
import Header from "../../layouts/header/Header";
import Footer from "../../layouts/footer/Footer";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {useNavigate} from "react-router-dom";
import ButtonAction from "../buttonaction/ButtonAction";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import HistoryIcon from "@mui/icons-material/History";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import Modal from "@mui/material/Modal";
import {Formik, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {ToastContainer, toast} from "react-toastify";
import "./allpages.css";
import "react-toastify/dist/ReactToastify.css";
import UserHeaderTop from "../userheadertop/UserHeaderTop";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {useSelector, useDispatch } from 'react-redux';
import {saveData} from '../../redux/slices/historyDraftData';
import Loader from "../pages/loader/Loader";

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

const DraftUpload = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [gettoken, setGettoken] = React.useState(null);
  const [draftDetails, setDraftDetails] = React.useState([]);
  const [loader, setLoader] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const clientIdBase64Decode = useSelector((state)=>state.client.value);
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
        "Unsupported file format, Only supported pdf file",
        (value) => value && ["application/pdf"].includes(value.type)
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
          `http://localhost:8000/api/users?clientId=${clientIdBase64Decode}&token=${gettoken}`
        );
        const obj = JSON.parse(JSON.stringify(response));

        if (obj.status === 200) {
          setDraftDetails(obj.data.data);
        } else {
          // console.log(obj.data.msg);
          toast.danger(obj.data.msg, {
            position: "top-right",
          });
        }
      } catch (error) {
        const err = JSON.parse(JSON.stringify(error));
        console.log(err.message);
      }
    }
  };

  const submitForm = async (values) => {
    // console.log(values.uploadDocument);

    const formData = new FormData();
    const currentDateTime = new Date().toLocaleString();
    // Assuming values.uploadDocument is the file object
    formData.append("clientId", clientIdBase64Decode);
    formData.append("draftDocumentName", values.documentname);
    formData.append("originalFileName", values.uploadDocument);
    formData.append("dateTimeOriginal", currentDateTime);
    formData.append("token", gettoken);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users",
        formData,
        config
      );

      if (response.status === 201) {
        

        const postHistory = await axios.post(
          "http://localhost:8000/api/history",{
             clientId: response.data.data.clientId,
            draftId:response.data.insertedId,
            token:gettoken,
            Activity:"Create Draft Document",
            discription:"The Create Draft Document functionality enables users to upload and save draft documents into the system for further processing or review. This feature is particularly useful in scenarios where users need to prepare documents before finalizing and distributing them "
          }
        );
        setOpen(false);
        toast.success(response.data.msg, {
          position: "top-right",
        });
        fetchData();
      } else {
        toast.error(response.data.msg, {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
      // sessionStorage.removeItem("KeyId");
      console.error("Error submitting form:", error);
    }
  };

  const confirmFunction = async (value) => {};
  const sendFunction = async (value) => {
    // console.log(value);
    const formData = {
      id: value.id,
      // clientId: value.clientId,
      stage:1,
      token: gettoken,
    };

    try {
      const response = await axios.patch(
        "http://localhost:8000/api/unComplete/updateUncomplete",
        formData
      );

      if (response.status === 200) {
        setOpen(false);
        toast.success(response.data.msg, {
          position: "top-right",
        });
        fetchData();
      } else {
        toast.error(response.data.msg, {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
      console.error("Error submitting form:", error);
    }
  };
  const Historyfunctio = (value) => {

    dispatch(saveData(value));
    redirect("/clientMaster/historyActivity");
  };
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = draftDetails.slice(indexOfFirstItem, indexOfLastItem);
  

  return (
    <>
      {loader ? (
       <Loader />
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
            <ButtonAction  />
            <UserHeaderTop />
            <div className="row">
              <div className="col-md-11 col-sm-12 col-xl-11">
                <div className="card w-100 border-0">
                  <div className="card-header">
                    <div className="row">
                      <div className="d-flex justify-content-between">
                        <h3>Draft List</h3>
                        <Button
                          className="text-capitalize"
                          onClick={handleOpen}
                        >
                          {" "}
                          <CloudUploadIcon /> Add Draft
                        </Button>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <div className="row">
                              <div className="col-md-6 col-sm-12">
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
                                        <h3>Add Draft</h3>
                                      </Typography>
                                      <hr />
                                      <Typography
                                        id="modal-modal-description"
                                        sx={{mt: 2}}
                                      >
                                        <div className="row">
                                          <div className="col-md-12 mb-3">
                                            <label
                                              htmlFor="documentname"
                                              className="form-label mb-0"
                                            >
                                              Document Name{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <Field
                                              type="text"
                                              value={values.documentname}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              className={
                                                "form-control" +
                                                (errors.documentname &&
                                                touched.documentname
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
                                          <div className="col-md-12 mb-3">
                                            <label
                                              htmlFor="chooseDocument"
                                              className="form-label mb-0"
                                            >
                                              Choose Document{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
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
                                              id="chooseDocument"
                                              accept="application/pdf"
                                            />
                                            <ErrorMessage
                                              name="uploadDocument"
                                              component="span"
                                              className="error text-danger"
                                            />
                                          </div>

                                          <div className="col-md-12 mb-3">
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
                                              Submit
                                            </button>
                                            <a
                                              href="#"
                                              className="ms-2 text-dark text-decoration-none "
                                              onClick={handleClose}
                                            >
                                              {" "}
                                              Close
                                            </a>
                                          </div>
                                        </div>
                                      </Typography>
                                    </form>
                                  )}
                                </Formik>
                              </div>
                              <div className="col-md-6 col-sm-12">
                                <h5 className="card-title">
                                  Download Template
                                </h5>
                                <div className="card h-100 overflow-x">
                                  <div className="card-body d-flex flex-wrap justify-content-center align-items-center">
                                    <a
                                      href="#"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Tooltip on top"
                                    >
                                      <div
                                        className="d-flex hover-overlay justify-content-center align-items-center m-2"
                                        style={{
                                          width: "60px",
                                          height: "60px",
                                          backgroundColor: "lightgrey",
                                        }}
                                      >
                                        <DownloadForOfflineIcon />
                                      </div>
                                    </a>

                                    <a
                                      href="#"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Tooltip on top"
                                    >
                                      <div
                                        className="d-flex hover-overlay justify-content-center align-items-center m-2"
                                        style={{
                                          width: "60px",
                                          height: "60px",
                                          backgroundColor: "lightgrey",
                                        }}
                                      >
                                        <DownloadForOfflineIcon />
                                      </div>
                                    </a>

                                    <a
                                      href="#"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Tooltip on top"
                                    >
                                      <div
                                        className="d-flex hover-overlay justify-content-center align-items-center m-2"
                                        style={{
                                          width: "60px",
                                          height: "60px",
                                          backgroundColor: "lightgrey",
                                        }}
                                      >
                                        <DownloadForOfflineIcon />
                                      </div>
                                    </a>

                                    <a
                                      href="#"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Tooltip on top"
                                    >
                                      <div
                                        className="d-flex hover-overlay justify-content-center align-items-center m-2"
                                        style={{
                                          width: "60px",
                                          height: "60px",
                                          backgroundColor: "lightgrey",
                                        }}
                                      >
                                        <DownloadForOfflineIcon />
                                      </div>
                                    </a>

                                    <a
                                      href="#"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Tooltip on top"
                                    >
                                      <div
                                        className="d-flex hover-overlay justify-content-center align-items-center m-2"
                                        style={{
                                          width: "60px",
                                          height: "60px",
                                          backgroundColor: "lightgrey",
                                        }}
                                      >
                                        <DownloadForOfflineIcon />
                                      </div>
                                    </a>

                                    <a
                                      href="#"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Tooltip on top"
                                    >
                                      <div
                                        className="d-flex hover-overlay justify-content-center align-items-center m-2"
                                        style={{
                                          width: "60px",
                                          height: "60px",
                                          backgroundColor: "lightgrey",
                                        }}
                                      >
                                        <DownloadForOfflineIcon />
                                      </div>
                                    </a>

                                    <a
                                      href="#"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Tooltip on top"
                                    >
                                      <div
                                        className="d-flex hover-overlay justify-content-center align-items-center m-2"
                                        style={{
                                          width: "60px",
                                          height: "60px",
                                          backgroundColor: "lightgrey",
                                        }}
                                      >
                                        <DownloadForOfflineIcon />
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
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
                            <th scope="col">Document Name</th>
                            <th scope="col">Orginal Document</th>
                            <th scope="col">Date Time</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {draftDetails &&
                            currentItems.map((item, index) => (
                              <tr key={item._id}>
                                <td>
                                  {index + 1 + (currentPage - 1) * itemsPerPage}
                                </td>
                                <td>{item.draftDocumentName}</td>
                                <td>
                                  <a href={""}>
                                    <DownloadForOfflineIcon color="success" />
                                  </a>
                                </td>
                                <td>
                                  {new Date(
                                    item.dateTimeOriginal
                                  ).toLocaleDateString()}
                                  <br />
                                  {new Date(
                                    item.dateTimeOriginal
                                  ).toLocaleTimeString()}
                                </td>
                                <td>
                                  <Button
                                    className="text-capitalize"
                                    onClick={() =>
                                      confirmFunction({
                                        id: item._id,
                                        clientId: clientIdBase64Decode,
                                      })
                                    }
                                    title="Delete Client"
                                  >
                                    <DeleteIcon className="text-danger" />
                                  </Button>
                                  <Button
                                    className="text-capitalize"
                                    onClick={() =>
                                      sendFunction({
                                        id: item._id,
                                        clientId: clientIdBase64Decode,
                                      })
                                    }
                                    title="Send Client"
                                  >
                                    <SendIcon className="text-success" />
                                  </Button>
                                  <Button
                                    className="text-capitalize"
                                    onClick={() =>
                                      Historyfunctio({
                                        id: item._id,
                                        clientId: clientIdBase64Decode,
                                      })
                                    }
                                    title="Document History"
                                  >
                                    <HistoryIcon className="text-warning" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                            {currentItems && currentItems.length === 0 &&(
                              <tr className="text-center">
                                <td colSpan={5}>No Record Found</td>
                              </tr>
                            )}
                        </tbody>
                        {draftDetails && draftDetails.length > 0 && (
                          <Stack spacing={1} justifyContent="center">
                            <Pagination
                              count={Math.ceil(
                                draftDetails.length / itemsPerPage
                              )}
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
              </div>
            </div>
          </section>

          <Footer />
        </div>
      )}
    </>
  );
};

export default DraftUpload;
