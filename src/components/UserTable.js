import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import UserInfoDialog from "./UserInfoDialog";
import InputLabel from "@material-ui/core/InputLabel";
import MatchTable from "./MatchTable";
import { matchHistory } from "../utils/api";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    width: "100%",
  },
});

export default function UserTable(props) {
  const classes = useStyles();
  const [dialog, setDialog] = useState(false);
  const [history, setHistory] = useState(false);
  const [row, setRow] = useState(null);
  const [data, setData] = useState(null);
  const handleShowDialog = (row) => {
    setDialog(true);
    setRow(row);
  };

  const handleShowHistory = (row) => {
    console.log(row._id)
    matchHistory(row._id)
      .then((res) => {
        setData(res.data);
        props.setError(null)
        setHistory(true);
      })
      .catch((err) => {
        props.setError("Lấy lịch sử người chơi không thành công");
      });
  };

  return (
    <div>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Gender</StyledTableCell>
            <StyledTableCell>Total Match</StyledTableCell>
            <StyledTableCell>Cup</StyledTableCell>
            <StyledTableCell>Win</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Played Match</StyledTableCell>
            <StyledTableCell align="right">Detail Info</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {props.data &&
            props.data.map((row) => (
              <StyledTableRow key={row.username}>
                <StyledTableCell align="left"> {row.lastname} {row.firstname} </StyledTableCell>
                <StyledTableCell>
                  {row.gender === 0 ? "Nam" : "Nữ"}
                </StyledTableCell>
                <StyledTableCell>{row.totalmatch}</StyledTableCell>
                <StyledTableCell>{row.cup}</StyledTableCell>
                <StyledTableCell>{row.win}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.status ? (
                    <InputLabel
                      id="outlined-error"
                      label="Error"
                      children={"Activated"}
                      variant="outlined"
                    />
                  ) : (
                    <InputLabel
                      error
                      id="outlined-error"
                      label="Error"
                      children={"Blocked"}
                      variant="outlined"
                    />
                  )}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button onClick={() => handleShowHistory(row)}> View </Button>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button onClick={() => handleShowDialog(row)}> View </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      <UserInfoDialog
        open={dialog}
        data={row}
        setOpen={setDialog}
        setError={props.setError}
      />
        <Dialog open={history} onClose={() => setHistory(false)} onBlur={() => setHistory(false)}>
          <MatchTable data={data} />
        </Dialog>
    </div>
  );
}
