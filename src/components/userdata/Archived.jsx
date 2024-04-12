import React, {useEffect} from "react";
import Header from "../../layouts/header/Header";
import Footer from "../../layouts/footer/Footer";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import ButtonAction from "../buttonaction/ButtonAction";
import UserHeaderTop from "../userheadertop/UserHeaderTop";
import {useSelector, useDispatch} from "react-redux";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./allpages.css";
const Archived = () => {
  const [gettoken, setGettoken] = React.useState(null);
  const redirect = useNavigate();
  const [archiveDetails, setArchiveDetails] = React.useState([]);
  const [loader, setLoader] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const clientIdBase64Decode = useSelector((state) => state.client.value);
  // console.log(clientIdBase64Decode);
  useEffect(() => {
    fetchData();
  }, [redirect, gettoken]);
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
          `http://localhost:8000/api/unComplete/getAllprocess?clientId=${clientIdBase64Decode}&token=${gettoken}`
        );
        const obj = JSON.parse(JSON.stringify(response));

        if (obj.status === 200) {
          setArchiveDetails(obj.data.data);
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
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = archiveDetails.slice(indexOfFirstItem, indexOfLastItem);
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
      <ToastContainer />
      <Header />
      <section className="container-fluid px-4 pt-3">
        <a role="button" className="btn btn-dark" href="/dashboard">
          <ArrowBackIosNewIcon /> Back
        </a>
      </section>
      <section className="shifted container-fluid p-4 col-md-10 col-sm-12">
        <ButtonAction />
        <UserHeaderTop />
        <div className="row">
          <div className="col-md-11 col-sm-12 col-xl-11">
            <div className="card w-100 border-0">
              <div className="card-header">
                <div className="row">
                  <div className="d-flex justify-content-between">
                    <h3>Archived List</h3>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="overflow-auto ">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Document Name</th>
                        <th scope="col">Date Time</th>
                        <th scope="col">Documents</th>
                      </tr>
                    </thead>
                    <tbody>
                    {archiveDetails &&
                            currentItems.map((item, index) => (
                              <tr key={item._id}>
                                <td>
                                  {index + 1 + (currentPage - 1) * itemsPerPage}
                                </td>
                        <td>{""}</td>
                        <td>
                          {new Date().toLocaleDateString()} <br />
                          {new Date().toLocaleTimeString()}{" "}
                        </td>

                        <td>
                          <a href="/">
                            {" "}
                            <DownloadForOfflineIcon color="success" />{" "}
                          </a>
                        </td>
                        </tr>))}
                      {currentItems && currentItems == 0 &&(
                              <tr>
                                <td>No Record Found</td>
                              </tr>
                      )}
                    </tbody>
                    {archiveDetails && archiveDetails.length > 0 && (
                          <Stack spacing={1} justifyContent="center">
                            <Pagination
                              count={Math.ceil(
                                archiveDetails.length / itemsPerPage
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
      </div>)}
    </>
  );
};

export default Archived;
