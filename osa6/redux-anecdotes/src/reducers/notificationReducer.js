const initialState = { message: '', show: false };

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
    setTimeout(() => {
      dispatch({ type: 'CLEAR' });
    }, seconds * 1000);
  };
};

// export const setNotification = (message) => {
//   return {
//     type: 'SHOW',
//     data: message,
//   };
// };

// export const clearNotification = () => {
//   return {
//     type: 'CLEAR',
//     data: {},
//   };
// };

export default reducer;
