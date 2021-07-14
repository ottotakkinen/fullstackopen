import React from 'react';

export default function LoginForm({
  onSubmit,
  usernameValue,
  handleUsernameChange,
  passwordValue,
  handlePasswordChange,
}) {
  return (
    <form onSubmit={onSubmit}>
      <h2>Login</h2>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={usernameValue}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={passwordValue}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
