import React, { useState, useEffect, useRef } from 'react';

import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import blogService from './services/blogs';
import loginService from './services/login';

const initialNotification = {
  error: false,
  message: '',
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(initialNotification);

  const newBlogFormRef = useRef();

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
      setNotification({
        error: true,
        message: 'wrong username or password',
      });
      setTimeout(() => setNotification(initialNotification), 4000);
      console.log('error: ', err.message);
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
      setNotification({
        error: false,
        message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
      });

      //toggle visibility of newblogform component / the form to create a blog post
      newBlogFormRef.current.toggleVisibility();

      setTimeout(() => setNotification(initialNotification), 4000);
      setBlogs((prevState) => [...prevState, newBlog]);

      await blogService.create(user.token, newBlog);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBlogLike = async (newBlog) => {
    try {
      const updatedBlogs = blogs.map((blog) =>
        blog.id === newBlog.id ? { ...blog, likes: blog.likes + 1 } : blog
      );
      setBlogs(updatedBlogs);

      await blogService.like(user.token, newBlog);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBlogDelete = (deletedBlogId) => {
    console.log(deletedBlogId);
    const updatedBlogs = [...blogs].filter((blog) => {
      return blog.id !== deletedBlogId;
    });
    setBlogs(updatedBlogs);
  };

  return (
    <React.Fragment>
      {notification.message && (
        <Notification
          error={notification.error}
          message={notification.message}
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
