import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    width: '100%',
    marginTop: '30px'
  },
});

export default function UserTable(props) {
    const classes = useStyles();

    const handleBlock = (row) => {

    }

    const handleUnblock = (row) => {

    }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Username</StyledTableCell>
            <StyledTableCell>Gender</StyledTableCell>
            <StyledTableCell>Total Match</StyledTableCell>
            <StyledTableCell>Cup</StyledTableCell>
            <StyledTableCell>Win</StyledTableCell>
            <StyledTableCell align="right">Block</StyledTableCell>

          </TableRow>
        </TableHead>

        <TableBody>
          {props.data && props.data.map((row) => (
            <StyledTableRow key={row.username}>
              <StyledTableCell align="left"> {row.username} </StyledTableCell>
              <StyledTableCell >{row.gender === 0? 'Nam' : 'Nu'}</StyledTableCell>
              <StyledTableCell >{row.totalmatch}</StyledTableCell>
              <StyledTableCell >{row.cup}</StyledTableCell>
              <StyledTableCell >{row.win}</StyledTableCell>
              <StyledTableCell align="right">
                    <Button onClick={handleBlock(row)}>Block</Button>
                    <Button onClick={handleUnblock(row)}>Unblock</Button>
                </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
