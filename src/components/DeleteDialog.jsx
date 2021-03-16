import React from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { Typography } from '@material-ui/core';
import actions from '../service/timingReconciliation';

function DeleteDialog(props) {
  const { onClose, open, driverNo } = props;

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    actions.deleteDriver(driverNo);
    onClose();
  };

  return (
    <Dialog
      maxWidth="xs"
      open={open}
    >
      <DialogTitle>Delete</DialogTitle>
      <DialogContent dividers>
        <Typography>
          Delete Driver {driverNo}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleCancel} color="default">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleOk} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;