import React from "react";
import Header from "../../layouts/header/Header";
import Footer from "../../layouts/footer/Footer";
import ButtonAction from "../buttonaction/ButtonAction";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import {useSelector, useDispatch } from 'react-redux';
import UserHeaderTop from "../userheadertop/UserHeaderTop";
const Verification = () => {
  const clientIdBase64Decode = useSelector((state)=>state.client.value);
  console.log(clientIdBase64Decode);
  return (
    <>
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
                    <h3>Verification  List</h3>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="overflow-auto ">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                       
                       
                        <th scope="col">Images</th>
                        <th scope="col">Date Time</th>
                        <th scope="col">Action</th>

                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>
                          <a href="/">
                            <DownloadForOfflineIcon color="success" />
                          </a>
                        </td>
                        <td>
                          {new Date().toLocaleDateString()} <br />
                          {new Date().toLocaleTimeString()}{" "}
                        </td>
                      </tr>
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
};

export default Verification;
