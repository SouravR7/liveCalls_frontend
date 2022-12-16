import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";
import EventIcon from "@mui/icons-material/Event";

import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";

import * as Colors from "../../styled-component/colors";
import Header from "../Common/Header/header";
import Sidebar from "../Common/Sidebar/sidebar";
import { getAllEvents, getMyEvents } from "../../Services/events.services";
import { applyOnEvent, getAppliedEvent } from "../../Services/auth";
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
    "@media (min-width :1660px)": {
      paddingLeft: "40px",
    },
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
    width: "90%",
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
  imgStyle: {
    width: "100%",
    height: "400px",
    "@media (max-width: 767px)": {
      height: "200px",
    },
  },
  pageDetails: {
    padding: "15px",
  },
  eventDate: {
    display: "flex",
    color: "#9b9b9c !important",
    marginTop: "0.5rem",
    fontSize: "18px",
  },
  about: {
    width: "90%",
    marginTop: "1.5rem",

    "@media (max-width: 991px)": {
      width: "100%",
    },
  },
  type: {
    marginTop: "1.5rem",
  },
});

function EventDetails(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();
  const { event } = location.state;

  const [myEvents, setMyEvents] = useState([]);

  //user data from redux store
  let user_data = useSelector((state) => state.userData.data);
  if (user_data.email === "") {
    user_data = JSON.parse(localStorage.getItem("UsersData"));
  }

  let applied_data = useSelector(
    (state) => state.appliedEvent.applied_event_data
  );

  console.log(event, applied_data);

  const appliedEvents = () => {
    let payloadObj = {
      user_id: user_data.id,
    };

    getAppliedEvent(payloadObj)
      .then((res) => {
        if (!res.data.error) {
          dispatch({
            type: ACTIONS.GET_APPLIED_EVENTS,
            payload: res.data.data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    appliedEvents();
  }, []);

  const handleApply = () => {
    let payloadObj = {
      event_id: event._id,
      user_id: user_data.id,
    };
    applyOnEvent(payloadObj)
      .then((res) => {
        if (!res.data.error) {
          toast.success("applied sucessfully", {
            toastId: "create_events_sucess",
          });
          dispatch({
            type: ACTIONS.UPDATE_APPLIED_EVENTS,
            payload: { _id: event._id },
          });
        }
      })
      .catch((err) => {
        toast.error(err.message, { toastId: "create_events_error" });
      });
  };

  return (
    <div className="main-app-grid">
      <Sidebar />
      <Header />
      <div className={classes.mainMidContainer}>
        <div className={classes.homepageHolder}>
          <Grid container spacing={2} className={classes.gridContainer}>
            <Grid item xs={12} md={10} lg={8} xl={6}>
              <img
                src={event.image}
                alt="event_image"
                className={classes.imgStyle}
              />
            </Grid>
            {console.log(
              applied_data.findIndex((item) => item._id === event._id)
            )}
            <Grid item xs={12} md={6} lg={6} xl={4}>
              {applied_data.length > 0 &&
              applied_data.findIndex((item) => item._id === event._id) > -1 ? (
                <PButton
                  style={{
                    width: "200px",
                    height: "50px",
                    fontSize: "18px",
                    margin: "12px 0px 32px",
                    marginTop: "30px",
                    color: "#FFFF",
                  }}
                  color={Colors.midGray}
                  //onClick={handleApply}
                >
                  Applied on this event
                </PButton>
              ) : (
                <PButton
                  style={{
                    width: "200px",
                    height: "50px",
                    fontSize: "18px",
                    margin: "12px 0px 32px",
                    marginTop: "30px",
                    color: "#FFFF",
                  }}
                  color={Colors.ThemeB}
                  onClick={handleApply}
                >
                  Apply in this Event
                </PButton>
              )}
            </Grid>
          </Grid>

          <div className={classes.pageDetails}>
            <span style={{ fontSize: "24px", fontWeight: "500" }}>
              {event.title}
            </span>
            <div className={classes.eventDate}>
              <EventIcon style={{ height: "1em" }} />{" "}
              <span style={{ marginLeft: "0.3rem" }}>
                {event.date && new Date(event.date).toDateString()}
              </span>
            </div>

            <div className={classes.about}>
              <span style={{ fontSize: "20px", fontWeight: "500" }}>
                About Event
              </span>
              <div
                style={{
                  fontFamily: "Tahoma !important",
                  fontSize: "18px",
                  fontWeight: "350",
                }}
              >
                {event.description}
              </div>
            </div>
            <div className={classes.type}>
              <span style={{ fontSize: "18px", fontWeight: "500" }}>
                Sports Type :
              </span>
              <span
                style={{ fontSize: "18px", fontFamily: "Tahoma !important" }}
              >
                {" "}
                {event.sports_type}
              </span>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  marginLeft: "2rem",
                }}
              >
                No of Players :
              </span>
              <span
                style={{ fontSize: "18px", fontFamily: "Tahoma !important" }}
              >
                {" "}
                {event.players}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
