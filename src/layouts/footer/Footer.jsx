import React from "react";
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import './footer.css';

function Footer() {
const Year = new Date().getFullYear();
  return (
    <>
      <div className="container-fluid bg-color sticky-bottom">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <a
              href="/"
              className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
            >
              {/* <svg className="bi" width="30" height="24">
                
              </svg> */}
            </a>
            <span className="mb-3 mb-md-0 text-body-secondary">
            © {Year} PDF Signature, Inc
            </span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex me-5">
            <li className="ms-3">
              <a className="text-body-secondary" href="/">
                <TwitterIcon color="dark" />
              </a>
            </li>
            <li className="ms-3">
              <a className="text-body-secondary" href="/">
              <InstagramIcon color="dark" />
              </a>
            </li>
            <li className="ms-3">
              <a className="text-body-secondary" href="/">
                <FacebookIcon color="dark"  />
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
}

export default Footer;
