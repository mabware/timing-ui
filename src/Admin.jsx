import React from 'react';
import actions from './service/timingReconciliation';
import { Button } from '@material-ui/core';

function Admin() {
  return (
    <Button variant="contained" color="secondary" onClick={actions.reset}>Reset Course</Button>
  );
}

export default Admin;
