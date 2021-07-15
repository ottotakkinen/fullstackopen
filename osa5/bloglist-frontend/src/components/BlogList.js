import React from 'react';

import Blog from './Blog';

// let timeout;

export default function BlogList({
  blogs,
  user,
  handleBlogLike,
  handleBlogDelete,
}) {
  const sortedBlogs = blogs.sort((a, b) => (a.likes <= b.likes ? 1 : -1));

  return (
    <div>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleBlogLike={handleBlogLike}
          handleBlogDelete={handleBlogDelete}
        />
      ))}
    </div>
  );
}
