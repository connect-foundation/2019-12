import '../../src/env';
import * as request from 'supertest';
import app from '../../src/app';
import { Secret } from 'jsonwebtoken';
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
});

describe('POST /api/events', () => {
  const defaultImage = resolve(__dirname, './file/createEvent/normal.jpg');
  const defaultData: Record<string, string | boolean | number> = {
    isPublic: true,
    title: '이벤트의 제목',
    startAt: '2200-01-01 13:00:00',
    endAt: '2200-05-01 13:00:00',
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
    'ticket[salesStartAt]': '2019-12-15 10:00:00',
    'ticket[salesEndAt]': '2019-12-17 13:00:00',
    'ticket[refundEndAt]': '2019-12-20 13:00:00',
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
