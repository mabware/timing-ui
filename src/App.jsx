import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography, Chip, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import socketIOClient from "socket.io-client";
import Admin from './Admin';
import DeleteDialog from './components/DeleteDialog';
import AddDialog from './components/AddDialog';
import ConfirmDialog from './components/ConfirmDialog';
import actions from './service/timingReconciliation';
import autosolo from './service/autosolo';
import './App.css';

const { REACT_APP_RECONCILIATION_API } = process.env;

const useStyles = makeStyles((theme) => createStyles({
  padding: {
    padding: theme.spacing(1),
  },
  select: {
    minWidth: 120,
  }
}));

function App() {
  const classes = useStyles();
  const { data } = useQuery('state', () => actions.getState());
  const events = useQuery('events', () => autosolo.getEvents());
  const [selectedDriver, setSelectedDriver] = useState();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});

  const queryClient = useQueryClient()
 
  const clickDriver = (d, finished) => {
    setSelectedDriver(d);
    finished ? setConfirmDialogOpen(true) : setDeleteDialogOpen(true);
  } 
  const renderDriver = d => <Chip label={d} onClick={() => clickDriver(d, false)} variant="outlined" />
  const renderFinishedDriver = d => <Chip label={d} onClick={() => clickDriver(d, true)} variant="outlined" />

  useEffect(() => {
    const socket = socketIOClient(REACT_APP_RECONCILIATION_API);
    socket.on("stateUpdate", () => {
      queryClient.invalidateQueries('state')
    });
  }, [queryClient]);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/">
            <div className={classes.padding}>
              <FormControl margin="dense" variant="outlined" className={classes.select}>
                <InputLabel>Event</InputLabel>
                <Select
                  value={selectedEvent}
                  onChange={e => setSelectedEvent(e.target.value)}
                  label="Event"
                >
                  {events.data && events.data.map(event => (
                    <MenuItem value={event.id}>
                      {event.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className={classes.padding}>
              <Button variant="contained" color="primary" onClick={() => setAddDialogOpen(true)} >Stage Car</Button>
            </div>

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
            <DeleteDialog open={deleteDialogOpen} driverNo={selectedDriver} onClose={() => setDeleteDialogOpen(false)} eventId={selectedEvent}/>
            <AddDialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} eventId={selectedEvent}/>
            <ConfirmDialog open={confirmDialogOpen} driverNo={selectedDriver} onClose={() => setConfirmDialogOpen(false)} eventId={selectedEvent}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
