import * as request from 'supertest';
import app from '../../src/app';
import { sequelize } from '../../src/utils/sequelize';
import { Event } from '../../src/models';
import { OK, NO_CONTENT } from 'http-status';

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

  it('GET /api/events/:eventId - 정상적으로 응답', async () => {
    const eventId = 5;

    const { body } = await request(app)
      .get(`/api/events/${eventId}`)
      .expect(200)
      .expect('Content-type', /application\/json/);

    expect(body.title).toBe('Saturday Azure Live! 1803');
    expect(body.user).toHaveProperty('firstName', '성동');
    expect(body.ticketType).toHaveProperty('price', 10000);
  });

  it('GET /api/events/:eventId - 없는 아이디 요청은 404 응답', async () => {
    const eventId = 'wrong';
    await request(app)
      .get(`/api/events/${eventId}`)
      .expect(404);
  });
});

describe('GET /api/events/coordinate', async () => {
  it('정상적으로 응답', async () => {
    const { body } = await request(app)
      .get('/api/events/coordinate')
      .query({ place: '서울시청' })
      .expect(OK)
      .expect('Content-type', /application\/json/);

    expect(body).toHaveProperty('latitude', 37.5662952);
    expect(body).toHaveProperty('longitude', 126.9779451);
  });

  it('쿼리 결과가 없으면 No-Content 응답', async () => {
    await request(app)
      .get('/api/events/coordinate')
      .query({ place: '!@#' })
      .expect(NO_CONTENT);
  });
});
