import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";

import * as Colors from "../../styled-component/colors";
import Header from "../Common/Header/header";
import Sidebar from "../Common/Sidebar/sidebar";
import EventTable from "../Common/eventTable";
import { getAllEvents, getMyEvents } from "../../Services/events.services";
import { PButton } from "../Common/Button/button";
import { ACTIONS } from "../../store/actions";

const useStyles = makeStyles({
  mainMidContainer: {
    padding: "110px 24px 0 216px",

    "@media (max-width: 991px)": {
      padding: "110px 15px 0",
    },
  },

  homepageHolder: {
    padding: "15px",
    paddingBottom: "40px",
    background: "#fafafa",
    minHeight: "500px",
  },
  container: {
    padding: "15px",
    "@media (max-width : 768px)": {
      padding: 0,
    },
  },
  gridItem: {
    marginTop: "15px",
  },
  gridContainer: {
    display: "flex",
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    "@media (max-width: 991px)": {
      flexDirection: "column",
      width: "100%",
    },
  },
  dropContainer: {
    height: "50px",
    width: "40%",
    display: "flex",
    border: "1px dotted black",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    marginTop: "10%",
    "@media (max-width: 991px)": {
      width: "95%",
    },
  },
  imgContainer: {
    height: "250px",
    width: "490px",
    display: "flex",
    marginBottom: "25px",
    "@media (max-width: 991px)": {
      width: "335px",
    },
  },
  inputLabel: {
    width: "40% !important",
    "@media (max-width: 991px)": {
      width: "70% !important",
    },
  },
});

function MyEvents(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useNavigate();

  const [myEvents, setMyEvents] = useState([]);

  //user data from redux store
  let user_data = useSelector((state) => state.userData.data);
  if (user_data.email === "") {
    user_data = JSON.parse(localStorage.getItem("UsersData"));
  }

  const getEvents = () => {
    let payloadObj = {
      user_id: user_data.id,
    };
    getMyEvents(payloadObj)
      .then((res) => {
        if (!res.data.error) {
          setMyEvents(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="main-app-grid">
      <Sidebar />
      <Header />
      <div className={classes.mainMidContainer}>
        <div className={classes.homepageHolder}>
          {myEvents.length > 0 && <EventTable tableData={myEvents} />}
        </div>
      </div>
    </div>
  );
}

export default MyEvents;
