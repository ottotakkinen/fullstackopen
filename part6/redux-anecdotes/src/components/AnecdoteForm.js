import React from 'react';
import { connect } from 'react-redux';

import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch();

  const add = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    // dispatch(createAnecdote(content));
    props.createAnecdote(content);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default connect(null, { createAnecdote })(AnecdoteForm);
