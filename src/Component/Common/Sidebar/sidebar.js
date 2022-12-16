import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ACTIONS } from "../../../store/actions";
import { Link } from "react-router-dom";

import Collapse from "@mui/material/Collapse";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import PreviewIcon from "@mui/icons-material/Preview";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import "./sidebar.css";

function Sidebar(props) {
  const [open, setOpen] = React.useState(false);

  let user_data = useSelector((state) => state.userData.data);
  if (user_data.email === "") {
    user_data = JSON.parse(localStorage.getItem("UserData"));
  }

  const handleClick = () => {
    setOpen(!open);
  };

  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };

  const history = useNavigate();

  return (
    <div className={isActive ? "sidebar toggleSidebar" : "sidebar"}>
      <div onClick={toggleClass} className={"sideArrow"}>
        <MenuIcon className={isActive ? "menuIcon close" : "menuIcon"} />
        <CloseIcon className={isActive ? "closeIcon" : "closeIcon close"} />
      </div>
      <div className="sidebar-header">
        {/* <img src={hamburberIcon} width={100} height={51} alt="name" /> */}
      </div>

      <div className="sidebar-manage-strings-section">
        <>
          <div className={"sidebar-button-holder selected"}>
            <HomeIcon />
            <div
              style={{ padding: "0px 13px", cursor: "pointer" }}
              onClick={() => history("/dashboard")}
            >
              Home
            </div>
          </div>

          <div className={"sidebar-button-holder selected"}>
            {/* <img src={homeWhiteIcon} alt="name" /> */}
            <CalendarMonthIcon />
            <div
              style={{ padding: "0px 13px", cursor: "pointer" }}
              onClick={() => history("/createEvent")}
            >
              Create new Events
            </div>
          </div>
        </>

        <>
          <div
            className={"sidebar-button-holder"}
            //onClick={handleClick}
          >
            {/* <img src={gigsWhiteIcon} alt="name" /> */}
            <PermContactCalendarIcon />
            <div
              style={{ padding: "0px 13px", cursor: "pointer" }}
              onClick={() => history("/myEvents")}
            >
              My Events
            </div>
          </div>
        </>
      </div>
    </div>
  );
}

export default Sidebar;
