import React from 'react';

import CardGrid from '.';
import { EventDetail } from 'types/Data';

export default {
  title: 'Organisms / CardGrid',
};

const defaultEventData: EventDetail = {
  id: 733,
  title: '리눅스 커널 v5.3 분석: 네트워크 TCP/IP 주말특강(12월)',
  startAt: '2019-12-21T03:00:00.000Z',
  endAt: '2019-12-22T09:00:00.000Z',
  place: '리얼리눅스 강의장 (혜정빌딩 4층 / 강남역 3번출구)',
  address: '테헤란로4길 38-5',
  latitude: 1,
  longitude: 1,
  placeDesc:
    "강남역 3번출구에서 3분거리 (카카오맵, 네이버맵 '리얼리눅스' 검색)",
  mainImg: 'https://bookus.kr.object.ncloudstorage.com/733',
  desc:
    '<p>안녕하세요. 리얼리눅스 입니다!</p>\n<h3>12월 21일(토)~22(일) 주말특강: 리눅스 커널 v5.3 분석과추적: 네트워크 TCP/IP 주말특강</h3>\n<p><strong>오픈기념 50% 할인: 정가 33만원 =&gt; 16만원</strong></p>\n<p>* 강사: 송태웅</p>\n<p>* 이력:</p>\n<p>- 리얼리눅스 대표 / 강사   <a href="http://reallinux.co.kr" target="_blank">http://reallinux.co.kr</a><br />- 전) KossLab 오픈소스 개발자 (Linux Kernel 등)<br />- USENIX, Vault\'19 Speaker<br />- Linux Foundation, OSSEU17 Speaker<br />- 컨트리뷰톤(Contributhon) Creator<br />- 삼성전자 SOSCON 및 네이버 DEVIEW 2016,18 연사<br />- 카카오 클라우드팀, SK C&amp;C, ETRI연구소 등 기술자문<br />- 서울대, 카이스트, 연세대, 고려대 등 10여개 대학 강연</p>\n<p>* 소개영상: <a href="https://www.youtube.com/watch?v=kDQJ_0-gzXY" target="_blank">https://www.youtube.com/watch?v=kDQJ_0-gzXY</a></p>\n<p>* 준비물: 개인 노트북</p>\n<p>* 장소: 리얼리눅스 강의장 <a href="http://kko.to/0oCDqoWjB" target="_blank">http://kko.to/0oCDqoWjB</a></p>\n<p>* 리얼리눅스 스터디공간: 수강생 스터디 그룹 우선 무료예약 제공</p>\n<p>* 카카오톡(리얼리눅스) 1:1 상담 : <a href="https://pf.kakao.com/_sxevPT" target="_blank">https://pf.kakao.com/_sxevPT</a></p>\n<p><img src="https://cf.festa.io/img/2019-11-14/c41b433f-d7d2-42af-83d0-0c3e4f971cd8.png" /><img src="https://cf.festa.io/img/2019-11-14/6cffcb39-bb53-4b7f-9ada-411f74cf65b9.png" /></p>\n<p>* 리얼리눅스 강의장 사진 (고가 브랜드 &quot;퍼시스&quot; 책상, 의자 비치)</p>\n<p><img src="https://cf.festa.io/img/2019-11-14/5ca368c1-af2e-406e-8e8f-88252923dd41.jpg" /><img src="https://cf.festa.io/img/2019-11-14/79ea0436-e92b-458d-9f7b-adade42a51f6.jpg" /></p>\n<p>* 리얼리눅스 스터디공간 (수강생 우선제공)</p>\n<p><img src="https://cf.festa.io/img/2019-11-14/5e6232da-14fb-4cac-9729-41eb2f174833.jpg" /></p>\n<p>찾아오시는길 설명 PPT for 길치: <a href="https://docs.google.com/presentation/d/1N0z20JnuZ5aQgItfiUaoj9RPXU33eq4A7M2YMfdm_y0/edit?usp=sharing" target="_blank">https://docs.google.com/presentation/d/1N0z20JnuZ5aQgItfiUaoj9RPXU33eq4A7M2YMfdm_y0/edit?usp=sharing</a></p>\n<p><img src="https://cf.festa.io/img/2019-11-14/4b4a23f2-be45-48bd-9ba7-d2ef0645d522.png" /></p>\n<p> </p>\n<p> </p>\n<p> </p>',
  ticketType: {
    id: 802,
    eventId: 733,
    name: '리눅스커널 v5.3 네트워크 단기특강 12월 수강권',
    desc: '',
    price: 160000,
    quantity: 12,
    leftCnt: 12,
    isPublicLeftCnt: false,
    maxCntPerPerson: 5,
    salesStartAt: '2019-11-12T15:00:00.000Z',
    salesEndAt: '2019-12-21T14:30:00.000Z',
    refundEndAt: '2019-12-16T14:30:00.000Z',
  },
  user: {
    id: 2,
    lastName: '조',
    firstName: '성동',
    profileImgUrl: '',
  },
};
const events = new Map<number, EventDetail>();
const eventsOrder: number[] = [];

for (let i = 1; i < 20; i += 1) {
  events.set(i, defaultEventData);
  eventsOrder.push(i);
}

export const cardGrid: React.FC = () => {
  return <CardGrid events={events} eventsOrder={eventsOrder} />;
};
