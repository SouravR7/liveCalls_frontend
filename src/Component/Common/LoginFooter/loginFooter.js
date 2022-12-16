import React from "react";
import * as FontStyles from "../../../styled-component/FontStyles";
import * as Colors from "../../../styled-component/colors";
import { LabelWrapper, Small } from "../../../styled-component/Labels";
import { makeStyles } from "@mui/styles";

// Importing localised strings
//const strings = require('../../localisation_en.json')

const useStyles = makeStyles({
  footerImgBlock: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 0 0px 0",
    height: "100px",
    "@media(min-width: 1660px)": {
      height: "200px",
    },
  },
  loginLogo: {
    height: "80px",
    width: "180px",
    "@media(min-width: 1660px)": {
      height: "83px",
    },
  },
  loginFooterHolder: {
    height: "50px",
    backgroundColor: `${Colors.Primary}`,
    display: "flex",
    alignTtems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "100%",
    boxSizing: "border-box",
    borderBottom: `5px solid ${Colors.nightGray}`,
    "@media(min-width: 1660px)": {
      height: "60px",
      borderBottom: `8px solid ${Colors.nightGray}`,
    },
    "@media (max-width:767px)": {
      paddingLeft: "5px",
      paddingRight: "5px",
    },
    "@media (max-width:380px)": {
      paddingLeft: "0px",
      paddingRight: "0px",
    },
  },
});

let footerLogo =
  "https://playo-website.gumlet.io/playo-website-v2/Logo+with+Trademark_Filled.png";

function LoginFooter() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.footerImgBlock}>
        <img
          height={60}
          src={footerLogo}
          alt="name"
          className={classes.loginLogo}
        />
      </div>
      <div className={classes.loginFooterHolder}>
        <LabelWrapper justifyContent={"center"}>
          <Small
            text="© 2022 PLAYO"
            width={"auto"}
            color={Colors.white}
            padding={"16px 24px 16px 24px"}
            fontSize={"12px"}
            className={"footer-small"}
          />
          <Small
            text="Terms & Conditions"
            padding={"16px 24px 16px 24px"}
            color={Colors.white}
            theme={FontStyles.small}
            cursor={"pointer"}
            className={"footer-small"}
          />
          <Small
            text="Privacy policy"
            padding={"16px 24px 16px 24px"}
            color={Colors.white}
            theme={FontStyles.small}
            cursor={"pointer"}
            className={"footer-small"}
          />
        </LabelWrapper>
      </div>
    </div>
  );
}

export default LoginFooter;
