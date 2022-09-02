import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Button, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { TextField } from '@material-ui/core';
import actions from '../service/timingReconciliation';
import autosolo from '../service/autosolo';

function AddDialog(props) {
  const { onClose, open, eventId } = props;
  const drivers = useQuery(['drivers', eventId], () => autosolo.getDrivers(eventId));
  const [ driver, setDriver ] = useState({});

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    actions.addDriver(driver.number);
    onClose();
  };

  const handleChange = (e, v) => {
    setDriver(v)
  };

  return (
    <Dialog
      maxWidth="xs"
      open={open}
    >
      <DialogTitle>Stage</DialogTitle>
      <DialogContent dividers>
        <Autocomplete
          id="combo-box-demo"
          options={drivers.data}
          getOptionLabel={(option) => option.number}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} label="Driver Number" variant="outlined" />}
        />
        <Typography>
          {driver.number ? driver.name : 'Select Driver'}
        </Typography>
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

export default AddDialog;