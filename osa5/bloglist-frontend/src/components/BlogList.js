import React from 'react';

import Blog from './Blog';

export default function BlogList({ blogs, user }) {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
