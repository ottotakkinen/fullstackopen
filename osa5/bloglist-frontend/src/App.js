import React, { useState, useEffect } from 'react';

import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import NewBlogForm from './components/NewBlogForm';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const savedUser = JSON.parse(window.localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.setItem('user', null);
    setUser(null);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService({ username, password });

      window.localStorage.setItem('user', JSON.stringify(user));

      setUser(user);
      setPassword('');
      setUsername('');
      console.log('Logged in: ', user.name);
    } catch (err) {
      console.log('error: ', err.message);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleBlogUpdate = (newBlog) => {
    setBlogs((prevState) => [...prevState, newBlog]);
  };

  return (
    <React.Fragment>
      {user === null ? (
        <LoginForm
          onSubmit={handleFormSubmit}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          usernameValue={username}
          passwordValue={password}
        />
      ) : (
        <React.Fragment>
          <h2>Blogs</h2>
          <div className="">
            <p>Logged in as {user.name}</p>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <NewBlogForm user={user} handleBlogUpdate={handleBlogUpdate} />
          <BlogList blogs={blogs} user={user.name} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default App;
