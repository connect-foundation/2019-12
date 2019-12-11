import * as request from 'supertest';
import app from '../../src/app';
import { Secret } from 'jsonwebtoken';
import { sequelize } from '../../src/utils/sequelize';
import { generateJWT } from '../../src/utils/jwt';
import { OK, UNAUTHORIZED, NO_CONTENT } from 'http-status';

beforeAll(async () => {
  sequelize.options.logging = false;
  await sequelize.sync();
});

afterAll(() => {
  sequelize.close();
});

describe('Router GET /api/users/tickets', () => {
  function setHeader(token: Secret) {
    return {
      Cookie: `UID=${token}`,
      Accept: 'application/json',
    };
  }

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
    const token = await generateJWT(true, 1, 1, '1234@gmail.com');
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
  function setHeader(token: Secret) {
    return {
      Cookie: `UID=${token}`,
      Accept: 'application/json',
    };
  }

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
      .expect(OK);
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
