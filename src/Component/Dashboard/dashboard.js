import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

import * as Colors from "../../styled-component/colors";
import { InputLabel, Error } from "../../styled-component/Labels";
import Header from "../Common/Header/header";
import Sidebar from "../Common/Sidebar/sidebar";
import { getAllEvents } from "../../Services/events.services";
import { getAppliedEvent } from "../../Services/auth";
import { PButton } from "../Common/Button/button";
import { ACTIONS } from "../../store/actions";
import Post from "../Common/post";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    border: `1px solid ${Colors.gray97}`,
    borderRadius: "5px",
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const useStyles = makeStyles({
  mainMidContainer: {
    padding: "110px 24px 0 216px",

    "@media (max-width: 991px)": {
      padding: "110px 15px 0",
    },
  },

  homepageHolder: {
    paddingBottom: "80px",
    background: "#fafafa",
    minHeight: "500px",
  },

  gridContainer: {
    padding: "0px 45px",
    "@media (max-width: 991px)": {
      padding: "0px 30px",
    },
  },
  toolbar: {
    marginTop: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "25px 60px",
  },
});

function Dashboard(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useNavigate();

  const [filter, setFilter] = useState("");
  const [searched, setSearched] = useState("");

  //user data from redux store
  let user_data = useSelector((state) => state.userData.data);
  if (user_data.email === "") {
    user_data = JSON.parse(localStorage.getItem("UsersData"));
  }
  let events_data = useSelector((state) => state.eventData.event_data);
  console.log(events_data);

  const getEvents = () => {
    getAllEvents().then((res) => {
      if (!res.data.error) {
        dispatch({
          type: ACTIONS.GET_ALL_EVENTS,
          payload: res.data.data,
        });
      }
    });
  };

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
    getEvents();
    appliedEvents();
  }, []);

  const handleFilter = (e) => {
    setFilter(e.target.value);
    dispatch({
      type: ACTIONS.GET_FILTERED_EVENTS,
      payload: e.target.value,
    });
  };

  const handleSearch = (e) => {
    setSearched(e.target.value);
    dispatch({
      type: ACTIONS.GET_SEARCHED_EVENTS,
      payload: e.target.value,
    });
  };

  return (
    <div className="main-app-grid">
      <Sidebar />
      <Header />
      <div className={classes.mainMidContainer}>
        <div className={classes.homepageHolder}>
          <div className={classes.toolbar}>
            <div className={classes.filter}>
              <FormControl
                sx={{
                  m: 1,
                  width: 250,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: "0px",
                  marginTop: "15px",
                }}
                size="small"
              >
                <InputLabel
                  text={"Sports Type"}
                  color={Colors.nightGray}
                  padding={"0 0 8px 0"}
                />
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  style={{ minWidth: "160px", marginLeft: "10px" }}
                  input={<OutlinedInput />}
                  value={filter}
                  label="Age"
                  inputProps={{
                    "aria-label": "Without label",
                  }}
                  onChange={handleFilter}
                >
                  <MenuItem value="none">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Cricket">Cricket</MenuItem>
                  <MenuItem value="Football">Football</MenuItem>
                  <MenuItem value="Vollyball">Vollyball</MenuItem>
                  <MenuItem value="Running">Running</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={classes.search}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={searched}
                  onChange={handleSearch}
                />
              </Search>
            </div>
          </div>
          <Grid container spacing={2} className={classes.gridContainer}>
            {events_data.length > 0
              ? events_data.map((item, index) => {
                  return <Post key={index} post={item} />;
                })
              : "NO data found"}
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
