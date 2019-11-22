import * as request from 'supertest';
import app from '../src/app';

describe('Basic Types', () => {
  const req = request(app);

  test('GET /api/users/:userId', async () => {
    const res = await req.get('/api/users/1').expect(200);
    expect(res.text).toBe('GET /users');
  });
});
