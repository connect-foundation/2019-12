import React from 'react';

import CardGrid from '.';
import { Event } from '../../../types/Event';

export default {
  title: 'Organisms / CardGrid',
};
let cards: Event[] = [
  {
    id: 733,
    userId: 2,
    title: '리눅스 커널 v5.3 분석: 네트워크 TCP/IP 주말특강(12월)',
    startAt: '2019-12-21T03:00:00.000Z',
    endAt: '2019-12-22T09:00:00.000Z',
    place: '리얼리눅스 강의장 (혜정빌딩 4층 / 강남역 3번출구)',
    address: '테헤란로4길 38-5',
    placeDesc:
      "강남역 3번출구에서 3분거리 (카카오맵, 네이버맵 '리얼리눅스' 검색)",
    mainImg: 'https://bookus.kr.object.ncloudstorage.com/733',
    desc:
      '<p>안녕하세요. 리얼리눅스 입니다!</p>\n<h3>12월 21일(토)~22(일) 주말특강: 리눅스 커널 v5.3 분석과추적: 네트워크 TCP/IP 주말특강</h3>\n<p><strong>오픈기념 50% 할인: 정가 33만원 =&gt; 16만원</strong></p>\n<p>* 강사: 송태웅</p>\n<p>* 이력:</p>\n<p>- 리얼리눅스 대표 / 강사   <a href="http://reallinux.co.kr" target="_blank">http://reallinux.co.kr</a><br />- 전) KossLab 오픈소스 개발자 (Linux Kernel 등)<br />- USENIX, Vault\'19 Speaker<br />- Linux Foundation, OSSEU17 Speaker<br />- 컨트리뷰톤(Contributhon) Creator<br />- 삼성전자 SOSCON 및 네이버 DEVIEW 2016,18 연사<br />- 카카오 클라우드팀, SK C&amp;C, ETRI연구소 등 기술자문<br />- 서울대, 카이스트, 연세대, 고려대 등 10여개 대학 강연</p>\n<p>* 소개영상: <a href="https://www.youtube.com/watch?v=kDQJ_0-gzXY" target="_blank">https://www.youtube.com/watch?v=kDQJ_0-gzXY</a></p>\n<p>* 준비물: 개인 노트북</p>\n<p>* 장소: 리얼리눅스 강의장 <a href="http://kko.to/0oCDqoWjB" target="_blank">http://kko.to/0oCDqoWjB</a></p>\n<p>* 리얼리눅스 스터디공간: 수강생 스터디 그룹 우선 무료예약 제공</p>\n<p>* 카카오톡(리얼리눅스) 1:1 상담 : <a href="https://pf.kakao.com/_sxevPT" target="_blank">https://pf.kakao.com/_sxevPT</a></p>\n<p><img src="https://cf.festa.io/img/2019-11-14/c41b433f-d7d2-42af-83d0-0c3e4f971cd8.png" /><img src="https://cf.festa.io/img/2019-11-14/6cffcb39-bb53-4b7f-9ada-411f74cf65b9.png" /></p>\n<p>* 리얼리눅스 강의장 사진 (고가 브랜드 &quot;퍼시스&quot; 책상, 의자 비치)</p>\n<p><img src="https://cf.festa.io/img/2019-11-14/5ca368c1-af2e-406e-8e8f-88252923dd41.jpg" /><img src="https://cf.festa.io/img/2019-11-14/79ea0436-e92b-458d-9f7b-adade42a51f6.jpg" /></p>\n<p>* 리얼리눅스 스터디공간 (수강생 우선제공)</p>\n<p><img src="https://cf.festa.io/img/2019-11-14/5e6232da-14fb-4cac-9729-41eb2f174833.jpg" /></p>\n<p>찾아오시는길 설명 PPT for 길치: <a href="https://docs.google.com/presentation/d/1N0z20JnuZ5aQgItfiUaoj9RPXU33eq4A7M2YMfdm_y0/edit?usp=sharing" target="_blank">https://docs.google.com/presentation/d/1N0z20JnuZ5aQgItfiUaoj9RPXU33eq4A7M2YMfdm_y0/edit?usp=sharing</a></p>\n<p><img src="https://cf.festa.io/img/2019-11-14/4b4a23f2-be45-48bd-9ba7-d2ef0645d522.png" /></p>\n<p> </p>\n<p> </p>\n<p> </p>',
    ticketTypes: [
      {
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
    ],
    user: {
      id: 2,
      lastName: '조',
      firstName: '성동',
    },
  },
  {
    id: 732,
    userId: 2,
    title: '리눅스 커널 v5.3 분석: 파일시스템 &amp; 블록 I/O 주말특강(12월)',
    startAt: '2019-12-14T03:00:00.000Z',
    endAt: '2019-12-15T09:00:00.000Z',
    place: '리얼리눅스 강의장 (혜정빌딩 4층 / 강남역 3번출구)',
    address: '테헤란로4길 38-5',
    placeDesc:
      "강남역 3번출구에서 3분거리 (카카오맵, 네이버맵 '리얼리눅스' 검색)",
    mainImg: 'https://bookus.kr.object.ncloudstorage.com/732',
    desc:
      '<p>안녕하세요. 리얼리눅스 입니다!</p>\n<h3>12월 14일(토)~15(일) 주말특강: 리눅스 커널 v5.3 분석과추적: 파일시스템 &amp; 블록 I/O 주말특강</h3>\n<p><strong>오픈기념 50% 할인</strong>: 정가 33만원 =&gt; 16만원</p>\n<p>* 강사: 송태웅</p>\n<p>* 이력:</p>\n<p>- 리얼리눅스 대표 / 강사   <a href="http://reallinux.co.kr" target="_blank">http://reallinux.co.kr</a><br />- 전) KossLab 오픈소스 개발자 (Linux Kernel 등)<br />- USENIX, Vault\'19 Speaker<br />- Linux Foundation, OSSEU17 Speaker<br />- 컨트리뷰톤(Contributhon) Creator<br />- 삼성전자 SOSCON 및 네이버 DEVIEW 2016,18 연사<br />- 카카오 클라우드팀, SK C&amp;C, ETRI연구소 등 기술자문<br />- 서울대, 카이스트, 연세대, 고려대 등 10여개 대학 강연</p>\n<p>* 소개영상: <a href="https://www.youtube.com/watch?v=kDQJ_0-gzXY" target="_blank">https://www.youtube.com/watch?v=kDQJ_0-gzXY</a></p>\n<p>* 준비물: 개인 노트북</p>\n<p>* 장소: 리얼리눅스 강의장 <a href="http://kko.to/0oCDqoWjB" target="_blank">http://kko.to/0oCDqoWjB</a></p>\n<p>* 리얼리눅스 스터디공간: 수강생 스터디 그룹 우선 무료예약 제공</p>\n<p>* 카카오톡(리얼리눅스) 1:1 상담 : <a href="https://pf.kakao.com/_sxevPT" target="_blank">https://pf.kakao.com/_sxevPT</a></p>\n<p><img src="https://cf.festa.io/img/2019-11-14/d5d76b65-6d9e-49c1-9c14-7885e2ee5490.png" /><img src="https://cf.festa.io/img/2019-11-14/dca4d0dd-7911-4d24-bf2d-f940fd2f7778.png" /></p>\n<p>* 리얼리눅스 강의장 사진 (고가 브랜드 &quot;퍼시스&quot; 책상, 의자 비치)</p>\n<p><img src="https://cf.festa.io/img/2019-11-14/e8b5e6dd-3243-4fa6-a88c-6399864e0358.jpg" /><img src="https://cf.festa.io/img/2019-11-14/6601bb8d-fd7f-482e-abc1-9278a026df5f.jpg" /></p>\n<p>* 리얼리눅스 스터디공간 (수강생 우선제공)</p>\n<p><img src="https://cf.festa.io/img/2019-11-14/6655a59b-6d36-4b86-b691-8dc7d440abab.jpg" /></p>\n<p>찾아오시는길 설명 PPT for 길치: <a href="https://docs.google.com/presentation/d/1N0z20JnuZ5aQgItfiUaoj9RPXU33eq4A7M2YMfdm_y0/edit?usp=sharing" target="_blank">https://docs.google.com/presentation/d/1N0z20JnuZ5aQgItfiUaoj9RPXU33eq4A7M2YMfdm_y0/edit?usp=sharing</a></p>\n<p><img src="https://cf.festa.io/img/2019-11-14/a42c7a98-955a-4f0f-809c-d04bb1fb4c57.png" /></p>\n<p> </p>\n<p> </p>\n<p> </p>',
    ticketTypes: [
      {
        id: 801,
        eventId: 732,
        name: '리눅스커널 v5.3 파일&amp;블록I/O 단기특강 12월 수강권',
        desc: '',
        price: 160000,
        quantity: 12,
        leftCnt: 12,
        isPublicLeftCnt: false,
        maxCntPerPerson: 5,
        salesStartAt: '2019-11-12T15:00:00.000Z',
        salesEndAt: '2019-12-14T14:30:00.000Z',
        refundEndAt: '2019-12-09T14:30:00.000Z',
      },
    ],
    user: {
      id: 2,
      lastName: '조',
      firstName: '성동',
    },
  },
  {
    id: 714,
    userId: 2,
    title: '제19회 공감세미나',
    startAt: '2019-12-14T01:00:00.000Z',
    endAt: '2019-12-14T08:00:00.000Z',
    place: '한빛미디어 리더스 홀',
    address: '서울 서대문구 연희로2길 62',
    placeDesc: '주차 불가',
    mainImg: 'https://bookus.kr.object.ncloudstorage.com/714',
    desc:
      '<p><img src="https://cf.festa.io/img/2019-11-15/52939e7e-d692-416d-9013-ec9163a7f00e.png" /></p>',
    ticketTypes: [
      {
        id: 785,
        eventId: 714,
        name: '일반 입장권',
        desc: '음료와 샌드위치 및 간단한 다과제공',
        price: 11000,
        quantity: 100,
        leftCnt: 62,
        isPublicLeftCnt: true,
        maxCntPerPerson: 1,
        salesStartAt: '2019-11-15T00:00:00.000Z',
        salesEndAt: '2019-12-14T01:00:00.000Z',
        refundEndAt: '2019-12-06T01:00:00.000Z',
      },
    ],
    user: {
      id: 2,
      lastName: '조',
      firstName: '성동',
    },
  },
  {
    id: 728,
    userId: 2,
    title: 'Klaytn Developer Meetup',
    startAt: '2019-12-10T10:30:00.000Z',
    endAt: '2019-12-10T12:30:00.000Z',
    place: '스타트업 브랜치(코엑스 2층)',
    address: '서울시 강남구 영동대로 513 코엑스 2층',
    placeDesc: 'www.kita.net/mberJobSport/startupBranch/space.do',
    mainImg: 'https://bookus.kr.object.ncloudstorage.com/728',
    desc:
      '<p><strong>Klaytn</strong>에서 국내 블록체인 개발자를 대상으로 <strong>Klaytn 플랫폼과 Blockchain Application(BApp) 개발</strong>에 대해 소개하는 정기 밋업(격월)을 진행합니다.</p>\n<p>세 번째 <strong>Klaytn Developer Meetup</strong>이 12월 10일(화)에 진행될 예정이니, Klaytn 플랫폼을 활용한 BApp 개발에 관심있는 분들의 많은 관심과 참여 바랍니다.</p>\n<p> </p>\n<p><strong>1. 참가 대상</strong><br />Klaytn 블록체인 플랫폼에 관심있고, BApp 개발을 해보고 싶은 개발자 누구나</p>\n<p><strong>2. 밋업 주제</strong><br />- Klaytn 101 #3 <strong>Fee Delegation(대납)</strong> 구조와 대납 기능을 사용하는 <strong>Android BApp</strong> 구현해보기<br />- <strong>Klaytn 스터디 그룹 지원 프로그램</strong> 참여 프로젝트 소개 (TBD)</p>\n<p><strong>3. 세부 내용</strong><br />- <strong>대납 구조 이해</strong>: Klaytn이 지원하는 Fee Delegation이 어떻게 동작하는지 설명<br />- <strong>대납을 사용하는 Android BApp</strong>: 대납 기능을 사용하는 Android BApp의 구현을 설명(mobile native 구현방법 소개(caver-java), Count BApp의 Android 구현, Fee Delegation example에서 보여준 node.js 서버 구현 등)</p>\n<p><strong>4. 밋업 일정</strong><br />- 19:00 ~ 19:30 (30&quot;) 등록 확인<br />- 19:30 ~ 20:10 (40&quot;) Klaytn 세션<br />- 20:10 ~ 20:20 (10&quot;) Q&amp;A<br />- 20:20 ~ 21:00 (40&quot;) Klaytn 스터디 그룹 프로젝트 소개(TBD)<br />- 21:00 ~ 21:30 (30&quot;) 네트워킹<br />* 위 일정은 상황에 따라 변경될 수 있습니다.</p>\n<p><strong>5. 발표자 소개</strong><br />Eric Kim, Developer Evangelist at Ground X</p>\n<p><img src="https://cf.festa.io/img/2019-11-14/48bfd0f6-ee4e-4ce2-beda-42733f2ae478.png" /></p>\n<p><strong>5. 기타</strong><br />- 네트워킹 시간에 간단한 음식과 음료가 제공될 예정입니다.<br />- 주차지원이 되지 않으니 대중교통을 이용해주시기 바랍니다.<br />- 밋업 현장사진이 추후 홍보 자료로 활용될 예정이며,<br />  참석자분들의 모습이 노출될 수 있는 점 양해 부탁드립니다.<br />- 기타 궁금한 점은 아래로 문의해주시기 바랍니다. <br />* Klaytn Developer Meetup 관련 문의: <a href="mailto:community@klaytn.com" target="_blank">community@klaytn.com</a></p>\n<p> </p>\n<p><strong>▶️ Klaytn 소셜미디어에 가입해 최신 소식을 빠르게 받아보세요.</strong><br />- Klaytn Developers 페이스북 그룹 <a href="http://www.facebook.com/groups/klaytndevelopers" target="_blank">www.facebook.com/groups/klaytndevelopers</a></p>',
    ticketTypes: [
      {
        id: 797,
        eventId: 728,
        name: '일반 입장권',
        desc:
          '참석자 선정 후 12월 3일(화)과 9일(월)에 안내메일 발송될 예정입니다.',
        price: 0,
        quantity: 500,
        leftCnt: 487,
        isPublicLeftCnt: true,
        maxCntPerPerson: 1,
        salesStartAt: '2019-11-17T15:00:00.000Z',
        salesEndAt: '2019-12-10T12:30:00.000Z',
        refundEndAt: '2019-12-10T12:30:00.000Z',
      },
    ],
    user: {
      id: 2,
      lastName: '조',
      firstName: '성동',
    },
  },
];
cards = [...cards, ...cards, ...cards, ...cards, ...cards, ...cards];

export const cardGrid: React.FC = () => {
  return <CardGrid cards={cards} />;
};
