import React,{useEffect} from "react";
import Header from "../../layouts/header/Header";
import Footer from "../../layouts/footer/Footer";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import UserHeaderTop from "../userheadertop/UserHeaderTop";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import ButtonAction from "../buttonaction/ButtonAction";
import {useSelector} from 'react-redux';
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import './historyStyle.css';
const HistoryActivity = () => {
  const [gettoken, setGettoken] = React.useState(null);
  const [historyDetails, setHistoryDetails] = React.useState([]);
  const [loader, setLoader] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const redirect = useNavigate();
  const draftData = useSelector((state)=> state.history.value);
console.log(draftData);
  useEffect(() => {
    fetchData();
  }, [redirect,gettoken]);
  const fetchData = async () => {
    const retrievedValue = sessionStorage.getItem("KeyId");
    if (!retrievedValue) {
      redirect("/"); // Redirect to home page if session is not set
      return;
    }
    setGettoken(retrievedValue);
    setTimeout(() => {
      setLoader(false); // Hide loader after data is loaded
    }, 100);
    if (gettoken !== null) {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/history?draftId=${draftData.id}&clientId=${draftData.clientId}&token=${retrievedValue}`
      );
      const obj = JSON.parse(JSON.stringify(response));

        if (obj.status === 200) {
          setHistoryDetails(obj.data.data);
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
console.log(gettoken);
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = historyDetails.slice(indexOfFirstItem, indexOfLastItem);
  //  console.log(draftData);

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
                    <h3>History Details</h3>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="overflow-auto mostly-customized-scrollbar">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col"> Activity </th>
                        <th scope="col">Desciption </th>
                        <th scope="col">Date Time</th>
                      </tr>
                    </thead>
                    <tbody>
                    {historyDetails &&
                            currentItems.map((item, index) => (
                              <tr key={item._id}>
                                <td>
                                  {index + 1 + (currentPage - 1) * itemsPerPage}
                                </td>
                        <td>{item.Activity}</td>
                        <td>{item.discription}</td>
                        <td>
                          {new Date(item.createdAt).toLocaleDateString()}
                          <br />
                          {new Date(item.createdAt).toLocaleTimeString()}
                        </td>
                      </tr>))}
                      {currentItems && currentItems == 0 &&(
                              <tr>
                                <td>No Record Found</td>
                         </tr>
                      )}
                    </tbody>
                    {historyDetails && historyDetails.length > 0 && (
                          <Stack spacing={2} >
                            <Pagination
                              count={Math.ceil(
                                historyDetails.length / itemsPerPage
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

export default HistoryActivity;
