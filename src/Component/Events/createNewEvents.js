import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDropzone } from "react-dropzone";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import ScaleLoader from "react-spinners/ScaleLoader";
import { InputLabel, Error } from "../../styled-component/Labels";
import { Textfield, InputWrapper } from "../../styled-component/Inputs";
import * as Colors from "../../styled-component/colors";
import Header from "../Common/Header/header";
import Sidebar from "../Common/Sidebar/sidebar";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getAllEvents, createEvent } from "../../Services/events.services";
import { PButton } from "../Common/Button/button";
import { ACTIONS } from "../../store/actions";
import Post from "../Common/post";

const override = {
  display: "flex",
  alignItems: "center",
  marginLeft: "30px",
  marginTop: "15px",
};
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

function CreateEvent(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useNavigate();

  const [title, setTitle] = useState("");
  const [players, setPlayers] = useState("");
  const [sportsType, setSportsType] = useState("Cricket");
  const [dateError, setDateError] = useState({
    error: false,
    msg: "",
  });
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sports, setSports] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fileData, setFileData] = useState();
  const [previewModal, setPreviewModal] = useState({
    path: false,
    imageData: "",
  });

  const onDrop = useCallback((acceptedFiles) => {
    setFileData(acceptedFiles[0]);
    let reader = new window.FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    console.log(acceptedFiles[0]);
    reader.onload = () => {
      var image = new Image();
      image.src = reader.result;
      image.onload = function () {
        setPreviewModal({
          imageData: reader.result,
          path: acceptedFiles[0],
        });
      };
    };
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  //user data from redux store
  let user_data = useSelector((state) => state.userData.data);
  if (user_data.email === "") {
    user_data = JSON.parse(localStorage.getItem("UsersData"));
  }
  let events_data = useSelector((state) => state.eventData.event_data);

  useEffect(() => {}, []);

  const clearAll = () => {
    setTitle("");
    setPreviewModal({
      show: false,
      imageData: "",
    });
    setPlayers("");
    setSelectedDate(new Date());
    setSports("");
    setSportsType("");
  };

  const handleAddEvent = () => {
    if (
      previewModal.imageData !== "" &&
      title !== "" &&
      description !== "" &&
      selectedDate !== "" &&
      players !== "" &&
      sportsType !== ""
    ) {
      let formData = new FormData();
      formData.append("image", previewModal.path);
      formData.append("title", title);
      formData.append("date", selectedDate);
      formData.append("description", description);
      formData.append("players", players);
      formData.append("organizer_id", user_data.id);
      formData.append("sports_type", sportsType);

      setDisabled(true);
      setLoading(true);
      createEvent(formData)
        .then((res) => {
          setLoading(false);
          setDisabled(false);
          if (!res.data.error) {
            clearAll();
            toast.success("event created sucessfully", {
              toastId: "create_events_sucess",
            });
          } else {
            toast.error(res.data.message, { toastId: "create_events_error" });
          }
        })
        .catch((err) => {
          toast.error(err.message, { toastId: "create_events_error" });
        });
    } else {
      alert("Please Enter all details");
    }
  };

  return (
    <div className="main-app-grid">
      <Sidebar />
      <Header />
      <div className={classes.mainMidContainer}>
        <div className={classes.homepageHolder}>
          <div className={classes.container}>
            <div className={classes.gridContainer}>
              <div className={classes.imgContainer}>
                <img
                  src={previewModal.imageData}
                  className={classes.imgContainer}
                />
              </div>
              <div className={classes.dropContainer}>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <div>
                      <div>{props.children}</div>
                      <p>Drop image here.</p>
                    </div>
                  ) : (
                    <div>
                      <div>{props.children}</div>
                      <p>Drop image here, or click to select an image.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Title"
                type="Title"
                style={{ width: "40%" }}
                onChange={(event) => setTitle(event.target.value)}
              /> */}

            <div className={classes.gridItem}>
              <InputLabel
                text={"Title"}
                color={Colors.nightGray}
                padding={"0 0 8px 0"}
              />
              <Textfield
                placeholder="Enter Title"
                className={classes.inputLabel}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className={classes.gridItem}>
              <InputLabel
                text={"No of Playes"}
                color={Colors.nightGray}
                padding={"0 0 8px 0"}
              />
              <Textfield
                placeholder="Enter No of Playes , Eg: 10"
                className={classes.inputLabel}
                value={players}
                onChange={(e) => {
                  setPlayers(e.target.value);
                }}
                //   onKeyPress={enterPressed}
                //   onBlur={(ev) => {
                //     validateEmail(ev.target.value);
                //   }}
              />
            </div>

            <div style={{ marginTop: "20px" }}>
              <InputLabel
                text={"Event date"}
                color={Colors.nightGray}
                padding={"0 0 8px 0"}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  value={selectedDate}
                  minDate={new Date()}
                  onChange={(newValue) => {
                    console.log(newValue);
                    setSelectedDate(new Date(newValue.$d).toLocaleDateString());
                  }}
                  onError={(reason, value) => {
                    console.log(reason, value);
                    switch (reason) {
                      case "invalidDate":
                        setDateError({
                          error: true,
                          msg: "Invalid Date",
                        });
                        break;

                      case "disablePast":
                        setDateError({
                          error: true,
                          msg: "Values in the past are not allowed",
                        });

                        break;

                      case "minDate":
                        setDateError({
                          error: true,
                          msg: `Date should not be before current date`,
                        });

                        break;

                      default:
                        setDateError({
                          error: false,
                          msg: ``,
                        });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      helperText={dateError ? dateError.msg : undefined}
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
              {console.log(selectedDate)}
            </div>
            <FormControl
              sx={{ m: 1, minWidth: 250, marginLeft: "0px", marginTop: "15px" }}
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
                input={<OutlinedInput />}
                value={sportsType}
                label="Age"
                inputProps={{ "aria-label": "Without label" }}
                onChange={(e) => setSportsType(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Cricket">Cricket</MenuItem>
                <MenuItem value="Football">Football</MenuItem>
                <MenuItem value="Vollyball">Vollyball</MenuItem>
                <MenuItem value="Running">Running</MenuItem>
              </Select>
            </FormControl>

            <div style={{ display: "flex" }}>
              <TextareaAutosize
                maxRows={100}
                aria-label="maximum height"
                placeholder="Description"
                style={{ height: "150px", width: "80%", marginTop: "20px" }}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <PButton
                style={{
                  width: "170px",
                  height: "48px",
                  fontSize: "18px",
                  margin: "12px 0px 32px",
                  color: "#FFFF",
                }}
                disabled={disabled}
                color={Colors.ThemeB}
                onClick={handleAddEvent}
              >
                Add new event
              </PButton>

              {loading && (
                <ScaleLoader
                  color={"#000"}
                  loading={loading}
                  cssOverride={override}
                  size={50}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
