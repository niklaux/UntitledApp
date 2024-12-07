import React from "react";
import LogoBar from "../../components/LogoBar";
import SignUp from "../../components/SignUp";
import TestimonyCarousel from "../../components/TestimonyCarousel";

function LoginPage() {
  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="col-sm-12 col-md-12 col-lg-6 d-flex flex-column p-3">
          <LogoBar />

          <div className="row justify-content-center h-100">
            <div className="col-lg-7 col-md-7 col-sm-10 d-flex flex-column justify-content-center my-5">
              <SignUp />
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-6 p-0">
          <TestimonyCarousel />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
