import React, {useState, useEffect} from "react";
// import HomeIcon from "@mui/icons-material/Home";
import "./header.css";
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EngineeringIcon from '@mui/icons-material/Engineering';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LogoutIcon from "@mui/icons-material/Logout";


function Header() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  // const [initialRoute, setInitialRoute] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();

 

  useEffect(() => {
    const retrievedValue = sessionStorage.getItem("KeyId");
   
    if (!retrievedValue) {
      navigate("/"); // Redirect to home page if session is not set
      // Show loading indicator
    }
    // setTimeout(() => {
    //   setLoader(false); // Hide loader after data is loaded
    // }, 100);
  }, [location.pathname]);

  const handleNavigation = (route) => {
    navigate(route);
  };
  const getData = useSelector((state) => state.profile.profileData);

  // console.log(getData.data.user);
  const name = getData.data.user.name;
  const username = getData.data.user.username;

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const logOutfun = () => {
    // Clear session storage
    sessionStorage.removeItem("KeyId");
    // Redirect the user to the home page or any other appropriate page
    navigate("/");
  };

  return (
    <>
      {/* <Menu /> */}

      <nav className="navbar navbar-expand-lg bg-color1">
        <div className="container-fluid px-1">
          <a className="navbar-brand navbar-icon  text-light" href="/">
            <b>PDFSigner</b>
          </a>
          <div className="profile-ay">
            <div className="">
              <div className="profile1 dropdown d-flex align-items-center">
                <span className="px-2 fs-5 fw-bold text-white">Hi, {name}</span>
                <img
                  className="dropbtn"
                  src="https://1.bp.blogspot.com/-vhmWFWO2r8U/YLjr2A57toI/AAAAAAAACO4/0GBonlEZPmAiQW4uvkCTm5LvlJVd_-l_wCNcBGAsYHQ/s16000/team-1-2.jpg"
                  alt="profile_picture"
                />
                <div className="dropdown-content">
                  {/* <a href="#" className="fw-bold">
                    <AccountCircleIcon /> Profile
                  </a> */}
                  <a
                    href="#"
                    className="fw-bold"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    <BorderColorIcon /> Edit Profile
                  </a>
                  <a href="#" className="fw-bold" onClick={logOutfun}>
                    <LogoutIcon /> Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
          <input
            type="checkbox"
            id="toggleSidebar"
            className="toggle"
            checked={sidebarVisible}
            onChange={toggleSidebar}
          />
          <label htmlFor="toggleSidebar" className="sidebarBtn "></label>
          {/* <div
            className="collapse navbar-collapse ps-5"
            id="navbarTogglerDemo02"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
             
              <li className="nav-item">

                <a
                  className="nav-link active text-light"
                  aria-current="page"
                  href="/dashboard"
                >
                  <HomeIcon /> <span className="pt-4 fw-medium"> Home</span>
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      </nav>
      <div>
        {/* <!-- Modal --> */}
        <div
          className="modal modal-lg fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Edit Profile
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body row ">
                <div className="col-md-4">
                  <div className="modal-img d-flex flex-column align-items-center">
                    <img
                      src="https://1.bp.blogspot.com/-vhmWFWO2r8U/YLjr2A57toI/AAAAAAAACO4/0GBonlEZPmAiQW4uvkCTm5LvlJVd_-l_wCNcBGAsYHQ/s16000/team-1-2.jpg"
                      alt="profile_picture"
                    />

                    <button className="mt-3 btn btn-success">
                      <BorderColorIcon /> Edit
                    </button>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="heading">
                    <h3>My Profile</h3>
                  </div>
                  <div className="form row">
                    <div className="col-md-6 profile-frm">
                      <label>First Name</label>
                      <br />
                      <input type="text" placeholder="Enter your Name" />
                    </div>
                    <div className="col-md-6 profile-frm">
                      <label>Username</label>
                      <br />
                      <input type="text" placeholder="Enter your Username" />
                    </div>
                    <div className="col-md-6 profile-frm">
                      <label>Time zone</label>
                      <br />
                      <input type="date" placeholder="" />
                    </div>
                    {/* <div className="col-md-6 profile-frm">
                      <label>Phone no. </label>
                      <br />
                      <input type="number" placeholder="Enter your Number" />
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-success">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="sidebar" className={sidebarVisible ? "visible" : ""}>
          {/* <ButtonAction /> */}

          <section className=" ">
            <Stack spacing={2} direction="column" className="sidepad py-2">
              <ul>
                <li
                  className={location.pathname === "/dashboard" ? "active" : ""}
                  onClick={() => handleNavigation("/dashboard")}
                >
                  <Button>
                    <DashboardIcon /> Dashboard
                  </Button>
                </li>
                <li
                  className={location.pathname === "/clientMaster" ? "active" : ""}
                  onClick={() => handleNavigation("/clientMaster")}
                >
                  <Button>
                    <GroupAddIcon /> Client Master
                  </Button>
                </li>
                <li
                  className={location.pathname === "/templatemaster" ? "active" : ""}
                  onClick={() => handleNavigation("/templatemaster")}
                >
                  <Button>
                    <SnippetFolderIcon /> Template Master
                  </Button>
                </li>
                <li
                  className={location.pathname === "/Setting" ? "active" : ""}
                  onClick={() => handleNavigation("/Setting")}
                >
                  <Button>
                    <EngineeringIcon /> Settings
                  </Button>
                </li>
              </ul>
            </Stack>
          </section>

          <div className="profile">
            <img
              src="https://1.bp.blogspot.com/-vhmWFWO2r8U/YLjr2A57toI/AAAAAAAACO4/0GBonlEZPmAiQW4uvkCTm5LvlJVd_-l_wCNcBGAsYHQ/s16000/team-1-2.jpg"
              alt="profile_picture"
            />
            <h4>{name}</h4>
            <p>{username}</p>
            <div className="drp-respons mb-2">
              <a href="#" className="fw-bold text-white">
                <BorderColorIcon /> Edit Profile
              </a>
              <a href="#" onClick={logOutfun} className="fw-bold text-white">
                <LogoutIcon /> Logout
              </a>
            </div>
            <a className="text-dark " href="#">
              Privacy Police
            </a>
          </div>
        </div>

        <div id="mainContent" className={sidebarVisible ? "shifted" : ""}>
          {/* <Home/> */}
          {/* hwekjgghu */}
        </div>
      </div>
    </>
  );
}

export default Header;
