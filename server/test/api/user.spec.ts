import * as request from 'supertest';
import app from '../../src/app';
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
  it('로그인 안했을 경우', async () => {
    const token = await generateJWT(false, 1, 1, '1234@gmail.com');
    await request(app)
      .get('/api/users/tickets')
      .set({
        Cookie: `UID=${token}`,
        Accept: 'application/json',
      })
      .expect(UNAUTHORIZED);
  });
  it('유저 데이터를 불러왔고, 데이터가 있을 경우', async () => {
    const token = await generateJWT(true, 2, 1, '1234@gmail.com');
    await request(app)
      .get('/api/users/tickets')
      .set({
        Cookie: `UID=${token}`,
        Accept: 'application/json',
      })
      .expect(OK)
      .expect(res => {
        expect(res.body).toMatchSnapshot();
      });
  });
  it('유저 데이터를 불러왔고, 데이터가 없을 경우 204', async () => {
    const token = await generateJWT(true, 1, 1, '1234@gmail.com');
    await request(app)
      .get('/api/users/tickets')
      .set({
        Cookie: `UID=${token}`,
        Accept: 'application/json',
      })
      .expect(NO_CONTENT)
      .expect(res => {
        expect(res.body).toStrictEqual({});
      });
  });
});
