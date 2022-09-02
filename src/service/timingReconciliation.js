const { REACT_APP_RECONCILIATION_API } = process.env;

const getState = async () => {
  const res = await fetch(`${REACT_APP_RECONCILIATION_API}/currentState/`);
  return await res.json();
}

const deleteDriver = async (id) => {
  await fetch(`${REACT_APP_RECONCILIATION_API}/driver/${id}`, {
    method: 'DELETE',
  });
  return;
}

const addDriver = async (id) => {
  await fetch(`${REACT_APP_RECONCILIATION_API}/stage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id }),
  });
  return;
}

const getDriver = async (id) => {
  if(id) {
    const res = await fetch(`${REACT_APP_RECONCILIATION_API}/driver/${id}`);
    return await res.json();
  }
  return undefined
}

const confirmDriver = async (id, wrongTest, penalty) => {
  await fetch(`${REACT_APP_RECONCILIATION_API}/confirm`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, wrongTest, penalty }),
  });
  return;
}

const ignoreFinish = async (id) => {
  await fetch(`${REACT_APP_RECONCILIATION_API}/cancelFinish`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id }),
  });
  return;
}

const reset = async () => {
  await fetch(`${REACT_APP_RECONCILIATION_API}/reset`, {
    method: 'POST',
  });
  return;
}

const actions = {
  getState,
  addDriver,
  getDriver,
  deleteDriver,
  confirmDriver,
  ignoreFinish,
  reset,
}

export default actions;