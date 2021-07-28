const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Before running any tests, delete all users from test db and create a new one
describe('when there is a user', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('testi', 10);

    const user = new User({
      username: 'test',
      name: 'testi jäbä',
      passwordHash,
    });

    await user.save();
  });

  test('creation possible with a new username', async () => {
    const res = await api.get('/api/users');
    const usersBefore = res.body;

    const newUser = {
      username: 'test 2',
      name: 'testi jäbä',
      password: 'testisalasana',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const resAfter = await api.get('/api/users');
    const usersAfter = resAfter.body;
    expect(usersAfter).toHaveLength(usersBefore.length + 1);

    const usernames = usersAfter.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test('cannot create user with same username as in db', async () => {
    const newUser = {
      username: 'test',
      name: 'testi jäbä',
      password: 'testisalasana',
    };

    await api.post('/api/users').send(newUser).expect(400);
  });

  test('username must be more than three characters', async () => {
    const newUser = {
      username: 'te',
      name: 'testi jäbä',
      password: 'testisalasana',
    };

    await api.post('/api/users').send(newUser).expect(400);
  });

  test('password must be more than three characters', async () => {
    const newUser = {
      username: 'testiäiä',
      name: 'testi jäbä',
      password: 'te',
    };

    await api.post('/api/users').send(newUser).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
