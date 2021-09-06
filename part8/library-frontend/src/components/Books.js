import React, { useEffect, useState } from 'react';

import { useQuery } from '@apollo/client';

import { ALL_BOOKS } from '../queries/queries';

const Books = (props) => {
  const books = useQuery(ALL_BOOKS);
  const [filter, setFilter] = useState('');

  useEffect(() => {}, []);

  if (!props.show) {
    return null;
  }

  if (books.loading) {
    return <p>Loading...</p>;
  }

  const booksToDisplay = books.data?.allBooks.filter((book) => {
    if (!filter) {
      return true;
    } else {
      return book.genres.includes(filter);
    }
  });

  const genres = books.data?.allBooks.map((book) => book.genres).flat();

  const uniqueGenres = [...new Set(genres)];

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToDisplay.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {uniqueGenres.map((genre) => (
        <button key={genre} onClick={(e) => setFilter(e.target.innerText)}>
          {genre}
        </button>
      ))}
      <button
        onClick={() => {
          setFilter('');
        }}
      >
        all genres
      </button>
    </div>
  );
};

export default Books;
