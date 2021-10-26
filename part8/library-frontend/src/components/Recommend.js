import React from 'react';

import { useQuery } from '@apollo/client';

import { ALL_BOOKS } from '../queries/queries';

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

const Recommend = (props) => {
  const books = useQuery(ALL_BOOKS);
  const savedToken = localStorage.getItem('user-token');

  if (!props.show) {
    return null;
  }

  const favoriteGenre = parseJwt(savedToken).favoriteGenre;

  const booksToDisplay = books.data?.allBooks.filter((book) =>
    book.genres.includes(favoriteGenre)
  );

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre</p>
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
    </div>
  );
};

export default Recommend;
