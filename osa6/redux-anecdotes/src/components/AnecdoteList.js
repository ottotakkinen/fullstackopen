import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer';

import Notification from './Notification';
import Filter from './Filter';

let timeout;

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

  const resetNotification = () => {
    dispatch(clearNotification());
  };

  const vote = (id) => {
    clearTimeout(timeout);
    dispatch(voteAnecdote(id));
    const votedAnecdote = anecdotes.find((a) => a.id === id);
    dispatch(setNotification(`you voted '${votedAnecdote.content}'`));
    timeout = setTimeout(resetNotification, 5000);
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      {sortedAndFilteredAnecdotes.length === 0 && <p>No anecdotes found.</p>}
    </div>
  );
};

export default AnecdoteList;
