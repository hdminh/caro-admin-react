import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Redirect } from "react-router-dom";
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
    width: "100%"
  },
});


export default function MatchTable(props) {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const [id, setId] = useState("");

  const handleClick = (row) => {
    setId(row._id)
    setRedirect(true)
  };
  

  return (
    <div>
      {redirect ? (
        <Redirect to={"/detail/" + id} />
      ) : (
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Winner</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Số nước đi</StyledTableCell>
              <StyledTableCell>Tin nhắn</StyledTableCell>
              <StyledTableCell align="right">History</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {props.data &&
              props.data.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell align="left"> {row._id} </StyledTableCell>
                  <StyledTableCell>
                    {row.winner && row.winner !== "-1"
                      ? (row.winner === row.player_1
                          ? "Player 1"
                          : "Player 2") +
                        " - " +
                        row.winner
                      : ""}
                  </StyledTableCell>
                  <StyledTableCell>
                    {row.status === 1
                      ? row.status === 2
                        ? "Playing"
                        : "Finished"
                      : "Waiting"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {row.history.length}
                  </StyledTableCell>
                  <StyledTableCell>
                    {row.chat.length}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button onClick={() => handleClick(row)}> View </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
