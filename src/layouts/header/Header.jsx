import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import './header.css';

function Header() {
  return (
    <>
   
      <nav className="navbar navbar-expand-lg bg-color1">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            PDFSignature
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/dashboard">
                 <HomeIcon color='dark'/> Home
                </a>
              </li>
              
            </ul>
           
          </div>
        </div>
      </nav>
   
  </>
  )
}

export default Header