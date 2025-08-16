import React, { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";
import Footer from "../../layouts/footer/Footer";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import ButtonAction from "../buttonaction/ButtonAction";
import UserHeaderTop from "../userheadertop/UserHeaderTop";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./allpages.css";
import Loader from "../pages/loader/Loader";

const Archived = () => {
  const [gettoken, setGettoken] = useState(null);
  const redirect = useNavigate();
  const [archiveDetails, setArchiveDetails] = useState([]);
  const [loader, setLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const clientIdBase64Decode = useSelector((state) => state.client.value);

  useEffect(() => {
    fetchData();
  }, [clientIdBase64Decode]); // run only when client ID changes

  const fetchData = async () => {
    const retrievedValue = sessionStorage.getItem("KeyId");

    if (!retrievedValue) {
      redirect("/"); // redirect to home if no session key
      return;
    }
    setLoader(true); // show loader at start

    const startTime = Date.now(); // for minimum display time

    try {
      const response = await axios.get(
        `http://localhost:8000/api/unComplete/getAllprocess?clientId=${clientIdBase64Decode}&token=${retrievedValue}`
      );

      if (response.status === 200) {
        setArchiveDetails(response.data.data || []);
      } else {
        toast.error(response.data.msg || "Error fetching data", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("API Error:", error.message);
      toast.error("Failed to load archived list", { position: "top-right" });
    } finally {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, 1000 - elapsed); // ensure 1s loader
      setTimeout(() => setLoader(false), remainingTime);
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
        <Loader />
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
                    <div className="overflow-auto">
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
                          {currentItems.length > 0 ? (
                            currentItems.map((item, index) => (
                              <tr key={item._id}>
                                <td>
                                  {index + 1 + (currentPage - 1) * itemsPerPage}
                                </td>
                                <td>{item.documentName || ""}</td>
                                <td>
                                  {new Date().toLocaleDateString()} <br />
                                  {new Date().toLocaleTimeString()}
                                </td>
                                <td>
                                  <a href="/">
                                    <DownloadForOfflineIcon color="success" />
                                  </a>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="4" className="text-center">
                                No Record Found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>

                      {archiveDetails.length > 0 && (
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

export default Archived;
