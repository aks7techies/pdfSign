import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import SaveAsIcon from "@mui/icons-material/SaveAs";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";

import FileOpenIcon from "@mui/icons-material/FileOpen";
import "./buttonaction.css";

function ButtonAction() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <section className="buttonstyle mb-2" style={{width: "97%"}}>
      <Stack spacing={2} direction="row" className="">
        <ul className="d-flex">

          <li >
            <Button className={location.pathname === "/clientMaster/draft" ? "active" : ""} onClick={() => handleNavigation("/clientMaster/draft")}>
              <SaveAsIcon /> Draft <span style={{ backgroundColor:"#0075a3" }} className=" ms-1 p-1 text-light rounded-circle"> 0</span>
            </Button>
          </li>
          <li >
            <Button className={location.pathname === "/clientMaster/complete" ? "active" : ""} onClick={() => handleNavigation("/clientMaster/complete")}>
              <SettingsSuggestIcon /> Processed <span style={{ backgroundColor:"#0075a3" }} className=" ms-1 p-1 text-light rounded-circle"> 0</span>
            </Button>
          </li>
          <li >
            <Button className={location.pathname === "/clientMaster/un-complete" ? "active" : ""} onClick={() => handleNavigation("/clientMaster/un-complete")}>
              <ElectricBoltIcon /> Unprocessed <span style={{ backgroundColor:"#0075a3" }} className=" ms-1 p-1 text-light rounded-circle"> 0</span>
            </Button>
          </li>
          <li >
            <Button className={location.pathname === "/clientMaster/verification" ? "active" : ""} onClick={() => handleNavigation("/clientMaster/verification")}>
              <PlaylistAddCheckCircleIcon /> Verification <span style={{ backgroundColor:"#0075a3" }} className=" ms-1 p-1 text-light rounded-circle"> 0</span>
            </Button>
          </li>
          <li >
            <Button className={location.pathname === "/clientMaster/archived" ? "active" : ""} onClick={() => handleNavigation("/clientMaster/archived")}>
              <FileOpenIcon /> Archived <span style={{ backgroundColor:"#0075a3" }} className=" ms-1 p-1 text-light rounded-circle"> 0</span>
            </Button>
          </li>
         
        </ul>
      </Stack>
    </section>
  );
}

export default ButtonAction;
