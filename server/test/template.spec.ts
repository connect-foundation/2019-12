import * as request from 'supertest';
import app from '../src/app';

const { DB_HOST, DB_USER, DB_PW, DB_NAME } = process.env;

describe('Basic Types', () => {
  const req = request(app);

  console.log(DB_HOST, DB_USER, DB_PW, DB_NAME);

  test('GET /api/users/:userId', async () => {
    const res = await req.get('/api/users/1').expect(200);
    expect(res.text).toBe('GET /users');
  });
});
