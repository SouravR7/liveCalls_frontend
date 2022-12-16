import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import EventIcon from "@mui/icons-material/Event";
import { useDispatch, useSelector } from "react-redux";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { toast } from "react-toastify";

import LinesEllipsis from "react-lines-ellipsis";

import * as Colors from "../../styled-component/colors";

import { ACTIONS } from "../../store/actions";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  postCard: {
    width: "100%",
    borderRadius: "10px",
    //padding: "25px",
    boxSizing: "border-box",
    //border: "1px solid  #979797",
    marginBottom: "20px",
    minHeight: "350px",
    boxShadow: "#000 0px 0px 8px -3px",
  },
  postCardContainer: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-between",
    paddingLeft: "0px",
    paddingRight: "30px",

    "@media (max-width: 991px)": {
      padding: "0px 25px",
    },
  },
  postText: {
    color: "#2d2d2d",
    fontSize: "16px",
    fontWeight: 700,
    textAlign: "initial",
    fontFamily: "'Open Sans',sans-serif !important",
    "@media (max-width: 600px)": {
      fontSize: "14px",
    },
  },
  postTitle: {
    fontSize: "1rem",
    //color: `${Colors.textColor}`,
    margin: "10px 0px",
    padding: "0px 15px",
    //height: "110px",
  },
  postDetails: {
    //color: `${Colors.textPrimary}`,
    fontSize: "1.4rem",
    margin: "15px 0px",
  },
  buttonContainer: {
    minHeight: "50px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "45px",
  },
  imgContainer: {
    width: "100%",
  },
  eventImg: {
    width: "100%",
    height: "200px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    //objectFit: "none",
  },
  eventDate: {
    display: "flex",
    color: "#9b9b9c !important",
    marginTop: "0.5rem",
    fontSize: "14px",
  },
  eventDetails: {
    marginTop: "1.5rem",
    borderTop: "1px solid #bfbfbf",
    display: "flex",
    padding: "10px",
    alignItems: "center",
  },
});

export default function Post(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [deleteOpen, setDeleteOpen] = useState({
    open: false,
    id: null,
  });

  const [createDialog, setCreateDialog] = useState({
    type: "",
    open: false,
  });

  const addEditClickOpen = (post) => {
    setCreateDialog({
      type: "update",
      open: true,
      post: post,
    });
  };

  const onClose = () => {
    setCreateDialog({
      type: "",
      open: false,
    });
  };

  const addDeleteClickOpen = (post) => {
    setDeleteOpen({
      open: true,
      id: post.id,
    });
  };

  const handleDeleteClose = () => {
    setDeleteOpen({
      open: false,
      id: null,
    });
  };

  return (
    <Grid
      item
      xs={12}
      md={6}
      lg={6}
      xl={4}
      className={classes.postCardContainer}
    >
      <Link
        to="/eventDetails"
        style={{ width: "100%" }}
        state={{ event: props.post }}
      >
        <div className={classes.postCard}>
          <div className={classes.imgContainer}>
            <img
              src={props.post.image}
              alt="event_img"
              height={54}
              className={classes.eventImg}
            />
          </div>
          <div className={classes.postTitle}>
            <LinesEllipsis
              text={props.post.title}
              maxLine="2"
              ellipsis="..."
              trimRight
              className={classes.postText}
            />
            <div className={classes.eventDate}>
              {" "}
              <EventIcon style={{ height: "0.8em" }} />{" "}
              <span style={{ marginLeft: "0.3rem" }}>
                {props.post.date && new Date(props.post.date).toDateString()}
              </span>
            </div>
          </div>
          <div className={classes.eventDetails}>
            <SportsSoccerIcon style={{ color: "#94d5eb" }} />{" "}
            <span
              style={{
                fontSize: "14px",
                marginLeft: "0.5rem",
                fontWeight: "500",
              }}
            >
              {props.post.sports_type}
            </span>
          </div>
        </div>
      </Link>
    </Grid>
  );
}
