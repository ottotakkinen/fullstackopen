const initialState = { message: '', isError: false };

let timeout;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { message: action.data.message, isError: action.data.isError };
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
};

export const setNotification = (message, isError, seconds) => {
  console.log('trying to set a notification');
  return (dispatch) => {
    dispatch({ type: 'SET_NOTIFICATION', data: { message, isError } });
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch({ type: 'CLEAR' });
    }, seconds * 1000);
  };
};

export default reducer;
