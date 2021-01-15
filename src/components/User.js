import React, { useEffect, useState } from "react";
import { getAllUser, search } from "../utils/api";
import { makeStyles } from "@material-ui/core/styles";
import UserTable from "./UserTable";
import { Button, TextField } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  search: {
    display: "flex",
    width: "100%",
  },
  input: {
    width: "500px",
  },
  text: {
    alignContent: "center",
  },
}));

export default function User(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = () => {
    setLoading(true);
    getAllUser()
      .then((response) => {
        setLoading(false);
        if (response.status < 400) {
          console.log("data", response.data);
          setData(response.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
        props.setError(error.message);
      });
  };

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = () => {
    if (inputText) {
      search(inputText)
        .then((res) => {
          console.log("search", res.data);

          setData(res.data);
          console.log("data search", data);
        })
        .catch((error) => {
          props.setError(error.message);
        });
    }
  };

  return (
    <TableContainer component={Paper}>
      {loading && (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Table>
        <TableBody>
          <TableRow className={classes.search}>
            <TableCell>
              <TextField
                className={classes.input}
                id="outlined-basic"
                label="Search"
                variant="outlined"
                value={inputText}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <UserTable setError={props.setError} data={data} setData={setData} />
    </TableContainer>
  );
}
