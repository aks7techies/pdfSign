import * as React from "react";
import Header from "../../layouts/header/Header";
import Footer from "../../layouts/footer/Footer";

import "./home.css";
import ButtonAction from "../buttonaction/ButtonAction";
function Home() {
  return (
    <>
      <Header />
      <ButtonAction />

      <section className="container-fluid px-4">
        <div className="row">
          <div className="col-md-3 col-sm-12 mb-3">
            <div className="card text-white bg-info1">
              <div className="card-body">
                
                <div className="row d-flex align-items-center mb-4">
                  <div className="col-8">
                    <h5 className="card-title mb-0">Draft</h5>
                  </div>
                  <div className="col-4">
                  <h2 className="text-center mb-0 ">3</h2>
                </div>
                </div>

                <div className="progress shadow-sm" style={{height: "5px"}}>
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    // style={{width: "10%"}}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-12 mb-3">
            <div className="card text-white bg-info1">
              <div className="card-body">
               
                <div className="row d-flex align-items-center mb-4">
                  <div className="col-8">
                    <h5 className="card-title mb-0">Unprocessed</h5>
                  </div>
                  <div className="col-4">
                  <h2 className="text-center  mb-0">1</h2>
                  </div>
                </div>

                <div className="progress shadow-sm" style={{height: "5px"}}>
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    // style={{width: "20%"}}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-12 mb-3">
            <div className="card text-white bg-info1">
              <div className="card-body">
                
                <div className="row d-flex align-items-center mb-4">
                <div className="col-8">
                  <h5 className="card-title mb-0">Processed</h5>
                </div>
                  <div className="col-4">
                    <h2 className="text-center mb-0">1</h2>
                  </div>
                </div>

                <div className="progress shadow-sm" style={{height: "5px"}}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    // style={{width: "5%"}}
                  ></div>
                </div>
              </div>
            </div>
          </div>


          {/* <div className="col-md-4">
            <div className="card text-white bg-warning">
              <div className="card-body">
                <blockquote className="card-bodyquote mb-0">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer posuere erat a ante.
                  </p>
                  <footer className="blockquote-footer text-white">
                    Someone famous in{" "}
                    <cite title="Source Title">Source Title</cite>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div> */}

          {/* <div className="col-md-4">
            <div className="card text-white bg-danger">
              <div className="card-body">
                <blockquote className="card-bodyquote mb-0">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer posuere erat a ante.
                  </p>
                  <footer className="blockquote-footer text-white">
                    Someone famous in{" "}
                    <cite title="Source Title">Source Title</cite>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
