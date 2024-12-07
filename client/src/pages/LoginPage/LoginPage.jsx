import React from "react";
import LogoBar from "../../components/LogoBar";
import SignUp from "../../components/SignUp";

function LoginPage() {
  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="col d-flex flex-column p-4">
          <LogoBar />

          <div className="row justify-content-center h-100">
            <div className="col-lg-7 d-flex flex-column justify-content-center">
              <SignUp />
            </div>
          </div>
        </div>
        <div className="col bg-secondary"></div>
      </div>
    </div>
  );
}

export default LoginPage;
