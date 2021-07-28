const initialState = { message: '', show: false };

let timeout;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW':
      return { message: action.data, show: true };
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
};

export const setNotification = (message, seconds) => {
  return (dispatch) => {
    dispatch({ type: 'SHOW', data: message });
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch({ type: 'CLEAR' });
    }, seconds * 1000);
  };
};

export default reducer;
