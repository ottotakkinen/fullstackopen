import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { ALL_AUTHORS, EDIT_BORN, ALL_BOOKS } from '../queries/queries';

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS);
  const [updateBorn] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  });
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  if (!props.show) {
    return null;
  }

  if (authors.loading) {
    return <p>Loading...</p>;
  }

  const submit = (e) => {
    e.preventDefault();

    updateBorn({ variables: { name, born } });

    setName('');
    setBorn('');
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {authors.data.allAuthors.map((a) => (
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(+target.value)}
          />
        </div>
        <button>update author</button>
      </form>
    </div>
  );
};

export default Authors;
