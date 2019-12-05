import * as request from 'supertest';
import app from '../src/app';
import { sequelize } from '../src/utils/sequelize';
import redis from '../src/utils/redis';

import { generateJWT } from '../src/utils/jwt';

beforeAll(async () => {
  sequelize.options.logging = false;
  await sequelize.sync();
});

afterAll(() => {
  sequelize.close();
  redis.quit();
});

describe('Router /api/users/ticket', () => {
  it('티켓 구매 날짜가 아닐 경우 403', async () => {
    const token = await generateJWT(true, 1, 1, '');
    await request(app)
      .post('/api/users/ticket')
      .set({
        Cookie: `UID-${token}`,
        Accept: 'application/json',
      })
      .send({
        ticketId: 3,
        orderTicketNum: 1,
      })
      .expect(403);
  });

  it('티켓 구매 날짜가 지났을 경우 403', async () => {
    const token = await generateJWT(true, 1, 1, '');
    await request(app)
      .post('/api/users/ticket')
      .set({
        Cookie: `UID-${token}`,
        Accept: 'application/json',
      })
      .send({
        ticketId: 4,
        orderTicketNum: 1,
      })
      .expect(403);
  });

  it('티켓 정보는 다 맞지만, 로그인을 하지 않았을 경우 401', async () => {
    await request(app)
      .post('/api/users/ticket')
      .set({
        Accept: 'application/json',
      })
      .send({
        ticketId: 2,
        orderTicketNum: 1,
      })
      .expect(401);
  });

  it('존재하지 않는 티켓의 경우 404', async () => {
    const token = await generateJWT(true, 1, 1, '');
    await request(app)
      .post('/api/users/ticket')
      .set({
        Cookie: `UID=${token}`,
        Accept: 'application/json',
      })
      .send({
        ticketId: 10000,
        orderTicketNum: 1,
      })
      .expect(404);
  });

  it('Ticket 구매가 가능할 경우 200', async () => {
    const token = await generateJWT(true, 1, 1, '');
    await request(app)
      .post('/api/users/ticket')
      .set({
        Cookie: `UID=${token}`,
        Accept: 'application/json',
      })
      .send({
        ticketId: 2,
        orderTicketNum: 1,
      })
      .expect(200);
  });

  it('티켓이 남아있지 않을 경우 403', async () => {
    const token = await generateJWT(true, 1, 1, '');
    await request(app)
      .post('/api/users/ticket')
      .set({
        Cookie: `UID-${token}`,
        Accept: 'application/json',
      })
      .send({
        ticketId: 1,
        orderTicketNum: 1,
      })
      .expect(403);
  });

  it('티켓이 남아있지만, 한 사람이 살 수 있는 최대 개수를 초과할 경우 403', async () => {
    const token = await generateJWT(true, 1, 1, '');
    await request(app)
      .post('/api/users/ticket')
      .set({
        Cookie: `UID=${token}`,
        Accept: 'application/json',
      })
      .send({
        ticketId: 2,
        orderTicketNum: 1,
      })
      .expect(403);
  });
});
