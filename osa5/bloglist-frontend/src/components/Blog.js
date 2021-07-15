import React, { useState } from 'react';

import blogService from '../services/blogs';

const Blog = ({ blog, user, handleBlogLike, handleBlogDelete }) => {
  const [detailVisibility, setDetailVisibility] = useState(false);

  const toggleDetails = () => {
    setDetailVisibility(!detailVisibility);
  };

  const handleLike = () => {
    handleBlogLike({ ...blog });
  };

  const handleBlogDeleteButton = () => {
    if (window.confirm(`Delete ${blog.title}?`)) {
      handleBlogDelete(blog.id);
      blogService.remove(user.token, blog);
    }
  };

  const blogStyle = {
    padding: '1em',
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={toggleDetails}>
        {detailVisibility ? 'Close' : 'View'}
      </button>
      {detailVisibility ? (
        <div>
          <p>
            <a href={blog.url} target="_blank" rel="noreferrer">
              Check out the blog!
            </a>
          </p>
          <p>
            The blog has {blog.likes} likes!{' '}
            <button onClick={handleLike}>Like</button>{' '}
          </p>
          <p>It was added by {blog.user?.name ?? user.name}</p>
          {blog.user?.username === user.username && (
            <div>
              <button onClick={handleBlogDeleteButton}>Delete</button>
            </div>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Blog;
