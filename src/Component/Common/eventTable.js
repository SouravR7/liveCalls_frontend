import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  tableBody: {
    "& th": {
      padding: "10px !important",
    },
  },
});

export default function EventTable(props) {
  const classes = useStyles();
  const table_data = props.tableData;
  return (
    <TableContainer component={Paper} style={{ minHeight: "500px" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Date</TableCell>

            <TableCell>Sports type</TableCell>
            <TableCell>No of Players</TableCell>

            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.tableBody}>
          {table_data.length > 0 &&
            table_data.map((row) => (
              <TableRow
                key={row.UID}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  <div
                    style={{
                      padding: "5px 0px",
                    }}
                  >
                    <img
                      src={row.image}
                      alt="event_image"
                      height="74"
                      width="110"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    style={{
                      padding: "5px 0px",
                    }}
                  >
                    {row.title}
                  </div>
                </TableCell>
                <TableCell>{new Date(row.date).toDateString()}</TableCell>
                <TableCell>{row.sports_type}</TableCell>
                <TableCell>{row.players}</TableCell>
                <TableCell>
                  <Link to="/eventDetails" state={{ event: row }}>
                    <div
                      style={{
                        color: "#13327c",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {/* <Tooltip title="View page">
                      <IconButton
                        style={{ color: "#000" }}
                        //onClick={() => handleEdit(row)}
                      > */}
                      <VisibilityIcon />
                      view
                      {/* </IconButton>
                    </Tooltip> */}
                    </div>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
