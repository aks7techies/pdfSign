import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DashboardIcon from '@mui/icons-material/Dashboard';
import SaveAsIcon from "@mui/icons-material/SaveAs";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import EngineeringIcon from '@mui/icons-material/Engineering';
import FileOpenIcon from "@mui/icons-material/FileOpen";
import "./buttonaction.css";

function ButtonAction() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <section className=" ">
      <Stack spacing={2} direction="column" className="sidepad py-2">
        <ul>
          <li className={location.pathname === "/dashboard" ? "active" : ""} onClick={() => handleNavigation("/dashboard")}>
            <Button >
              <DashboardIcon /> Dashboard
            </Button>
          </li>
          <li className={location.pathname === "/draft" ? "active" : ""} onClick={() => handleNavigation("/draft")}>
            <Button >
              <SaveAsIcon /> Draft
            </Button>
          </li>
          <li className={location.pathname === "/complete" ? "active" : ""} onClick={() => handleNavigation("/complete")}>
            <Button >
              <SettingsSuggestIcon /> Processed
            </Button>
          </li>
          <li className={location.pathname === "/un-complete" ? "active" : ""} onClick={() => handleNavigation("/un-complete")}>
            <Button >
              <ElectricBoltIcon /> Unprocessed
            </Button>
          </li>
          <li className={location.pathname === "/verification" ? "active" : ""} onClick={() => handleNavigation("/verification")}>
            <Button >
              <PlaylistAddCheckCircleIcon /> Verification
            </Button>
          </li>
          <li className={location.pathname === "/archived" ? "active" : ""} onClick={() => handleNavigation("/archived")}>
            <Button >
              <FileOpenIcon /> Archived
            </Button>
          </li>
          <li className={location.pathname === "/Setting" ? "active" : ""} onClick={() => handleNavigation("/Setting")}>
            <Button >
              <EngineeringIcon /> Settings
            </Button>
          </li>
        </ul>
      </Stack>
    </section>
  );
}

export default ButtonAction;
