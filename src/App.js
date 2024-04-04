import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Pages

const Login = React.lazy(() => import("./components/Login/Login"));

const Home = React.lazy(() => import("./components/dashboard/Home"));
const UploadSignature = React.lazy(() =>
  import("./components/uploadSignature/UploadSignature")
);
const AllUserData = React.lazy(() => import("./components/userdata/UserData"));
const Draft = React.lazy(() => import("./components/userdata/DraftUpload"));
const UnCompleteData = React.lazy(() =>
  import("./components/userdata/UnCompleteUserData")
);
const AddSelection = React.lazy(() =>
  import("./components/adminSelect/SelecteCoordinate")
);
const Verification = React.lazy(() =>
  import("./components/userdata/Verification")
);
const Archived = React.lazy(() => import("./components/userdata/Archived"));
const ClientMaster = React.lazy(() =>
  import("./components/clientsMaster/ClientMaster")
);
const TemplateMaster = React.lazy(() =>
  import("./components/templateMater/TemplateMaster")
);
const Page404 = React.lazy(() => import("./components/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./components/pages/page500/Page500"));
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path="/" name="Login Page" element={<Login />} />
          <Route exact path="/dashboard" name="Dashboard" element={<Home />} />
           <Route path="/clientMaster" >
            <Route index={true}  element={<ClientMaster />} />
            <Route path="complete" element={<AllUserData />} />
            <Route path="draft" element={<Draft />} />
            <Route path="un-complete" element={<UnCompleteData />} />
            <Route path="verification" element={<Verification />} />
            <Route path="archived" element={<Archived />} />
          </Route>

          <Route
            exact
            path="/uploadSignature"
            name="upload Signature"
            element={<UploadSignature />}
          />
          <Route
            exact
            path="/templatemaster"
            name="upload Signature"
            element={<TemplateMaster />}
          />

          <Route
            exact
            path="/addSelection"
            name="AddSelection"
            element={<AddSelection />}
          />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          {/* <Route path="*" name="Home" element={<DefaultLayout />} /> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
