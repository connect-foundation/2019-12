import React from 'react';

import EventHeader from '.';

export default {
  title: 'Organisms / EventHeader',
};

const eventData = {
  title:
    '[저자특강] 코어 자바스크립트 : 핵심 개념과 동작 원리로 이해하는 자바스크립트 프로그래밍',
  startAt: '2019-11-30T05:00:00.000Z',
  endAt: '2019-11-30T09:00:00.000Z',
  place: '위플레이스 강남점(서울시 강남구 강남대로 340 경원빌딩 3층)',
  address: '서울시 강남구 강남대로 340',
  mainImg: 'https://bookus.kr.object.ncloudstorage.com/690',
  ticketType: {
    name: '일반 입장권',
    desc: '코어 자바스크립트 책을 지참하시면 현장에서 오천원을 돌려드립니다.',
    price: 10000,
    quantity: 80,
    leftCnt: 0,
    isPublicLeftCnt: false,
    maxCntPerPerson: 5,
    salesStartAt: '2019-11-04T15:00:00.000Z',
    salesEndAt: '2019-11-28T14:00:00.000Z',
    refundEndAt: '2019-11-28T14:00:00.000Z',
  },
  user: {
    id: 2,
    lastName: '조',
    firstName: '성동',
    profileImgUrl:
      'https://cf.festa.io/img/2019-5-30/754f6674-e1e4-41d0-b24b-f4bef430dfe5.jpeg',
  },
  eventId: 733,
};

export const index: React.FC = () => {
  return <EventHeader {...eventData} />;
};
