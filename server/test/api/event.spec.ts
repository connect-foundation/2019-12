import '../../src/env';
import * as request from 'supertest';
import app from '../../src/app';
import { Secret } from 'jsonwebtoken';
import { generateJWT } from '../../src/utils/jwt';
import { sequelize } from '../../src/utils/sequelize';
import { Event } from '../../src/models';
import { cloneDeep } from 'lodash';
import {
  OK,
  NO_CONTENT,
  NOT_FOUND,
  UNAUTHORIZED,
  BAD_REQUEST,
} from 'http-status';

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

describe('GET /api/events/:eventId/tickets', () => {
  const eventId = '331';

  it('정상적인 응답을 확인', async () => {
    const { body, status } = await request(app).get(
      `/api/events/${eventId}/tickets`,
    );
    expect(status).toBe(200);
    expect(body).toHaveProperty(
      'name',
      '리눅스커널 v5.3 네트워크 단기특강 12월 수강권',
    );
    expect(body).toHaveProperty('price', 160000);
  });

  it('없는 Event에 대한 요청은 404 응답', async () => {
    const eventId = 0;
    const { status } = await request(app).get(`/api/events/${eventId}/tickets`);
    expect(status).toBe(404);
  });
});

describe('GET /api/events/coordinate', () => {
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

describe('POST /api/events', async () => {
  const createEventBody = {
    isPublic: true,
    title: '이벤트의 제목',
    startAt: new Date('2020-01-01 13:00:00'),
    endAt: new Date('2020-02-01 13:00:00'),
    place: '패스트파이브 강남 4호점',
    address: '서울시 강남구',
    placeDesc: '주차 불가',
    desc: '설명',
    ticket: {
      name: '일반',
      desc: '일반',
      quantity: 30,
      isPublicLeftCnt: false,
      maxCntPerPerson: 10,
    },
  };

  it('정상적으로 응답', async () => {
    await request(app)
      .post('/api/events')
      .send(createEventBody)
      .expect(OK);
  });

  it('startAt 이 endAt 보다 크면 400 응답', async () => {
    const body = cloneDeep(createEventBody);
    body.startAt = new Date('2020-03-01 13:00:00');
    await request(app)
      .post('/api/events')
      .send(body)
      .expect(BAD_REQUEST);
  });

  it('ticket 의 maxCntPerPerson 가 quantity 보다 크면 400 응답', async () => {
    const body = cloneDeep(createEventBody);
    body.ticket.maxCntPerPerson = body.ticket.quantity + 5;
    await request(app)
      .post('/api/events')
      .send(body)
      .expect(BAD_REQUEST);
  });

  it('필수 항목이 없을 경우 400 응답', async () => {
    const body = cloneDeep(createEventBody);
    delete body.title;
    await request(app)
      .post('/api/events')
      .send(body)
      .expect(BAD_REQUEST);
  });
});

describe('GET /api/events/:eventId/users', () => {
  it('로그인을 안했을 경우 401', async () => {
    const token = await generateJWT(false, 2, 1, '1234@gmail.com');
    await request(app)
      .get('/api/events/2/users')
      .set(setHeader(token))
      .expect(UNAUTHORIZED);
  });
  it('이벤트가 없는 경우 404', async () => {
    const token = await generateJWT(true, 2, 1, '1234@gmail.com');
    await request(app)
      .get('/api/events/0/users')
      .set(setHeader(token))
      .expect(NOT_FOUND);
  });
  it('주최한 유저와 이벤트가 다를경우 (다른 유저의 이벤트를 보려고 하는 경우) 400', async () => {
    const token = await generateJWT(true, 2, 1, '1234@gmail.com');
    await request(app)
      .get('/api/events/1/users')
      .set(setHeader(token))
      .expect(BAD_REQUEST);
  });
  it('내 이벤트에 접근한 경우, 티켓이 없을 때 204', async () => {
    const token = await generateJWT(true, 2, 1, '1234@gmail.com');
    await request(app)
      .get('/api/events/9/users')
      .set(setHeader(token))
      .expect(NO_CONTENT);
  });
  it('내 이벤트에 접근한 경우 200', async () => {
    const token = await generateJWT(true, 2, 1, '1234@gmail.com');
    await request(app)
      .get('/api/events/2/users')
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
});
