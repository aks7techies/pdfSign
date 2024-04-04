import React from "react";
import  { useNavigate}  from 'react-router-dom';
import './login.css';
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import {fetchData} from '../../redux/slices/ProfileData';



function Login(){
  
  const history = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };
 

  const signInSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required*"),

    password: Yup.string()
      .required("Password is required*")
      .min(4, "Password is too short - should be 4 chars minimum"),
  });

  const submitForm = async(values) => {
  
    const url = "http://localhost:8000/api/user/login";

    try {
      const obj = {
        username: values.email,
        password: values.password,
      };
    
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json"
        }
      });
    
      if (!response.ok) {
        toast.error("Failed Login!", {
          position: "top-right"
        });
        throw new Error("Failed to login");
       
      }
    
      const data = await response.json();

      dispatch(fetchData(data));
      const jsonData = JSON.parse(JSON.stringify(data));
      // console.log(jsonData.token.token); // Log the response data
      sessionStorage.setItem("KeyId", jsonData.token.token);

    
      toast.success("Success Login!", {
        position: "top-right"
      });
    
     setTimeout(() => {
      history("/dashboard");
     }, 1000); // Properly navigate to the dashboard
    } catch (error) {
     
      console.error("Error:", error);
    }
    
    // Add your form submission logic here
  };

  return (
    <div>
      <ToastContainer />
      <section className="vh-100 bg area">
      <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
            
        <div className="container py-5 h-100">

          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      // src="assets/images/electronic-signature-e-sign.jpg"
                      src="assets/images/digital-signature.png"
                      alt="login form"
                      className="img-fluid h-100"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4  text-black">
                      <div className="d-flex align-items-center  ">
                        <i
                          className="fas fa-cubes fa-2x me-3"
                          style={{ color: "#ff6219" }}
                        ></i>
                        <span className="h1 fw-bold mb-0">PDF Signer</span>
                      </div>
                      <hr className="m-2 line"/>

                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                       <b> Sign into your account</b>
                      </h5>
                      <Formik
                        initialValues={initialValues}
                        validationSchema={signInSchema}
                        onSubmit={submitForm}
                      >
                        {({
                          values,
                          handleChange,
                          handleSubmit,
                          errors,
                          touched,
                          handleBlur,
                          isValid,
                          dirty,
                        }) => (
                          <form onSubmit={handleSubmit}>
                            {/* ... (omitted for brevity) */}
                            <div className="form-outline mb-4">
                              <ErrorMessage
                                name="email"
                                component="span"
                                className="error text-danger"
                              />
                              <Field
                                type="email"
                                name="email"
                                id="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                  "form-control form-control-lg" +
                                  (errors.email && touched.email
                                    ? " input-error"
                                    : "")
                                }
                              />
                              <label className="form-label" htmlFor="email">
                                Email address
                              </label>
                            </div>

                            <div className="form-outline mb-4">
                              <ErrorMessage
                                name="password"
                                component="span"
                                className="error text-danger"
                              />
                              <Field
                                type="password"
                                name="password"
                                id="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                  "form-control form-control-lg" +
                                  (errors.password && touched.password
                                    ? " input-error"
                                    : "")
                                }
                              />
                              <label className="form-label" htmlFor="password">
                                Password
                              </label>
                            </div>

                            <div className="pt-1 mb-4">
                              <button
                                type="submit"
                                className={
                                  "btn btn-dark btn-lg btn-block" +
                                  (dirty && isValid ? "" : " disabled-btn")
                                }
                                disabled={!(dirty && isValid)}
                              >
                                Login
                              </button>
                            </div>
                          </form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;