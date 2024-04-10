import React from 'react';
import Header from "../../layouts/header/Header";
import Footer from "../../layouts/footer/Footer";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import ButtonAction from "../buttonaction/ButtonAction";
import  {useParams}  from 'react-router-dom';
import UserHeaderTop from '../userheadertop/UserHeaderTop';
const Archived = () => {
  const clientEncode = useParams();
  const clientIdBase64Decode = atob(clientEncode.clientId);
    return (<>
   <Header />
   <section className="container-fluid px-4 pt-3">
        <a role="button" className="btn btn-dark" href="/dashboard">
          <ArrowBackIosNewIcon /> Back
        </a>
      </section>
      <section className="shifted container-fluid p-4 col-md-10 col-sm-12">
        <ButtonAction headers={clientEncode.clientId} />
        <UserHeaderTop />
      <div className="row">
       
        <div className="col-md-11 col-sm-12 col-xl-11">
        <div className="card w-100 border-0">
          <div className="card-header">
            <div className="row">
              <div className="d-flex justify-content-between">
                <h3>Archived  List</h3>               
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
                  
                  <tr>
                    <th scope="row">1</th>
                    <td>@mjed</td>
                    <td>{new Date().toLocaleDateString()} <br />{new Date().toLocaleTimeString()} </td>

                    <td ><a href="/"> <DownloadForOfflineIcon  color='success'/> </a></td>
                   
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
    </>);
}


export default Archived;