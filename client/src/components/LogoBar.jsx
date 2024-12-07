import React from "react";

function LogoBar() {
  return (
    <div className="d-flex align-items-center">
      <img
        src="/assets/Logomark.svg"
        alt="Logo"
        className="m-2"
        style={{ width: "32px", height: "32px" }}
      />
      <h5 className="m-0 fw-bold"> Untitled UI</h5>
    </div>
  );
}

export default LogoBar;
