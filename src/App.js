
import React, {Suspense } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)



// Pages

const Login = React.lazy(() => import('./components/Login/Login'))

const Home = React.lazy(() => import('./components/dashboard/Home'))
const UploadSignature = React.lazy(()=> import('./components/uploadSignature/UploadSignature'))
const AllUserData = React.lazy(()=> import('./components/userdata/UserData'))
const Draft = React.lazy(()=> import('./components/userdata/DraftUpload'))
const UnCompleteData = React.lazy(()=> import('./components/userdata/UnCompleteUserData'))
const SelectoPdf = React.lazy(()=>import('./components/adminSelector/Selectorpdf'));
const Page404 = React.lazy(() => import('./components/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./components/pages/page500/Page500'))
function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={loading}>
      <Routes>
        <Route exact path="/" name="Login Page" element={<Login />} />
        <Route exact path="/dashboard" name="Dashboard" element={<Home />} />
        
        <Route exact path="/selectoPdf" name="SelectoPdf" element={<SelectoPdf />} />
        <Route exact path="/draft" name="Draft" element={<Draft />} />
        <Route exact path="/complete" name="All Complete Data" element={<AllUserData />} />
        <Route exact path="/un-complete" name="Un-Complete Data" element={<UnCompleteData />} />
        <Route exact path="/uploadSignature" name="upload Signature" element={<UploadSignature />} />
        
        <Route exact path="/404" name="Page 404" element={<Page404 />} />
        <Route exact path="/500" name="Page 500" element={<Page500 />} />
        {/* <Route path="*" name="Home" element={<DefaultLayout />} /> */}
      </Routes>
    </Suspense>
  </BrowserRouter>
  );
}

export default App;

