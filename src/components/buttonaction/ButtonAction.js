import React,{useEffect} from "react";
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
import {useSelector } from 'react-redux';

function ButtonAction() {
  const location = useLocation();
  const navigate = useNavigate();
  const [draftDetails, setDraftDetails] = React.useState([]);
  const [gettoken, setGettoken] = React.useState(null);
  const [unCompleteDetails, setUnCompleteDetails] = React.useState([]);
  const [completeDetails, setCompleteDetails] = React.useState([]);
  const [verifyDetails, setVerifyDetails] = React.useState([]);
  const [archiveDetails, setArchiveDetails] = React.useState([]);
  const clientData = useSelector((state)=>state.client.value);
  // const [loader, setLoader] = React.useState(true);
  useEffect(() => {
    fetchData();
  }, [navigate, gettoken]);

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
    // setTimeout(() => {
    //   setLoader(false); // Hide loader after data is loaded
    // }, 100);

    if (gettoken !== null) {
      try {
        const draftrespon = await axios.get(
          `http://localhost:8000/api/users?clientId=${clientData}&token=${gettoken}`
        );
        const uncompleterespon = await axios.get(
          `http://localhost:8000/api/unComplete/getAllprocess?clientId=${clientData}&token=${gettoken}`
        );
        const completerespon = await axios.get(
          `http://localhost:8000/api/client?token=${gettoken}`
        );
        const verifyrespon = await axios.get(
          `http://localhost:8000/api/client?token=${gettoken}`
        );
        const archiverespon = await axios.get(
          `http://localhost:8000/api/client?token=${gettoken}`
        );
        const objDraftData = JSON.parse(JSON.stringify(draftrespon));
        const objUncompleteData = JSON.parse(JSON.stringify(uncompleterespon));
        const objCompleteData = JSON.parse(JSON.stringify(completerespon));
        const objVerifyData = JSON.parse(JSON.stringify(verifyrespon));
        const objArchive = JSON.parse(JSON.stringify(archiverespon));
        if (objDraftData.status === 200 &&  objUncompleteData.status === 200 && objCompleteData.status === 200 && objVerifyData.status === 200 && objArchive.status === 200) {
          setDraftDetails(objDraftData.data.data);
          setUnCompleteDetails(objUncompleteData.data.data);
          setCompleteDetails(objCompleteData.data.data);
          setVerifyDetails(objVerifyData.data.data);
          setArchiveDetails(objArchive.data.data);
        } else {
          console.error(objDraftData.msg);
          // toast.danger(objDraftData.msg, {
          //   position: "top-right",
          // });
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
                {draftDetails.length}
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
                {completeDetails.length}
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
                {unCompleteDetails.length}
                
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
                {verifyDetails.length}
                
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
                {archiveDetails.length}
                
              </span>
            </Button>
          </li>
        </ul>
      </Stack>
    </section>
  );
}

export default ButtonAction;
