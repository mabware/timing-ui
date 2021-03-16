import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import actions from './service/timingReconciliation';
import { Typography, Chip, Button } from '@material-ui/core';
import socketIOClient from "socket.io-client";
import DeleteDialog from './components/DeleteDialog';
import AddDialog from './components/AddDialog';
import ConfirmDialog from './components/ConfirmDialog';
import './App.css';

const { REACT_APP_RECONCILIATION_URL } = process.env;


function App() {
  const { data } = useQuery('state', () => actions.getState());
  const [selectedDriver, setSelectedDriver] = useState();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const queryClient = useQueryClient()
 
  const clickDriver = (d, finished) => {
    setSelectedDriver(d);
    finished ? setConfirmDialogOpen(true) : setDeleteDialogOpen(true);
  } 
  const renderDriver = d => <Chip label={d} onClick={() => clickDriver(d, false)} variant="outlined" />
  const renderFinishedDriver = d => <Chip label={d} onClick={() => clickDriver(d, true)} variant="outlined" />

  useEffect(() => {
    const socket = socketIOClient(REACT_APP_RECONCILIATION_URL);
    socket.on("stateUpdate", () => {
      queryClient.invalidateQueries('state')
    });
  }, [queryClient]);

  return (
    <>
      <div className="App">
        <Button variant="contained" color="primary" onClick={() => setAddDialogOpen(true)} >Stage Car</Button>
        <Typography variant="subtitle1">STAGED</Typography>
        <div style={{minHeight: '32px'}}>
          {data && data.staged.map(renderDriver)}
        </div>
        <Typography variant="subtitle1">RUNNING</Typography>
        <div style={{minHeight: '32px'}}>
          {data && data.running.map(renderDriver)}
        </div>
        <Typography variant="subtitle1">FINISHED</Typography>
        <div style={{minHeight: '32px'}}>
          {data && data.finished.map(renderFinishedDriver)}
        </div>
        <Button variant="contained" color="secondary" onClick={actions.reset}>Reset Course</Button>
      </div>
      <DeleteDialog open={deleteDialogOpen} driverNo={selectedDriver} onClose={() => setDeleteDialogOpen(false)}/>
      <AddDialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}/>
      <ConfirmDialog open={confirmDialogOpen} driverNo={selectedDriver} onClose={() => setConfirmDialogOpen(false)}/>
    </>
  );
}

export default App;
