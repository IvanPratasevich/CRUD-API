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
