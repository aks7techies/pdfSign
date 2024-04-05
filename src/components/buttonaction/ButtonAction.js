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
    <section className="buttonstyle " style={{width: "85%"}}>
      <Stack spacing={2} direction="column" className=" py-2">
        <ul>

          <li className={location.pathname === "/clientMaster/draft" ? "active" : ""} onClick={() => handleNavigation("/clientMaster/draft")}>
            <Button >
              <SaveAsIcon /> Draft <span style={{ backgroundColor:"#0075a3" }} className=" ms-1 p-1 text-light rounded-circle"> 0</span>
            </Button>
          </li>
          <li className={location.pathname === "/clientMaster/complete" ? "active" : ""} onClick={() => handleNavigation("/clientMaster/complete")}>
            <Button >
              <SettingsSuggestIcon /> Processed <span style={{ backgroundColor:"#0075a3" }} className=" ms-1 p-1 text-light rounded-circle"> 0</span>
            </Button>
          </li>
          <li className={location.pathname === "/clientMaster/un-complete" ? "active" : ""} onClick={() => handleNavigation("/clientMaster/un-complete")}>
            <Button >
              <ElectricBoltIcon /> Unprocessed <span style={{ backgroundColor:"#0075a3" }} className=" ms-1 p-1 text-light rounded-circle"> 0</span>
            </Button>
          </li>
          <li className={location.pathname === "/clientMaster/verification" ? "active" : ""} onClick={() => handleNavigation("/clientMaster/verification")}>
            <Button >
              <PlaylistAddCheckCircleIcon /> Verification <span style={{ backgroundColor:"#0075a3" }} className=" ms-1 p-1 text-light rounded-circle"> 0</span>
            </Button>
          </li>
          <li className={location.pathname === "/clientMaster/archived" ? "active" : ""} onClick={() => handleNavigation("/clientMaster/archived")}>
            <Button >
              <FileOpenIcon /> Archived <span style={{ backgroundColor:"#0075a3" }} className=" ms-1 p-1 text-light rounded-circle"> 0</span>
            </Button>
          </li>
         
        </ul>
      </Stack>
    </section>
  );
}

export default ButtonAction;
