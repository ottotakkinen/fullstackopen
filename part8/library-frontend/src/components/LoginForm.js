import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { LOGIN } from '../queries/queries';

const LoginForm = ({ setToken, show, setPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('user-token', token);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  const submit = (e) => {
    e.preventDefault();

    login({ variables: { username, password } });
    setPage('authors');
  };

  if (!show) {
    return null;
  }

  return (
    <React.Fragment>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="username">username</label>
          <input
            id="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>Login</button>
      </form>
    </React.Fragment>
  );
};

export default LoginForm;
