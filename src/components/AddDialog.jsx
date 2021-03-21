import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { TextField } from '@material-ui/core';
import actions from '../service/timingReconciliation';

function DeleteDialog(props) {
  const { onClose, open } = props;
  const [ driverNo, setDriverNo ] = useState('');

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    actions.addDriver(driverNo);
    onClose();
  };

  return (
    <Dialog
      maxWidth="xs"
      open={open}
    >
      <DialogTitle>Stage</DialogTitle>
      <DialogContent dividers>
        <TextField
          id="outlined-basic"
          label="Number"
          variant="outlined"
          onChange={(e) => setDriverNo(e.target.value)}
          inputProps={{type: 'number'}}/>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleCancel} color="default">
          Back
        </Button>
        <Button variant="contained" onClick={handleOk} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;