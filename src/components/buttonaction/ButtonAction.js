import * as React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import SaveAsIcon from "@mui/icons-material/SaveAs";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";

import FileOpenIcon from "@mui/icons-material/FileOpen";
import "./buttonaction.css";

function ButtonAction(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <section className="buttonstyle mb-2" style={{width: "97%"}}>
      <Stack spacing={2} direction="row" className="">
        <ul className="d-flex">
          <li className="border-end px-2 border-info-subtle">
            <Button
              className={
                location.pathname === `/clientMaster/draft/${props.headers}`
                  ? "active shadow p-2  bg-body-tertiary rounded"
                  : ""
              }
              onClick={() => handleNavigation(`/clientMaster/draft/${props.headers}`)}
            >
              <SaveAsIcon /> Draft{" "}
              <span
                style={{backgroundColor: "#0075a3"}}
                className=" ms-1 p-1 text-light rounded-circle"
              >
                {" "}
                0
              </span>
            </Button>
          </li>
          <li className="border-end px-2 border-info-subtle">
            <Button
              className={
                location.pathname === `/clientMaster/complete/${props.headers}`
                  ? "active shadow p-2  bg-body-tertiary rounded"
                  : ""
              }
              onClick={() => handleNavigation(`/clientMaster/complete/${props.headers}`)}
            >
              <SettingsSuggestIcon /> Processed{" "}
              <span
                style={{backgroundColor: "#0075a3"}}
                className=" ms-1 p-1 text-light rounded-circle"
              >
                {" "}
                0
              </span>
            </Button>
          </li>
          <li className="border-end px-2 border-info-subtle">
            <Button
              className={
                location.pathname === `/clientMaster/un-complete/${props.headers}`
                  ? "active shadow p-2  bg-body-tertiary rounded"
                  : ""
              }
              onClick={() => handleNavigation(`/clientMaster/un-complete/${props.headers}`)}
            >
              <ElectricBoltIcon /> Unprocessed{" "}
              <span
                style={{backgroundColor: "#0075a3"}}
                className=" ms-1 p-1 text-light rounded-circle"
              >
                {" "}
                0
              </span>
            </Button>
          </li>
          <li className="border-end px-2 border-info-subtle">
            <Button
              className={
                location.pathname === `/clientMaster/verification/${props.headers}`
                  ? "active shadow p-2  bg-body-tertiary rounded "
                  : ""
              }
              onClick={() => handleNavigation(`/clientMaster/verification/${props.headers}`)}
            >
              <PlaylistAddCheckCircleIcon /> Verification{" "}
              <span
                style={{backgroundColor: "#0075a3"}}
                className=" ms-1 p-1 text-light rounded-circle"
              >
                {" "}
                0
              </span>
            </Button>
          </li>
          <li>
            <Button
              className={
                location.pathname === `/clientMaster/archived/${props.headers}`
                  ? "active shadow p-2  bg-body-tertiary rounded"
                  : ""
              }
              onClick={() => handleNavigation(`/clientMaster/archived/${props.headers}`)}
            >
              <FileOpenIcon /> Archived{" "}
              <span
                style={{backgroundColor: "#0075a3"}}
                className=" ms-1 p-1 text-light rounded-circle"
              >
                {" "}
                0
              </span>
            </Button>
          </li>
        </ul>
      </Stack>
    </section>
  );
}

export default ButtonAction;
