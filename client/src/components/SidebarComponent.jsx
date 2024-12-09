import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import LogoBar from "./LogoBar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { ChartNoAxesColumn, Folder, House, Layers } from "lucide-react";

function SidebarComponent() {
  return (
    <Sidebar
      className="rounded-2 border shadow-sm border-light-subtle m-3 p-2"
      backgroundColor="white"
      width="312px"
    >
      <LogoBar />

      <Menu
        className="mt-3"
        renderExpandIcon={({ open }) => (
          <span>{open ? <ExpandLessIcon /> : <ExpandMoreIcon />}</span>
        )}
      >
        <MenuItem
          className="text-muted fw-bold"
          icon={<House />}
          component={<Link to="/" />}
        >
          Home
        </MenuItem>
        <MenuItem
          className="text-muted fw-bold"
          icon={<ChartNoAxesColumn />}
          component={<Link to="/dashboard" />}
        >
          Dashboard
        </MenuItem>
        <MenuItem
          className="text-muted fw-bold"
          icon={<Layers />}
          component={<Link to="/dashboard" />}
        >
          Projects
        </MenuItem>
        <SubMenu
          className="text-muted fw-bold"
          icon={<Folder />}
          label="Folders"
          defaultOpen
        >
          <MenuItem className="ps-4" disabled component={<Link to="/dashboard" />}>
            View All
          </MenuItem>
          <MenuItem className="ps-4" disabled component={<Link to="/dashboard" />}>
            Recent
          </MenuItem>
          <MenuItem className="ps-4" disabled component={<Link to="/dashboard" />}>
            Favorites
          </MenuItem>
          <MenuItem className="ps-4" disabled component={<Link to="/dashboard" />}>
            Shared
          </MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
}

export default SidebarComponent;
