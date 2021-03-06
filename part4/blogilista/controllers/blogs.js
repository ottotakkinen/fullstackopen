const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  if (request.body.title === undefined || request.body.url === undefined) {
    return response.status(400).end();
  }
  if (!request.token || !request.user) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(request.user);

  const blog = new Blog({
    author: request.body.author,
    title: request.body.title,
    url: request.body.url,
    likes: request.body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  const populatedBlog = await Blog.findById(savedBlog._id).populate('user', {
    username: 1,
    name: 1,
  });
  response.status(201).json(populatedBlog.toJSON());
});

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(400).end();
    }

    if (blog.user.toString() === request.user) {
      await Blog.findByIdAndRemove(blog.id);
      response.status(204).end();
    } else {
      return response.status(401).json({ error: 'token missing or invalid' });
    }
  }
);

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const blog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate('user', { username: 1, name: 1 });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
