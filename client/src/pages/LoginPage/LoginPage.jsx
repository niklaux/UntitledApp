import React from "react";
import LogoBar from "../../components/LogoBar";
import TestimonyCarousel from "../../components/TestimonyCarousel";
import AuthForm from "../../components/AuthForm";
import SidebarComponent from "../../components/SidebarComponent";

function LoginPage() {
  return (
    <div className="container-fluid d-flex">
      <SidebarComponent />
      <div className="row vh-100">
        <div className="col-sm-12 col-md-12 col-lg-6 d-flex flex-column p-3">
          <LogoBar />

          <div className="row justify-content-center h-100">
            <div className="col-lg-7 col-md-7 col-sm-10 d-flex flex-column justify-content-center my-5">
              {/* <SignUp /> */}
              {/* <Login /> */}
              <AuthForm />
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
