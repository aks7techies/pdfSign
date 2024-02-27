import React from 'react';
import './page404.css'

const Page404 = () => {
  return (
    <div className='bg-color d-flex justify-content-center align-items-center min-vh-100 p-5'>
     <div className="container ">
        <div className="row justify-content-center">
            <div className="col-xl-4 col-md-5">
                <div className="card">
                    <div className="card-body p-4">

                        <div className="text-center w-75 mx-auto auth-logo mb-4">
                            <a href="/dashboard" className="dark-logo text-dark">
                                <h1 className='text-center'>PDF Signature</h1>
                            </a>

                            {/* <a href="index.html" className="logo-light">
                                <span><img src="assets/images/logo-light.png" alt="" height="22" /></span>
                            </a> */}
                        </div>

                        <div className="text-center w-50 mx-auto my-4">
                            <img src="assets/images/404-error.svg" title="invite.svg" alt='' />
                        </div>

                        <h3 className="text-center mb-4 mt-3">Page Not Found</h3>

                        <p className="text-muted text-center mt-3"> It's looking like you may have taken a wrong turn. Don't worry... it happens to the best of us. You might want to check your internet connection. </p>
                        <div className="mt-4 text-center">
                            <a href="/dashboard" className="btn btn-primary w-100">Back to Home</a>
                        </div>

                    </div> 
                </div>
                
            </div> 
        </div>
       
    </div>
    </div>
  )
}

export default Page404
