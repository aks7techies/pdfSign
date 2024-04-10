import React from "react";
import Header from "../../layouts/header/Header";
import Footer from "../../layouts/footer/Footer";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SendIcon from "@mui/icons-material/Send";
import ButtonAction from "../buttonaction/ButtonAction";
import UserHeaderTop from "../userheadertop/UserHeaderTop";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  {useNavigate, useParams}  from 'react-router-dom';
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
const UnCompleteUserData = () => {
  const clientEncode = useParams();
  const clientIdBase64Decode = atob(clientEncode.clientId);
  const [gettoken, setGettoken] = React.useState(null);
  const redirect = useNavigate();
  const [unCompleteDetails, setUnCompleteDetails] = React.useState([]);
  const [loader, setLoader] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  React.useEffect(() => {
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
          `http://localhost:8000/api/users/unComplete?clientId=${clientIdBase64Decode}&token=${gettoken}`
        );
        const obj = JSON.parse(JSON.stringify(response));

        if (obj.status === 200) {
          setUnCompleteDetails(obj.data.data);
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


  const reSendFunction = () => {};



  return (
    <>
      <Header />
      <section className="container-fluid px-4 pt-3">
        <a role="button" className="btn btn-dark" href="/dashboard">
          <ArrowBackIosNewIcon /> Back
        </a>
      </section>
      <section className="shifted container-fluid p-4 col-md-10 col-sm-12">
        <ButtonAction  headers={clientEncode.clientId}/>
        <UserHeaderTop />
        <div className="row">
         
          <div className="col-md-11 col-sm-12 col-xl-11">
            <div className="card w-100 border-0">
              <div className="card-header">
                <div className="row">
                  <div className="d-flex justify-content-between">
                    <h3>Unprocessed List</h3>
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
                        <th scope="col">Orginal Document</th>
                        <th scope="col">Date Time</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>@mdo</td>
                        <td>
                          {new Date().toLocaleDateString()} <br />
                          {new Date().toLocaleTimeString()}{" "}
                        </td>
                        <td>
                          <a href="/"> View </a>
                        </td>
                        <td>
                          {new Date().toLocaleDateString()} <br />
                          {new Date().toLocaleTimeString()}{" "}
                        </td>
                        <td>
                          <Button
                            className="text-capitalize"
                            onClick={reSendFunction}
                            title="Resend"
                          >
                            <SendIcon className="text-warning" />
                          </Button>
                        </td>
                      </tr>
                      {}
                    </tbody>

                  </table>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>
      <Footer />
    </>
  );
}

export default UnCompleteUserData;
