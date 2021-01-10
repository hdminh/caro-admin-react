import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
    marginTop: '100px'
  }
});

export default function MatchTable(props) {
    const classes = useStyles();

  return (
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Winner</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell align="right">History</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {props.data && props.data.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell align="left"> {row._id} </StyledTableCell>
              <StyledTableCell >
                {row.winner && row.winner !== '-1'? 
                (row.winner === row.player_1 ? 'Player 1' : 'Player 2') + ' - ' + row.winner 
                : ''}
                </StyledTableCell>
              <StyledTableCell> 
                {row.status === 1? (row.status === 2? 'Playing' : 'Finished'): 'Waiting' }
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button> View </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
  );
}
