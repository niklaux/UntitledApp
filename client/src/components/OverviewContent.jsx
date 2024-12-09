import React from "react";
import CardCommon from "./CardCommon";

function OverviewContent() {
  return (
    <div className="mt-4">
      <div className="row">
        <div className="col-12 col-sm-6 col-md-4 mb-4">
          <CardCommon label="Total Customers" number={1500} percentage={75} />
        </div>
        <div className="col-12 col-sm-6 col-md-4 mb-4">
          <CardCommon label="Members" number={1200} percentage={60} />
        </div>
        <div className="col-12 col-sm-6 col-md-4 mb-4">
          <CardCommon label="Active Now" number={800} percentage={50} />
        </div>
      </div>

      
    </div>
  );
}

export default OverviewContent;
