import * as request from 'supertest';
import app from '../../src/app';
import { sequelize } from '../../src/utils/sequelize';
import { Event } from '../../src/models';
import { OK, NOT_FOUND } from 'http-status';

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
          .expect(OK)
          .expect('Content-type', /application\/json/)
          .expect(res => expect(res.body).toHaveLength(cnt));
      },

      () => {
        const startAt = new Date('2018-04-30T10:00:00.000Z');
        request(app)
          .get('/api/events')
          .query({ startAt })
          .expect(OK)
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

  it('GET /api/events/:eventId - 정상적으로 응답', async () => {
    const eventId = 5;

    const { body } = await request(app)
      .get(`/api/events/${eventId}`)
      .expect(OK)
      .expect('Content-type', /application\/json/);

    expect(body.title).toBe('Saturday Azure Live! 1803');
    expect(body.user).toHaveProperty('firstName', '성동');
    expect(body.ticketType).toHaveProperty('price', 10000);
  });

  it('GET /api/events/:eventId - 없는 아이디 요청은 404 응답', async () => {
    const eventId = 'wrong';
    await request(app)
      .get(`/api/events/${eventId}`)
      .expect(NOT_FOUND);
  });
});
