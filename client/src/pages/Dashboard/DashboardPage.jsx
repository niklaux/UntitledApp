import React from "react";
import SidebarComponent from "../../components/SidebarComponent";
import DashboardMain from "../../components/DashboardMain";
// import 'react-pro-sidebar/dist/css/styles.css'  // Import the sidebar's CSS for styling

function DashboardPage() {
  return (
    <div className="container-fluid d-flex vh-100">
      {/* Sidebar */}
      <SidebarComponent />

      {/* Main Content */}
      <div className="w-100">
        <DashboardMain />
      </div>
    </div>
  );
}

export default DashboardPage;
