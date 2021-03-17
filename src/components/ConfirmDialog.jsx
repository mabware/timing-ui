import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { TextField } from '@material-ui/core';
import actions from '../service/timingReconciliation';

function DeleteDialog(props) {
  const { onClose, open, driverNo } = props;
  const [ penalty, setPenalty ] = useState(0);

  const handleCancel = () => {
    onClose();
  };

  const handleWrongTest = () => {
    actions.confirmDriver(driverNo, true, 0);
    onClose();
  };

  const handleOk = () => {
    actions.confirmDriver(driverNo, false, penalty);
    onClose();
  };

  return (
    <Dialog
      maxWidth="xs"
      open={open}
    >
      <DialogTitle>Confirm</DialogTitle>
      <DialogContent dividers>
        <TextField
              value={penalty}
              variant="outlined"
              label="Penalty"
              onChange={(e) => setPenalty(e.target.value)}
              inputProps={{
                step: 1,
                min: 0,
                max: 10,
                type: 'number',
              }}
            />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleCancel} color="default">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleWrongTest} color="secondary">
          WT
        </Button>
        <Button variant="contained" onClick={handleOk} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;