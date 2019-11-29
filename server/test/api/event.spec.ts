import * as request from 'supertest';
import app from '../../src/app';
import { sequelize } from '../../src/utils/sequelize';
import { Event } from '../../src/models';

beforeAll(async () => {
  sequelize.options.logging = false;
  await sequelize.sync();
});

afterAll(() => {
  sequelize.close();
});

describe('Router / Events', () => {
  it('GET /api/events', async () => {
    await Promise.all([
      () => {
        const cnt = 2;
        request(app)
          .get('/api/events')
          .query({ cnt })
          .expect(200)
          .expect('Content-type', /application\/json/)
          .expect(res => expect(res.body).toHaveLength(cnt));
      },

      () => {
        const startAt = new Date('2018-04-30T10:00:00.000Z');
        request(app)
          .get('/api/events')
          .query({ startAt })
          .expect(200)
          .expect('Content-type', /application\/json/)
          .expect(res =>
            res.body.forEach((e: Event) =>
              expect(e.startAt.getTime()).toBeLessThan(startAt.getTime()),
            ),
          );
      },

      () => {
        const wrongId = 'wrong';
        request(app)
          .get('/api/events')
          .query({ lastId: wrongId })
          .expect(400)
          .expect('Content-type', /application\/json/);
      },
    ]);
  });
});
