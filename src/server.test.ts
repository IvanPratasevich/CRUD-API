import request from 'supertest';
import { server } from './server';
import { IUser } from './interfaces/interfaces';

describe('First scenario', () => {
  let user: IUser;

  beforeAll((done) => {
    done();
  });

  afterAll((done) => {
    server.close();
    done();
  });

  it('Should get all users', async () => {
    const res = await request(server).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });

  it('Should return new user', async () => {
    const res = await request(server)
      .post('/api/users')
      .send({ username: 'Ivan', age: 35, hobbies: ['reading', 'cat'] });
    user = res.body;
    expect(res.statusCode).toEqual(201);
    expect(res.body.username).toEqual('Ivan');
    expect(res.body.age).toEqual(35);
    expect(res.body.hobbies).toEqual(['reading', 'cat']);
  });

  it('Should return created user by its id (reated user is expected)', async () => {
    const res = await request(server).get(`/api/users/${user.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(user);
  });

  it('Should update created user (all fields are required)', async () => {
    const res = await request(server)
      .put(`/api/users/${user.id}`)
      .send({ username: 'Josh', age: 18, hobbies: ['reading', 'games'] });
    expect(res.statusCode).toEqual(200);
    expect(res.body.username).toEqual('Josh');
    expect(res.body.age).toEqual(18);
    expect(res.body.hobbies).toEqual(['reading', 'games']);
    expect(res.body.id).toEqual(user.id);
  });

  it('Should delete user that we updated earlier', async () => {
    const res = await request(server).delete(`/api/users/${user.id}`);
    expect(res.statusCode).toEqual(204);
  });

  it('Should not return deleted user', async () => {
    const res = await request(server).get(`/api/users/${user.id}`);
    expect(res.statusCode).toEqual(404);
  });
});

describe('Second scenario', () => {
  let user: IUser;

  beforeAll((done) => {
    done();
  });

  afterAll((done) => {
    server.close();
    done();
  });

  it('Should answer with status code 400 and corresponding message if request body does not contain required fields', async () => {
    const res = await request(server).post('/api/users').send({ username: 'Ivan' });
    expect(res.statusCode).toEqual(400);
  });

  it('Should create new user', async () => {
    const res = await request(server)
      .post('/api/users')
      .send({ username: 'John', age: 15, hobbies: ['dogs', 'reading', 'games'] });
    user = res.body;
    expect(res.statusCode).toEqual(201);
    expect(res.body.username).toEqual('John');
    expect(res.body.age).toEqual(15);
    expect(res.body.hobbies).toEqual(['dogs', 'reading', 'games']);
  });

  it('Should return error if userId is invalid', async () => {
    const invalidId = '123456789abc';
    const res = await request(server).get(`/api/users/${invalidId}`);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('User id is invalid');
  });

  it('Should delete user', async () => {
    const res = await request(server).delete(`/api/users/${user.id}`);
    expect(res.statusCode).toEqual(204);
  });
});
