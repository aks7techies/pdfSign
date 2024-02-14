import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import './header.css';

function Header() {
  return (
    <>
   
      <nav className="navbar navbar-expand-lg bg-color1">
        <div className="container-fluid px-4">
          <a className="navbar-brand text-light" href="/">
            <b>PDFSigner</b>
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
          <div className="collapse navbar-collapse ps-5" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active text-light" aria-current="page" href="/dashboard">
                 <HomeIcon /> Home
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