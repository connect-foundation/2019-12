import React from 'react';
import EventDetailTemplate from '.';

export default {
  title: 'Templates / EventDetailTemplate',
};

const data = {
  id: 4,
  userId: 2,
  title: 'GDG Devfest 2017',
  startAt: '2017-11-19T03:30:00.000Z',
  endAt: '2017-11-19T08:00:00.000Z',
  place: '서울대 글로벌 컨벤션 플라자',
  address: '서울대 글로벌 컨벤션 플라자',
  placeDesc:
    '글로벌컨벤션플라자는 글로벌공학교육센터 내 전문 컨벤션 시설로 최대 9개 세션 약 1,000명을 동시에 수용할 수 있는 규모를 갖추고 있습니다. 또한, 전면 유리로 된 건물로 각 실에서 관악산의 수려한 경관을 감상하실 수 있습니다. 주차는 지원되지 않습니다. 가급적 대중교통을 이용해주세요.',
  mainImg: 'https://bookus.kr.object.ncloudstorage.com/4',
  desc:
    '<p class="p3">&nbsp;</p><img src="/devfest-image.png" /><p class="p3">&nbsp;</p><h1 class="p1">개발자들의 신나는 페스티벌</h1><p class="p2">Android, Firebase, Google Cloud Platform, TensorFlow, Web <span class="s2">등 최신<span class="s1"> Google </span>개발자 기술 콘텐츠를 만나보세요<span class="s1">!</span></p><p class="p1">서로 지식을 교환하고<span class="s1">, </span>아이디어를 공유하고<span class="s1">, </span>기술에 대한 열정을 표출하는</p><p class="p1">개발자들의 축제에 여러분을 초대합니다<span class="s1">.</span></p><p class="p3">&nbsp;</p><h2 class="p4"><strong>GDG Korea</strong></h2><p class="p5"><a href="http://slack.gdg.kr/">GDG Korea</a><span class="s3">&nbsp;</span><span class="s4">에는</span><span class="s3"> 3</span><span class="s4">개의</span> <span class="s4">지역기반</span> <span class="s4">그룹</span><span class="s3">(<a href="https://www.meetup.com/ko-KR/GDG-Seoul/"><span class="s5">GDG Seoul</span></a>,&nbsp;<a href="https://www.meetup.com/ko-KR/GDG-Incheon/"><span class="s5">GDG Incheon</span></a>,&nbsp;<a href="https://www.meetup.com/ko-KR/GDG-Busan/"><span class="s5">GDG Busan</span></a>), 2</span><span class="s4">개의</span> <span class="s4">기술기반</span> <span class="s4">그룹</span><span class="s3">(<a href="https://www.meetup.com/ko-KR/GDG-Korea-Android/"><span class="s5">GDG Korea Android</span></a>,&nbsp;<a href="https://www.meetup.com/ko-KR/GDG-WebTech/"><span class="s5">GDG Korea WebTech</span></a>), 1</span><span class="s4">개의</span> <span class="s4">스페셜한</span> <span class="s4">그룹</span><span class="s3">(<a href="https://www.meetup.com/ko-KR/GDG-Campus/"><span class="s5">GDG Korea Campus</span></a>)</span><span class="s4">이</span> <span class="s4">있습니다</span><span class="s3">.</span></p><p class="p3">&nbsp;</p><h2 class="p6"><strong>What is GDG?</strong></h2><p class="p7"><span class="s6"><a href="https://developers.google.com/groups/">Google Developers Group (GDG)</a></span>는 전 세계<span class="s1"> 100</span>여 국<span class="s1">, 550</span>여개의 챕터가 있으며<span class="s1">, </span>한국에는 현재<span class="s1"> 7</span>개의 챕터가 있습니다<span class="s1">. Google </span>기술에 관심이 있는 개발자라면 누구나<span class="s1"> GDG </span>맴버가 될 수 있습니다<span class="s1">. </span>구글기술에 관심이 있는 많은 개발자들의 네트워크와 구글기술에 대한 활동이 이어지는 모임으로 진행될 것입니다<span class="s1">. </span>아직<span class="s1"> GDG Korea</span>에 참여를 고민하시나요<span class="s1">? </span>고민하지 마시고 편한 마음으로 참여하십시요<span class="s1">.</span></p><p class="p3">&nbsp;</p>',
  ticketTypes: [
    {
      id: 4,
      eventId: 4,
      name: '일반 티켓',
      desc: '개발자들을 위한 축제에 초대합니다',
      price: 10000,
      quantity: 100,
      leftCnt: 89,
      isPublicLeftCnt: false,
      maxCntPerPerson: 1,
      salesStartAt: '2018-01-29T15:51:10.000Z',
      salesEndAt: '2018-12-31T21:00:00.000Z',
      refundEndAt: '2018-12-31T21:00:00.000Z',
    },
  ],
  user: {
    id: 2,
    lastName: '조',
    firstName: '성동',
  },
};

export const index: React.FC = () => {
  return (
    <div style={{ width: '1060px' }}>
      <EventDetailTemplate data={data} />
    </div>
  );
};
