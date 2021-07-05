const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const initialBlogs = [
  {
    title: 'test blog 1',
    author: 'Otto T. Akkinen',
    url: 'test.fi',
    likes: 5,
  },
  {
    title: 'test blog 2',
    author: 'Otto K. Akkinen',
    url: 'test.fi/2',
    likes: 1,
  },
];

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('testi', 10);

  const user = new User({
    username: 'test',
    name: 'testi jäbä',
    passwordHash,
  });

  await user.save();

  await Blog.deleteMany({});
  let blogObject = new Blog({ ...initialBlogs[0], user: user.id });
  await blogObject.save();
  blogObject = new Blog({ ...initialBlogs[1], user: user.id });
  await blogObject.save();
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('blog identifier is named id', async () => {
  const res = await api.get('/api/blogs');

  expect(res.body[0].id).toBeDefined();
});

describe('post or delete with token', () => {
  let testToken;

  beforeEach(async () => {
    const loginUser = {
      username: 'test',
      password: 'testi',
    };

    testToken = (await api.post('/api/login').send(loginUser)).body.token;
  });

  test('blogs.length is one more than initial after adding a blog', async () => {
    const newBlog = {
      author: 'nönnöönöö',
      title: 'test',
      url: 'test',
      likes: 0,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${testToken}`)
      .send(newBlog);

    const res = await api.get('/api/blogs');

    expect(res.body.length).toBe(initialBlogs.length + 1);
  });

  test('likes defaults to 0', async () => {
    const newBlog = {
      author: 'nönnöönöö',
      title: 'test',
      url: 'test',
    };
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${testToken}`)
      .send(newBlog);

    const res = await api.get('/api/blogs');

    const newestBlog = res.body[res.body.length - 1];

    expect(newestBlog.likes).toBe(0);
  });

  test('post without title returns 400 Bad Request', async () => {
    const newBlog = {
      author: 'nönnöönöö',
      url: 'test',
      likes: 0,
    };
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${testToken}`)
      .send(newBlog)
      .expect(400);
  });

  test('post without url returns 400 Bad Request', async () => {
    const newBlog = {
      author: 'nönnöönöö',
      title: 'test',
      likes: 0,
    };
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${testToken}`)
      .send(newBlog)
      .expect(400);
  });

  test('deleting by id works', async () => {
    const getResponse = await api.get('/api/blogs');
    const blogsBeforeDeleting = getResponse.body;

    console.log(blogsBeforeDeleting[0].user);
    await api
      .delete(`/api/blogs/${blogsBeforeDeleting[0].id}`)
      .set('Authorization', `bearer ${testToken}`);

    const afterResponse = await api.get('/api/blogs');
    expect(afterResponse.body.length).toBe(blogsBeforeDeleting.length - 1);
  });
});

test('updating likes works', async () => {
  const response = await api.get('/api/blogs');
  const newBlog = { ...response.body[0], likes: 420 };

  // console.log(newBlog);
  const res = await api.put(`/api/blogs/${newBlog.id}`).send(newBlog);
  // console.log('updated blog: ', res.body);

  const response2 = await api.get('/api/blogs');

  // console.log(response2.body);
  expect(response2.body[0].likes).toBe(newBlog.likes);
});

afterAll(() => {
  mongoose.connection.close();
});
