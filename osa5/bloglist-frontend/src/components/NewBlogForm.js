import React, { useState } from 'react';
import blogService from '../services/blogs';

export default function NewBlogForm({ user, handleBlogUpdate }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const clearInputs = () => {
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const blogPost = {
      title: title,
      author: author,
      url: url,
    };

    const newBlogPost = await blogService.create(user.token, blogPost);
    console.log(newBlogPost, 'this the new blog post');
    handleBlogUpdate(newBlogPost);

    clearInputs();
  };
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">title</label>
          <input
            id="title"
            type="text"
            onChange={({ target }) => setTitle(target.value)}
            value={title}
          />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input
            id="author"
            type="text"
            onChange={({ target }) => setAuthor(target.value)}
            value={author}
          />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input
            id="url"
            type="text"
            onChange={({ target }) => setUrl(target.value)}
            value={url}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}
