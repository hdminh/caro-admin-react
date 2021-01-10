import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import { block, unblock } from '../utils/api';

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function UserInfoDialog(props) {

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleClick = ((row) => {
    let promise;
    let text;
    if (row.status) {
      promise = block(row._id)
      text = ('Block')
    }
    else {
      promise = unblock(row._id)
      text = ('Unblock')
    }
    promise.then(response => {
      if (response.status < 400){
        console.log(response)
        props.setError(text + ' Success!!!')
        window.location.reload();
        
      }
    }).catch(error => {
      props.setError(error.message)
    })
  })  

  return (
    <div>
      {props.data && <Dialog
        open={props.open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          User Info
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Name: {props.data.firstname} {props.data.lastname}
          </DialogContentText>
          <DialogContentText>
            Register date: {props.data.registerdate}
          </DialogContentText>
          <DialogContentText>
            Email: {props.data.email}
          </DialogContentText>
          <DialogContentText>
            Username: {props.data.username}
          </DialogContentText>
          <DialogContentText>
            Cup: {props.data.cup}
          </DialogContentText>
          <DialogContentText>
            Win: {props.data.win}
          </DialogContentText>
          <DialogContentText>
            Gender: {props.data.gender}
          </DialogContentText>
          <DialogContentText>
            Total match: {props.data.totalmatch}
          </DialogContentText>
          <DialogContentText>
            Avatar: {props.data.avatar}
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
        <Button onClick={() => handleClick(props.data)}>
              { props.data.status? 'Block' : 'Unblock' }
          </Button>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    }
    </div>
  );
}
