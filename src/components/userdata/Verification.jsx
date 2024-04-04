import React from 'react';
import Header from "../../layouts/header/Header";
import Footer from "../../layouts/footer/Footer";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
const Verification = () => {
    return (<>
       <Header />
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
                <h3>Verification Documents List</h3>               
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
                    <th scope="col">Images</th>
                  
                  </tr>
                </thead>
                <tbody>
                  
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto@gmail.com</td>
                    <td>{new Date().toLocaleDateString()} <br />{new Date().toLocaleTimeString()} </td>

                    <td ><a href="/"><DownloadForOfflineIcon color='success' /></a></td>
                   
                  </tr>
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

       <Footer />
    </>);
}


export default Verification;