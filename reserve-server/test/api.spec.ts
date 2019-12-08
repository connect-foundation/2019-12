import * as request from 'supertest';
import app from '../src/app';
import { sequelize } from '../src/utils/sequelize';
import redis from '../src/utils/redis';
import { generateJWT } from '../src/utils/jwt';
import {
  BAD_REQUEST,
  OK,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
} from 'http-status';

beforeAll(async () => {
  sequelize.options.logging = false;
  await sequelize.sync();
});

afterAll(() => {
  sequelize.close();
  redis.quit();
});

describe('Router /api/users/ticket', () => {
  it('인자를 안주거나 잘못 줫을 경우 400', async () => {
    const token = await generateJWT(true, 1, 1, '');
    await request(app)
      .post('/api/users/ticket')
      .set({
        Cookie: `UID-${token}`,
        Accept: 'application/json',
      })
      .send({
        ticketId: 3,
      })
      .expect(BAD_REQUEST);
  });

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
      .expect(FORBIDDEN)
      .expect(res => {
        expect(res.body).toStrictEqual({
          state: 0,
          message: 'wrong date',
        });
      });
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
      .expect(FORBIDDEN)
      .expect(res => {
        expect(res.body).toStrictEqual({
          state: 0,
          message: 'wrong date',
        });
      });
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
      .expect(UNAUTHORIZED);
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
      .expect(NOT_FOUND)
      .expect(res => {
        expect(res.body).toStrictEqual({
          message: 'wrong number of ticket',
        });
      });
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
      .expect(OK);
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
      .expect(FORBIDDEN)
      .expect(res => {
        expect(res.body).toStrictEqual({
          state: 1,
          message: 'ticket sold out',
        });
      });
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
      .expect(FORBIDDEN)
      .expect(res => {
        expect(res.body).toStrictEqual({
          state: 2,
          message: 'limit exceed ticket per person',
        });
      });
  });
});
