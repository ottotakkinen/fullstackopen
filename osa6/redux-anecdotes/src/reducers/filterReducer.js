const initialState = '';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.data;
    default:
      return state;
  }
};

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    data: filter,
  };
};

// export const clearNotification = () => {
//   return {
//     type: 'CLEAR',
//     data: {},
//   };
// };

export default reducer;
