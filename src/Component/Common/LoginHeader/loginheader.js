import React from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import * as Colors from "../../../styled-component/colors";
import { PButton } from "../Button/button";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  LoginHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "80px",
    backgroundColor: "white",
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
  loginLogo: {
    height: "54px",
  },
  buttonsHolder: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

let headerLogo =
  "https://playo-website.gumlet.io/playo-website-v2/Logo+with+Trademark_Filled.png";

function LoginHeader() {
  const classes = useStyles();

  return (
    <div className={classes.LoginHeader}>
      <>
        <img
          height={54}
          src={headerLogo}
          alt="icon"
          className={classes.loginLogo}
        />
        <div className={classes.buttonsHolder}>
          <Link to="/">
            {" "}
            <div style={{ cursor: "pointer", fontWeight: 550 }}>
              Signin
            </div>{" "}
          </Link>

          <Link to="/signup">
            <PButton
              style={{
                fontSize: "16px",
                marginLeft: "1rem",
                color: "#FFFF",
              }}
              color={Colors.ThemeB}
              //onClick={handleSignIn}
            >
              Sign up
            </PButton>
          </Link>
        </div>
      </>
    </div>
  );
}

export default LoginHeader;
