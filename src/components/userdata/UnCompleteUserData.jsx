import React from 'react'
import Header from '../../layouts/header/Header'
import Footer from '../../layouts/footer/Footer';
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SendIcon from '@mui/icons-material/Send';
function UnCompleteUserData() {

  const reSendFunction =()=>{

  }

  return (
    <>
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
                <h3>Unprocessed  Documents List</h3>
                {/* <Button onClick={handleOpen}>
                  {" "}
                  <AddIcon /> Add User
                </Button> */}
                {/* <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
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
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        <h3>Add Document Upload</h3>
                      </Typography>
                      <hr />
                      <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <div className="row">
                          
                          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 mb-3">
                            <label htmlFor="name" className="form-label mb-0">
                              Name<span className="text-danger">*</span>
                            </label>
                            <Field
                              type="text"
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={"form-control" +  (errors.name && touched.name
                                ? " input-error"
                                : "")}
                              name="name"
                              id="name"
                            />
                             <ErrorMessage
                                name="name"
                                component="span"
                                className="error text-danger"
                              />
                          </div>
                          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 mb-3">
                            <label htmlFor="email" className="form-label mb-0">
                              Email<span className="text-danger">*</span>
                            </label>
                            <Field
                              type="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={"form-control"+  (errors.email && touched.email
                                ? " input-error"
                                : "")}
                              name="email"
                              id="email"
                            />
                            <ErrorMessage
                                name="email"
                                component="span"
                                className="error text-danger"
                              />
                          </div>
                          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 mb-3">
                            <label htmlFor="documentname" className="form-label mb-0">
                               Document Name <span className="text-danger">*</span>
                            </label>
                            <Field
                              type="text"
                              value={values.documentname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              className={"form-control" +  (errors.documentname && touched.documentname
                                ? " input-error"
                                : "")}
                              name="documentname"
                              id="documentname"
                            />
                            <ErrorMessage
                                name="documentname"
                                component="span"
                                className="error text-danger"
                              />
                          </div>
                          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 mb-3">
                            <label
                              htmlFor="uploadDocument"
                              className="form-label mb-0"
                            >
                              Upload Document<span className="text-danger">*</span>
                            </label>
                            <Field
                              type="file"
                                value={values.uploadDocument}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                accept='.pdf'
                                className={"form-control" +   (errors.uploadDocument && touched.uploadDocument
                                ? " input-error"
                                : "")}
                              name="uploadDocument"
                              id="uploadDocument"
                            />
                            <ErrorMessage
                                name="uploadDocument"
                                component="span"
                                className="error text-danger"
                              />
                          </div>
                          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 mb-3">
                            <button className={ "btn btn-primary" + (dirty && isValid ? "" : " disabled-btn") } onClick={submitForm} disabled={!(dirty && isValid)}> Submit</button>
                          </div>
                        </div>
                      </Typography>
                    </form>
                     )}
                     </Formik>
                  </Box>
                </Modal> */}
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className='overflow-auto'>
            <table className="table table-hover">
              <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Date Time</th>
                    <th scope="col">Document Name</th>
                    <th scope="col">Orginal Document</th> 
                    <th scope="col">Date Time</th> 
                    <th scope="col">Action</th>
                  
                </tr>
              </thead>
              <tbody>
                <tr>
                   <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto1@gmail.com</td>
                    <td>{new Date().toLocaleDateString()} <br />{new Date().toLocaleTimeString()} </td>
                    <td>@mdo</td>
                    <td><a href="/"> View </a></td>
                    <td>{new Date().toLocaleDateString()} <br />{new Date().toLocaleTimeString()} </td>
                    <td>
                    <Button className="text-capitalize" onClick={reSendFunction} title='Resend'>
                    <SendIcon className='text-warning' />
                   </Button>
                    </td>

                </tr>
                
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </section>
     <Footer />
    </>
  )
}

export default UnCompleteUserData