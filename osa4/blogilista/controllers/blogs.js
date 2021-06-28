const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const config = require('../utils/config');

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

// blogsRouter.listen(config.PORT, () => {
//   console.log(`Server running on port ${config.PORT}`);
// });

module.exports = blogsRouter;
