const { REACT_APP_RECONCILIATION_URL } = process.env;

const getState = async () => {
  const res = await fetch(`${REACT_APP_RECONCILIATION_URL}/currentState/`);
  return await res.json();
}

const deleteDriver = async (id) => {
  await fetch(`${REACT_APP_RECONCILIATION_URL}/driver/${id}`, {
    method: 'DELETE',
  });
  return;
}

const addDriver = async (id) => {
  await fetch(`${REACT_APP_RECONCILIATION_URL}/stage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id }),
  });
  return;
}

const confirmDriver = async (id, wrongTest, penalty) => {
  await fetch(`${REACT_APP_RECONCILIATION_URL}/confirm`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, wrongTest, penalty }),
  });
  return;
}

const reset = async () => {
  await fetch(`${REACT_APP_RECONCILIATION_URL}/reset`, {
    method: 'POST',
  });
  return;
}

const actions = {
  getState,
  addDriver,
  deleteDriver,
  confirmDriver,
  reset,
}

export default actions;