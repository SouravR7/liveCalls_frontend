import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@mui/styles";

import { Textfield, InputWrapper } from "../../styled-component/Inputs";
import * as Colors from "../../styled-component/colors";
import LoginHeader from "../Common/LoginHeader/loginheader";
import LoginFooter from "../Common/LoginFooter/loginFooter";
import { InputLabel, Error } from "../../styled-component/Labels";
import { PButton } from "../Common/Button/button";
import { register } from "../../Services/auth";

// import images
import visibilityIcon from "../../assests/visible-1.svg";
import unVisibilityIcon from "../../assests/unvisible-1.svg";
import { ACTIONS } from "../../store/actions";

const useStyles = makeStyles({
  grayBox: {
    backgroundColor: `${Colors.grayf9}`,
    padding: "24px 0px 32px 0px",
    minHeight: "calc(100vh - 286px)",
    "@media (max-width: 767px)": {
      padding: "24px 15px 30px 15px",
    },
  },
  gridContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: `${Colors.white}`,
    border: `1px solid ${Colors.gray97}`,
    boxShadow: "none",
    padding: "32px 32px",
    margin: "30px auto 0px auto",
    borderRadius: "4px",
    maxWidth: "calc(565px - 66px)",
    "@media (max-width: 767px)": {
      padding: "32px 20px",
    },
  },
  gridItem: {
    width: "100%",
    marginBottom: "24px",
    position: "relative",
  },
  heading: {
    fontFamily: "Roboto",
    color: "#272727",
    fontSize: "32px",
    fontWeight: "700",
    textAlign: "center",
    padding: "initial",
    margin: "initial",
    "@media (max-width: 991px)": {
      fontSize: "28px",
    },
  },
  visibleicon: {
    width: "20px",
    height: "20px",
    objectFit: "contain",
    position: "absolute",
    right: "15px",
    top: "10px",
    cursor: "pointer",
  },
});

function Signup() {
  const classes = useStyles();
  const history = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState("Password");
  const [showVisibilityIcon, setShowVisibilityIcon] = useState(true);

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [signemail, setSignEmail] = useState("");
  const [signpassword, setSignPassword] = useState("");
  const [signmailError, setSignmailError] = useState(null);
  const [signpasswordError, setSignpasswordError] = useState(null);
  const [fNameError, setFNameError] = useState(null);
  const [lNameError, setLNameError] = useState(null);

  let RegexString =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // useEffect(() => {
  //   const keyDownHandler = (event) => {
  //     console.log("User pressed: ", event.key);

  //     if (event.key === "Enter") {
  //       event.preventDefault();

  //       // ??????? call submit function here

  //       routeChange(event);
  //     }
  //   };

  //   document.addEventListener("keydown", keyDownHandler);

  //   return () => {
  //     document.removeEventListener("keydown", keyDownHandler);
  //   };
  // }, []);

  const enterPressed = (event) => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      //13 is the enter keycode
      //Do stuff in here
      //handleSignIn();
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (
      signpassword !== "" &&
      signemail !== "" &&
      !signmailError &&
      lName !== "" &&
      fName !== ""
    ) {
      let payloadObj = {
        firstname: fName,
        lastname: lName,
        email: signemail,
        password: signpassword,
      };
      register(payloadObj)
        .then((res) => {
          if (!res.data.error) {
            history("/");
          } else {
            toast.error(res.data.message, { toastId: "signin_error" });
          }
        })
        .catch((e) => {
          console.log(e);
        });
      //history("/dashboard");
    } else {
      if (signpassword === "") {
        setSignpasswordError(true);
      }
      if (signemail === "") {
        setSignmailError(true);
      }
      if (lName === "") {
        setLNameError(true);
      }
      if (fName === "") {
        setFNameError(true);
      }
    }
  };

  const routeChange = (e) => {
    e.preventDefault();

    if (signpassword !== "" && signemail !== "" && !signmailError) {
      //   {
      //     "email":"routh.589@gmail.com",
      //     "password":"Sourav@7"
      // }
    }
  };

  const validateEmail = (value) => {
    if (!RegexString.test(value)) {
      setSignmailError(true);
    } else {
      setSignmailError(false);
    }
  };

  return (
    <div className="page-background">
      <LoginHeader />
      <div className={classes.grayBox}>
        <div className="grid-header">
          <div className={classes.heading}>
            Sign in to <span style={{ color: `${Colors.ThemeB}` }}>PLAYO</span>
          </div>
        </div>
        <div></div>
        <div className={classes.gridContainer}>
          <div className={classes.gridItem}>
            <InputLabel
              text={"First Name"}
              color={Colors.nightGray}
              padding={"0 0 8px 0"}
              className={"inputlabel"}
            />
            <Textfield
              placeholder="Enter your first name"
              className={
                fNameError === null
                  ? "textfield"
                  : fNameError === true
                  ? "input-error textfield"
                  : "input-success textfield"
              }
              value={fName}
              onChange={(e) => {
                if (e.target.value === "") {
                  setFNameError(true);
                } else {
                  setFNameError(false);
                }
                setFName(e.target.value);
              }}
              onKeyPress={enterPressed}
            />
            {fNameError && (
              <Error
                className="inputerror"
                text="Enter First name"
                color={Colors.error}
                margin={"4px 0 8px 0"}
              />
            )}
          </div>
          <div className={classes.gridItem}>
            <InputLabel
              text={"Last Name"}
              color={Colors.nightGray}
              padding={"0 0 8px 0"}
              className={"inputlabel"}
            />
            <Textfield
              placeholder="Enter your last name"
              className={
                lNameError === null
                  ? "textfield"
                  : lNameError === true
                  ? "input-error textfield"
                  : "input-success textfield"
              }
              value={lName}
              onChange={(e) => {
                if (e.target.value === "") {
                  setLNameError(true);
                } else {
                  setLNameError(false);
                }
                setLName(e.target.value);
              }}
              onKeyPress={enterPressed}
            />
            {lNameError && (
              <Error
                className="inputerror"
                text="Enter Last name"
                color={Colors.error}
                margin={"4px 0 8px 0"}
              />
            )}
          </div>
          <div className={classes.gridItem}>
            <InputLabel
              text={"Email"}
              color={Colors.nightGray}
              padding={"0 0 8px 0"}
              className={"inputlabel"}
            />
            <Textfield
              placeholder="Enter your Email address"
              className={
                signmailError === null
                  ? "textfield"
                  : signmailError === true
                  ? "input-error textfield"
                  : "input-success textfield"
              }
              value={signemail}
              onChange={(e) => {
                if (e.target.value === "") {
                  setSignmailError(true);
                } else {
                  setSignmailError(false);
                }
                setSignEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              onKeyPress={enterPressed}
              onBlur={(ev) => {
                validateEmail(ev.target.value);
              }}
            />
            {signmailError && (
              <Error
                className="inputerror"
                text="Enter a valid email address"
                color={Colors.error}
                margin={"4px 0 8px 0"}
              />
            )}
          </div>
          <div className={classes.gridItem}>
            <InputLabel
              text="Password"
              color={Colors.nightGray}
              padding={"0px 0 8px 0"}
              className={"inputlabel"}
            />

            <InputWrapper>
              <Textfield
                className={
                  signpasswordError === null
                    ? "textfield"
                    : signpasswordError === true
                    ? "input-error textfield"
                    : "input-success textfield"
                }
                autoComplete="off"
                placeholder="Enter your password"
                type={showPassword}
                padding={"12px 52px 12px 16px"}
                value={signpassword}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setSignPassword(e.target.value);
                    setSignpasswordError(true);
                  } else {
                    setSignPassword(e.target.value);
                    setSignpasswordError(false);
                  }
                }}
                onKeyPress={enterPressed}
              />

              {signpasswordError && (
                <Error
                  className="inputerror"
                  text="Enter your password"
                  color={Colors.error}
                  margin={"4px 0 8px 0"}
                />
              )}

              {!showVisibilityIcon ? (
                <img
                  src={visibilityIcon}
                  className={classes.visibleicon}
                  onClick={() => {
                    setShowVisibilityIcon(!showVisibilityIcon);
                    setShowPassword(
                      showPassword === "Password" ? "text" : "Password"
                    );
                  }}
                  alt="name"
                />
              ) : (
                <img
                  src={unVisibilityIcon}
                  className={classes.visibleicon}
                  onClick={() => {
                    setShowVisibilityIcon(!showVisibilityIcon);
                    setShowPassword(
                      showPassword === "Password" ? "text" : "Password"
                    );
                  }}
                  alt="name"
                />
              )}
            </InputWrapper>
          </div>

          <PButton
            style={{
              width: "170px",
              height: "48px",
              fontSize: "18px",
              margin: "12px 0px 32px",
              color: "#FFFF",
            }}
            color={Colors.ThemeB}
            onClick={handleSignUp}
          >
            Sign up
          </PButton>
        </div>
      </div>
      <LoginFooter />
    </div>
  );
}

export default Signup;
