import anecdoteService from '../services/anecdotes';

const reducer = (state = [], action) => {
  // console.log('state now: ', state);
  // console.log('action', action);

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id;
      const votedAnecdote = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );

    case 'NEW_ANECDOTE':
      return [...state, action.data];

    case 'INIT_ANECDOTES':
      return action.data;

    default:
      return state;
  }
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.vote(anecdote);
    dispatch({ type: 'VOTE', data: votedAnecdote });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({ type: 'INIT_ANECDOTES', data: anecdotes });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({ type: 'NEW_ANECDOTE', data: newAnecdote });
  };
};

export default reducer;
