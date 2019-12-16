import '../../src/env';
import * as request from 'supertest';
import app from '../../src/app';
import { Secret } from 'jsonwebtoken';
import { client } from '../../src/utils/redis';
import { generateJWT } from '../../src/utils/jwt';
import { sequelize } from '../../src/utils/sequelize';
import { Event } from '../../src/models';
import { clone } from 'lodash';
import { resolve } from 'path';
import {
  OK,
  CREATED,
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
let token: Secret;

beforeAll(async () => {
  sequelize.options.logging = false;
  await sequelize.sync();
  token = await generateJWT(true, 2, 1, '1234@gmail.com');
});

afterAll(() => {
  sequelize.close();
  client.quit();
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

describe('POST /api/events', () => {
  const defaultImage = resolve(__dirname, './file/createEvent/normal.jpg');
  const defaultData: Record<string, string | boolean | number> = {
    isPublic: true,
    title: '이벤트의 제목',
    startAt: '2200-12-15 10:00:00',
    endAt: '2201-05-01 13:00:00',
    place: '패스트파이브 강남 4호점',
    address: '서울시 강남구',
    placeDesc: '주차 불가',
    desc: '설명',
    latitude: 37.5662952,
    longitude: 126.9779451,
    'ticket[name]': '티켓 이름',
    'ticket[desc]': '티켓 설명',
    'ticket[quantity]': 30,
    'ticket[isPublicLeftCnt]': false,
    'ticket[maxCntPerPerson]': 10,
    'ticket[price]': 10000,
    'ticket[salesStartAt]': '2200-12-15 10:00:00',
    'ticket[salesEndAt]': '2200-12-17 13:00:00',
    'ticket[refundEndAt]': '2200-12-20 13:00:00',
  };

  function getRequest(
    data: Record<string, string | boolean | number> = {},
    imagePath: string = defaultImage,
    loggedIn = true,
  ) {
    const req = request(app)
      .post('/api/events')
      .type('form')
      .attach('mainImg', imagePath);

    if (loggedIn) req.set(setHeader(token));

    const form = Object.assign(clone(defaultData), data);
    for (const key in form) {
      req.field(key, form[key]);
    }

    return req;
  }

  it('정상적으로 응답', async () => {
    await getRequest().expect(CREATED);
  });

  it('로그인이 되어있지 않으면 401 응답', async () => {
    await getRequest({}, undefined, false).expect(UNAUTHORIZED);
  });

  it('startAt 이 오늘보다 전이면 400 응답', async () => {
    await getRequest({ startAt: '1900-03-01 13:00:00' }).expect(BAD_REQUEST);
  });

  it('startAt 이 endAt 보다 크면 400 응답', async () => {
    await getRequest({ startAt: '2201-03-01 13:00:00' }).expect(BAD_REQUEST);
  });

  it('ticket 의 maxCntPerPerson 가 quantity 보다 크면 400 응답', async () => {
    await getRequest({ 'ticket[maxCntPerPerson]': 200 }).expect(BAD_REQUEST);
  });

  it('ticket 의 salesStartAt 가 salesEndAt 보다 늦으면 400 응답', async () => {
    await getRequest({ 'ticket[salesEndAt]': '2201-03-01 13:00:00' }).expect(
      BAD_REQUEST,
    );
  });

  it('ticket 의 refundEndAt 이 refundEndAt 보다 늦으면 400 응답', async () => {
    await getRequest({ 'ticket[salesStartAt]': '2201-03-01 13:00:00' }).expect(
      BAD_REQUEST,
    );
  });

  it('mainImg 의 크기가 10MB 이상의 크기면 400 응답', async () => {
    await getRequest(
      {},
      resolve(__dirname, './file/createEvent/big.jpg'),
    ).expect(BAD_REQUEST);
  });

  it('mainImg 의 파일이 이미지 파일이 아니면 400 응답', async () => {
    await getRequest(
      {},
      resolve(__dirname, './file/createEvent/text.txt'),
    ).expect(BAD_REQUEST);
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

describe('PATCH /api/events/:eventId/ticket/:ticketId', () => {
  it('true 로 변경 요청을 보냈을 때 성공하면, 200', async () => {
    const token = await generateJWT(true, 2, 1, '1234@gmail.com');
    await request(app)
      .patch('/api/events/3/ticket/2')
      .set(setHeader(token))
      .send({
        attendance: true,
      })
      .expect(OK)
      .expect(res => {
        expect(res.body).toStrictEqual({ id: 2, isAttendance: true });
      });
  });
  it('False 로 변경 요청을 보냈을 때 성공하면, 200', async () => {
    const token = await generateJWT(true, 2, 1, '1234@gmail.com');
    await request(app)
      .patch('/api/events/3/ticket/2')
      .set(setHeader(token))
      .send({
        attendance: false,
      })
      .expect(OK)
      .expect(res => {
        expect(res.body).toStrictEqual({ id: 2, isAttendance: false });
      });
  });
  it('로그인 실패하면 401', async () => {
    const token = await generateJWT(false, 2, 1, '1234@gmail.com');
    await request(app)
      .patch('/api/events/3/ticket/2')
      .set(setHeader(token))
      .send({
        attendance: false,
      })
      .expect(UNAUTHORIZED);
  });
  it('이벤트가 로그인한 사용자의 것이 아닌경우 400', async () => {
    const token = await generateJWT(true, 2, 1, '1234@gmail.com');
    await request(app)
      .patch('/api/events/1/ticket/2')
      .set(setHeader(token))
      .send({
        attendance: false,
      })
      .expect(BAD_REQUEST);
  });
  it('이벤트가 로그인한 사용자의 것이지만 티켓이 없을경우 404', async () => {
    const token = await generateJWT(true, 2, 1, '1234@gmail.com');
    await request(app)
      .patch('/api/events/3/ticket/1000000')
      .set(setHeader(token))
      .send({
        attendance: false,
      })
      .expect(NOT_FOUND);
  });
});
