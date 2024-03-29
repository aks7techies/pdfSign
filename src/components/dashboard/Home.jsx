import  React, {useEffect} from "react";
import Header from "../../layouts/header/Header";
import Footer from "../../layouts/footer/Footer";
import {useNavigate} from "react-router-dom";
import "./home.css";

function Home() {
  const [loader, setLoader]= React.useState(true);
  const navigate = useNavigate();
 

  useEffect(() => {
    const retrievedValue = sessionStorage.getItem('KeyId');

    if (!retrievedValue) {
      navigate('/'); // Redirect to home page if session is not set
      // Show loading indicator
    }
    setTimeout(() => {
      setLoader(false); // Hide loader after data is loaded
    }, 100);
    
  }, [navigate]);
  // const location = useLocation();
 
  
  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div>
      {loader ? (
         <div className="loader-container d-flex justify-content-center align-items-center">
             <img src="../../../assets/images/loader.gif" alt="Loading..." className="loader-image" />
         </div>
      ) : (<>

      <Header />

   

      <section className="shifted container-fluid py-5 px-4 col-md-9 col-sm-12">
        <div className="row">
          <div
            className="col-md-3 col-sm-12 mb-3"
            onClick={() => handleNavigation("/draft")}
          >
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
          <div
            className="col-md-3 col-sm-12 mb-3"
            onClick={() => handleNavigation("/complete")}
          >
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
          <div
            className="col-md-3 col-sm-12 mb-3"
            onClick={() => handleNavigation("/un-complete")}
          >
            <div className="card text-white bg-info1">
              <div className="card-body">
                <div className="row d-flex align-items-center mb-4">
                  <div className="col-8">
                    <h5 className="card-title mb-0 text-nowrap">Unprocessed</h5>
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

          <div
            className="col-md-3 col-sm-12 mb-3"
            onClick={() => handleNavigation("/verification")}
          >
            <div className="card text-white bg-info1">
              <div className="card-body">
                <div className="row d-flex align-items-center mb-4">
                  <div className="col-8">
                    <h5 className="card-title mb-0">Verification</h5>
                  </div>
                  <div className="col-4">
                    <h2 className="text-center mb-0 ">1</h2>
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
          <div
            className="col-md-3 col-sm-12 mb-3"
            onClick={() => handleNavigation("/archived")}
          >
            <div className="card text-white bg-info1">
              <div className="card-body">
                <div className="row d-flex align-items-center mb-4">
                  <div className="col-8">
                    <h5 className="card-title mb-0">Archived</h5>
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

        </div>
      </section>

      <Footer />
      
    </>
    )}
    </div>
  );
}

export default Home;
