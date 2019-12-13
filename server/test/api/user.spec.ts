import * as request from 'supertest';
import app from '../../src/app';
import { Secret } from 'jsonwebtoken';
import { sequelize } from '../../src/utils/sequelize';
import { client } from '../../src/utils/redis';
import { TicketType, UserTicket } from '../../src/models';
import { generateJWT } from '../../src/utils/jwt';
import { OK, UNAUTHORIZED, NO_CONTENT, BAD_REQUEST } from 'http-status';

const createDummyUserTicket = async (userId: number, ticketTypeId: number) =>
  await UserTicket.create({ userId, ticketTypeId, isAttendance: true });

const setHeader = (token: Secret) => {
  return {
    Cookie: `UID=${token}`,
    Accept: 'application/json',
  };
};

beforeAll(async () => {
  sequelize.options.logging = false;
  await sequelize.sync();
});

afterAll(() => {
  sequelize.close();
  client.quit();
});

describe('Router GET /api/users/tickets', () => {
  it('로그인 안했을 경우', async () => {
    const token = await generateJWT(false, 1, 1, '1234@gmail.com');
    await request(app)
      .get('/api/users/tickets')
      .set(setHeader(token))
      .expect(UNAUTHORIZED);
  });
  it('유저 데이터를 불러왔고, 데이터가 있을 경우', async () => {
    const token = await generateJWT(true, 2, 1, '1234@gmail.com');
    await request(app)
      .get('/api/users/tickets')
      .set(setHeader(token))
      .expect(OK)
      .expect(res => {
        const data = res.body[0];
        const { userTickets, ...body } = data;
        const { createdAt, ...userTicket } = userTickets[0];
        expect(body).toMatchSnapshot();
        expect(userTicket).toMatchSnapshot();
      });
  });
  it('유저 데이터를 불러왔고, 데이터가 없을 경우 204', async () => {
    const token = await generateJWT(true, 100, 1, '1234@gmail.com');
    await request(app)
      .get('/api/users/tickets')
      .set(setHeader(token))
      .expect(NO_CONTENT)
      .expect(res => {
        expect(res.body).toStrictEqual({});
      });
  });
});

describe('Router GET /api/users/events', () => {
  it('로그인 안했을 경우', async () => {
    const token = await generateJWT(false, 1, 1, '1234@gmail.com');
    await request(app)
      .get('/api/users/events')
      .set(setHeader(token))
      .expect(UNAUTHORIZED);
  });
  it('유저의 이벤트를 불러왔고, 데이터가 있을 경우 200', async () => {
    const token = await generateJWT(true, 2, 1, '1234@gmail.com');
    await request(app)
      .get('/api/users/events')
      .set(setHeader(token))
      .expect(OK)
      .expect(res => {
        expect(res.body).toMatchSnapshot();
      });
  });
  it('유저의 이벤트를 불러왔고, 데이터가 없을 경우 204', async () => {
    const token = await generateJWT(true, 100000, 1, '1234@gmail.com');
    await request(app)
      .get('/api/users/events')
      .set(setHeader(token))
      .expect(NO_CONTENT)
      .expect(res => {
        expect(res.body).toStrictEqual({});
      });
  });
});

describe('Router DELETE /api/users/ticket', () => {
  it('로그인 안했을 경우', async () => {
    const token = await generateJWT(false, 1, 1, '1234@gmail.com');
    await request(app)
      .delete('/api/users/ticket')
      .set(setHeader(token))
      .expect(UNAUTHORIZED);
  });
  it('로그인을 했고, 티켓을 지웠을 경우, 204', async () => {
    const data = await createDummyUserTicket(1, 1);
    const token = await generateJWT(true, 1, 1, '1234@gmail.com');
    await request(app)
      .delete('/api/users/ticket')
      .set(setHeader(token))
      .send({
        ticketId: data.id,
      })
      .expect(NO_CONTENT);
    await TicketType.update({ leftCnt: 0 }, { where: { id: 1 } });
    client.hgetall('1', (err, reply) => {
      expect(reply.isBlock).toBe('0');
    });
    client.hset('1', 'isBlock', '1');
  });
  it('로그인을 했고, 바디를 주지 않을 경우 400', async () => {
    const token = await generateJWT(true, 1, 1, '1234@gmail.com');
    await request(app)
      .delete('/api/users/ticket')
      .set(setHeader(token))
      .expect(BAD_REQUEST);
  });
  // 티켓 지울 때 잘못된 값이 들어가면 500 에러가 나옴.
  // 서버 오류와 동일하게 뜨기 때문에 이를 주의해야함.
});
