import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { block, unblock } from '../utils/api';
import UserInfoDialog from './UserInfoDialog';

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
    width: '100%'
  },
});

export default function UserTable(props) {
    const classes = useStyles();

    const handleClick = ((row) => {
      let promise;
      if (row.status) {
        promise = block(row._id)
      }
      else {
        promise = unblock(row._id)
      }
      promise.then(response => {
        if (response.status < 400){
          console.log(response)
        }
      }).catch(error => {
        props.setError(error.message)
      })
    })  

  return (
    <div>
 <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Username</StyledTableCell>
            <StyledTableCell>Gender</StyledTableCell>
            <StyledTableCell>Total Match</StyledTableCell>
            <StyledTableCell>Cup</StyledTableCell>
            <StyledTableCell>Win</StyledTableCell>
            <StyledTableCell>Detail</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>

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
              <StyledTableCell> 
                <Button onClick={handleClick}>
                  View
                </Button>
              </StyledTableCell>
              <StyledTableCell align="right">
                      { row.status? 'Active' : 'Blocked' }
                </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <UserInfoDialog />
    </div>   
  );
}
