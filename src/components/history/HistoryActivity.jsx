import React from "react";
import Header from "../../layouts/header/Header";
import Footer from "../../layouts/footer/Footer";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import UserHeaderTop from "../userheadertop/UserHeaderTop";
import ButtonAction from "../buttonaction/ButtonAction";
const HistoryActivity = () => {
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
                    <h3>History Details</h3>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="overflow-auto ">
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
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto1@gmail.com</td>
                        <td>
                          {new Date().toLocaleDateString()}
                          <br />
                          {new Date().toLocaleTimeString()}
                        </td>
                        <td></td>
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

export default HistoryActivity;
