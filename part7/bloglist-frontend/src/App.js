import React, { useState, useEffect, useRef } from 'react';

import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

// import blogService from './services/blogs';
import loginService from './services/login';

import { setNotification } from './reducers/notificationReducer';
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  removeBlog,
} from './reducers/blogReducer';

import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const newBlogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
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
    } catch (err) {
      dispatch(setNotification('wrong username or password', true, 5));
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleBlogUpdate = async (newBlog) => {
    try {
      //toggle visibility of newblogform component / the form to create a blog post
      newBlogFormRef.current.toggleVisibility();

      dispatch(createBlog(user.token, newBlog));
      dispatch(
        setNotification(
          `a new blog ${newBlog.title} by ${newBlog.author} added`,
          false,
          5
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleBlogLike = async (blog) => {
    try {
      dispatch(likeBlog(user.token, blog));
    } catch (err) {
      console.log(err);
    }
  };

  const handleBlogDelete = (blog) => {
    dispatch(removeBlog(user.token, blog));
  };

  return (
    <React.Fragment>
      {notification.message && (
        <Notification
          message={notification.message}
          isError={notification.isError}
        />
      )}
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
          <Togglable
            id="togglable-newblogform"
            buttonLabel="Create new blog"
            ref={newBlogFormRef}
          >
            <NewBlogForm handleBlogUpdate={handleBlogUpdate} />
          </Togglable>
          <BlogList
            blogs={blogs}
            user={user}
            handleBlogLike={handleBlogLike}
            handleBlogDelete={handleBlogDelete}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default App;
