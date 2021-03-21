import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Button, DialogTitle, DialogContent, DialogActions, Dialog, Typography, CircularProgress } from '@material-ui/core';
import { useQuery } from 'react-query';
import actions from '../service/timingReconciliation';

const useStyles = makeStyles((theme) => createStyles({
  button: {
    margin: theme.spacing(1),
  },
  warnButton: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.warning.main,
    '&:hover': {
      backgroundColor: theme.palette.warning.light,
      color: '#FFF'
    }
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

function DeleteDialog(props) {
  const { onClose, open, driverNo } = props;
  const classes = useStyles();
  const { data, isLoading } = useQuery(['driver', driverNo], () => actions.getDriver(driverNo));

  const handleCancel = () => {
    onClose();
  };

  const handleWrongTest = () => {
    actions.confirmDriver(driverNo, true, 0);
    onClose();
  };

  const handleDelete = () => {
    actions.deleteDriver(driverNo);
    onClose();
  };

  const handleIgnoreFinish = () => {
    actions.ignoreFinish(driverNo);
    onClose();
  };
  
  const handleFinish = (penalty) => {
    actions.confirmDriver(driverNo, false, penalty);
    onClose();
  };

  return (
    <Dialog
      maxWidth="xs"
      open={open}
    >
      <DialogTitle>Confirm</DialogTitle>
      <DialogContent className={classes.column} dividers>
        <Typography align="center">
          { isLoading && <CircularProgress /> }
          { !isLoading && data && `Time: ${data.time.toFixed(2)}s`}
        </Typography>
        <Button className={classes.button} variant="contained" onClick={() => handleFinish(0)} color="primary">
          Clean Run
        </Button>
        <div className={classes.row}>
          <Button className={classes.warnButton} variant="contained" onClick={() => handleFinish(1)} color="primary">
            1 Cone
          </Button>
          <Button className={classes.warnButton} variant="contained" onClick={() => handleFinish(2)} color="primary">
            2 Cone
          </Button>
        </div>
        <div className={classes.row}>
          <Button className={classes.warnButton} variant="contained" onClick={() => handleFinish(3)} color="primary">
            3 Cone
          </Button>
          <Button className={classes.warnButton} variant="contained" onClick={() => handleFinish(4)} color="primary">
            4 Cone
          </Button>
        </div>
        <div className={classes.row}>
          <Button className={classes.warnButton} variant="contained" onClick={() => handleFinish(5)} color="primary">
            5 Cone
          </Button>
          <Button className={classes.warnButton} variant="contained" onClick={() => handleFinish(6)} color="primary">
            6 Cone
          </Button>
        </div>
        <Button className={classes.button} variant="contained" onClick={handleWrongTest} color="secondary">
          WT
        </Button>
        <Button className={classes.button} variant="contained" onClick={handleIgnoreFinish} color="primary">
          Ignore Finish
        </Button>
        <Button className={classes.button} variant="contained" onClick={handleDelete} color="primary">
          Cancel Run
        </Button>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleCancel} color="default">
          Back
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;