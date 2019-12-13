import * as request from 'supertest';
import app from '../../src/app';
import { Secret } from 'jsonwebtoken';
import { sequelize } from '../../src/utils/sequelize';
import { UserTicket } from '../../src/models';
import { generateJWT } from '../../src/utils/jwt';
import {
  OK,
  UNAUTHORIZED,
  NO_CONTENT,
  BAD_REQUEST,
  NOT_FOUND,
} from 'http-status';

const createDummyUserTicket = async (userId: number, ticketTypeId: number) =>
  await UserTicket.create({ userId, ticketTypeId });

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

describe('Router DELETE ', () => {
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
  });
  it('로그인을 했고, 없는 티켓을 지울경우, 404', async () => {
    const token = await generateJWT(true, 1, 1, '1234@gmail.com');
    await request(app)
      .delete('/api/users/ticket')
      .set(setHeader(token))
      .send({
        ticketId: 100000,
      })
      .expect(NOT_FOUND);
  });
  it('로그인을 했고, 바디를 주지 않을 경우 400', async () => {
    const token = await generateJWT(true, 1, 1, '1234@gmail.com');
    await request(app)
      .delete('/api/users/ticket')
      .set(setHeader(token))
      .expect(BAD_REQUEST);
  });
});
