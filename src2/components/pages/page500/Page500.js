import React from 'react'

import './page500.css';

const Page500 = () => {
  return (
    <div className="bg-color d-flex justify-content-center align-items-center min-vh-100 p-5">
     <div class="container">
        <div class="row justify-content-center">
            <div class="col-xl-4 col-md-5">
                <div class="card">
                    <div class="card-body p-4">

                        <div class="text-center w-75 mx-auto auth-logo mb-4">
                           
                            <h1 className='text-center dark-logo'>PDF Signature</h1>
                            

                            
                        </div>

                        <div class="text-center w-50 mx-auto my-4">
                            <img src="assets/images/500-error.svg" title="invite.svg" alt='' />
                        </div>

                        <h3 class="text-center mb-4 mt-3">Internal Server Error</h3>

                        <p class="text-muted text-center mt-3">We are experiencing an internal server problem, please try back later.</p>
                        <div class="mt-4 text-center">
                            <a href="/dashboard" class="btn btn-primary w-100">Back to Home</a>
                        </div>

                    </div> 
                </div>
                
            </div> 
        </div>
        
    </div>
    </div>
  )
}

export default Page500
