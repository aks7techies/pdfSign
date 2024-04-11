import * as React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";

import FileOpenIcon from "@mui/icons-material/FileOpen";
import "./buttonaction.css";

function ButtonAction() {
  const location = useLocation();
  const navigate = useNavigate();
  const [draftDetails, setDraftDetails] = React.useState([]);
  const [unCompleteDetails, setUnCompleteDetails] = React.useState([]);
  const [loader, setLoader] = React.useState(true);
  useEffect(() => {
    fetchData();
  }, [redirect, gettoken]);

  const handleNavigation = (route) => {
    navigate(route);
  };
  const fetchData = async () => {
    const retrievedValue = sessionStorage.getItem("KeyId");
    if (!retrievedValue) {
      navigate("/"); // Redirect to home page if session is not set
      // Show loading indicator
      return;
    }
    setGettoken(retrievedValue);
    setTimeout(() => {
      setLoader(false); // Hide loader after data is loaded
    }, 100);

    if (gettoken !== null) {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/client?token=${gettoken}`
        );

        const obj = JSON.parse(JSON.stringify(response));

        if (obj.status === 200) {
          setClientsDetails(obj.data.data);
        } else {
          toast.danger(obj.msg, {
            position: "top-right",
          });
        }
      } catch (error) {
        // toast.danger( error.ErrorMessage, {
        //   position: "top-right",
        // });
        console.error(error);
      }
    }
  };


  return (
    <section className="buttonstyle mb-2" style={{width: "97%"}}>
      <Stack spacing={2} direction="row" className="">
        <ul className="d-flex overflow-auto">
          <li className="border-end px-2 border-info-subtle">
            <Button
              className={
                location.pathname === `/clientMaster/draft`
                  ? "active shadow p-2  bg-body-tertiary rounded"
                  : ""
              }
              onClick={() => handleNavigation(`/clientMaster/draft`)}
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
                location.pathname === `/clientMaster/complete`
                  ? "active shadow p-2  bg-body-tertiary rounded"
                  : ""
              }
              onClick={() => handleNavigation(`/clientMaster/complete`)}
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
                location.pathname === `/clientMaster/un-complete`
                  ? "active shadow p-2  bg-body-tertiary rounded"
                  : ""
              }
              onClick={() => handleNavigation(`/clientMaster/un-complete`)}
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
                location.pathname === `/clientMaster/verification`
                  ? "active shadow p-2  bg-body-tertiary rounded "
                  : ""
              }
              onClick={() => handleNavigation(`/clientMaster/verification`)}
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
          <li className="border-end px-2 border-info-subtle">
            <Button
              className={
                location.pathname === `/clientMaster/archived`
                  ? "active shadow p-2  bg-body-tertiary rounded"
                  : ""
              }
              onClick={() => handleNavigation(`/clientMaster/archived`)}
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
