import React, { useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import LoginForm from './components/LoginForm';
import NewBook from './components/NewBook';
import Recommend from './components/Recommend';

import { BOOK_ADDED } from './queries/queries';

import { useSubscription } from '@apollo/client';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('user-token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData);
      window.alert(
        `Got a book from subscription! It's title is ${subscriptionData.data.bookAdded.title}.`
      );
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.removeItem('user-token');
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && (
          <button onClick={() => setPage('recommend')}>recommend</button>
        )}
        {token && <button onClick={logout}>logout</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Recommend show={page === 'recommend'} />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
