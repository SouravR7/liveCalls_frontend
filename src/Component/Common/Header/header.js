import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";

import * as Colors from "../../../styled-component/colors";
//import { Body } from "../../Styles-Elements/Labels";
import { PButton } from "../Button/button";

const useStyles = makeStyles({
  LoginHeader: {
    position: "fixed",
    zIndex: "998",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "80px",
    backgroundColor: `${Colors.neutrallightGray}`,
    flexDirection: "row",
    paddingLeft: "120px",
    paddingRight: "120px",
    width: "100%",
    boxSizing: "border-box",

    "@media (max-width: 991px)": {
      paddingLeft: "15px",
      paddingRight: "15px",
    },
  },
  LoginSide: {
    "@media (max-width: 991px)": {
      marginLeft: "50px",
      marginBottom: "10px",
      //paddingRight: "15px",
    },
  },
  headerText: {
    "@media (max-width: 991px)": {
      display: "none",
    },
  },
  loginLogo: {
    height: "54px !important",
    borderRadius: "5px !important",
    "@media (max-width: 768px)": {
      height: "30px !important",
    },
  },
  buttonsHolder: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "@media (max-width: 768px)": {
      fontSize: "12px !important",
    },
  },
  dialog: {
    //backgroundColor: theme.palette.background.paper,
    border: `1px solid  ${Colors.midGray} !important`,
    borderRadius: "8px !important",
    //color: `${theme.palette.text.primary} !important`,

    marginBottom: "100px !important",
    marginTop: "20px !important",
    width: "448px",
  },

  dialogTitle: {
    borderBottom: `1px solid  ${Colors.midGray} !important`,
    fontSize: "1rem !important",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dialogContent: {
    padding: "0px 25px !important",
    paddingTop: "20px !important",
  },
  dialogActions: {
    padding: "20px !important",
  },
});

let headerLogo =
  "https://playo-website.gumlet.io/playo-website-v2/Logo+with+Trademark_Filled.png";

function Header() {
  const classes = useStyles();
  const history = useNavigate();

  let userData = JSON.parse(localStorage.getItem("UsersData"));
  let email = userData ? userData.email.split("@")[0] : null;

  const [logoutOpen, setLogout] = React.useState(false);
  const logoutClickOpen = () => {
    setLogout(true);
  };

  const handleClose = () => {
    setLogout(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("UsersData");
    history("/");
  };

  useEffect(() => {}, []);

  return (
    <div className={classes.LoginHeader}>
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className={classes.LoginSide}
        >
          <img
            height={54}
            src={headerLogo}
            alt="icon"
            className={classes.loginLogo}
          />
        </div>

        <div className={classes.buttonsHolder}>
          <div style={{ marginLeft: "2em" }}>Welcome,{email} </div>
          <PButton
            style={{ marginLeft: "2em", color: "#fff" }}
            color={Colors.ThemeB}
            onClick={logoutClickOpen}
          >
            Log out
          </PButton>
        </div>
      </>
      <Dialog
        open={logoutOpen}
        maxWidth="xs"
        onClose={handleClose}
        classes={{
          paper: classes.dialog,
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>
          Log out confirmation
          <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <div
            style={{
              fontSize: "15px",
              color: "black",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            No
          </div>
          <PButton
            style={{
              width: "70px",
              height: "28px",
              fontSize: "15px",
              color: "#fff",
              marginLeft: "10px",
            }}
            color={Colors.ThemeB}
            onClick={handleLogout}
          >
            Yes
          </PButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Header;
