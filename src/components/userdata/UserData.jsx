import React from "react";
import Header from "../../layouts/header/Header";
import Footer from "../../layouts/footer/Footer";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function UserData() {
  return (
    <>
      <Header />
      <section className="container-fluid px-4 pt-3">
        <a role="button" className="btn btn-dark" href="/dashboard"><ArrowBackIosNewIcon />  Back</a>
      </section>
      <section className="container-fluid p-4">
        <div class="card">
          <div class="card-header">Featured</div>
          <div className="card-body">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">An item</li>
            <li class="list-group-item">A second item</li>
            <li class="list-group-item">A third item</li>
          </ul>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default UserData;
