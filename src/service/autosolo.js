const { REACT_APP_AUTOSOLO_API } = process.env

async function getEvents() {
  const response = await fetch(`${REACT_APP_AUTOSOLO_API}/events`);
  const data = await response.json();
  return data.map(event => ({ ...event, date: new Date(event.date) }));
}

async function getDrivers(eventId) {
  const response = await fetch(`${REACT_APP_AUTOSOLO_API}/events/${eventId}/drivers`);
  const data = await response.json();
  return data;
}

export default {
  getEvents,
  getDrivers,
};
