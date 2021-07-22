import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

import Notification from './Notification';
import Filter from './Filter';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const sortedAnecdotes = anecdotes.sort((a, b) =>
    a.votes <= b.votes ? 1 : -1
  );
  const sortedAndFilteredAnecdotes = sortedAnecdotes.filter((anec) =>
    anec.content.includes(filter)
  );

  const dispatch = useDispatch();

  const vote = async (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5));
  };
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      {sortedAndFilteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
      {sortedAndFilteredAnecdotes.length === 0 && <p>No anecdotes found.</p>}
    </div>
  );
};

export default AnecdoteList;
