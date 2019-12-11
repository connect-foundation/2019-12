import React from 'react';
import TuiViewer from '.';

export default {
  title: 'Atoms / TuiViewer',
};

const content =
  '<p><img src="https://cf.festa.io/img/2019-10-25/9b5b949f-5b29-48ad-a389-ccf9b37bcc4e.jpeg" /></p> <h1><strong>kakao FE(Front end) meetup</strong></h1> <p>kakao의 FE개발자들은 신뢰를 바탕으로 서로 충돌, 헌신하며 더 나은 세상을 만들어가는 방법을 찾아가고 있습니다. 우수한 서비스를 완성하기 위해 어떤 치열한 고민을 했는지 kakao의 FE개발자들의 일하는 방식을 소개하고 더 많은 FE개발자들과 다양한 인사이트를 공유하는 시간을 마련했습니다.</p> <p> </p> <h3>일시</h3> <p>11월13일 수요일 19:00 - 21:00 (18:30부터 입장 가능합니다)</p> <h3>장소</h3> <p>D.CAMP<br />(서울특별시 강남구 선릉로 551 새롬빌딩 6층 다목적홀)</p> <h3>일정</h3> <p>19:00                    오프닝<br />19:05  - 19:35    프렌즈타임 웹앱 삽질기<br />19:35  - 19:45    휴식시간<br />19:45  - 20:15    카카오커머스를 지탱하는 Angular<br />20:15  - 20:25   휴식시간<br />20:25 - 20:55    바닥부터 시작하는 Vue테스트와 리팩토링<br />21:00                   종료</p> <h3>문의</h3> <p><a href="mailto:tech@kakaocorp.com" target="_blank">tech@kakaocorp.com</a></p> <h3>안내</h3> <p>- 현장등록이 불가능합니다. 신청자만 입장 가능합니다.<br />- 행사 공간이 넉넉치 않아 모든 신청자를 모시기 어렵습니다. 신청자 중 추첨을 통해 선정이 완료되면 신청해주신 이메일로 개별적으로 안내 드릴 예정입니다.<br />- 건물 내 주차장은 별도 등록이 필요하여, 지원해드리기 어렵습니다. 이 점 양해 부탁 드리며, 대중교통을 이용해주세요.<br />- 다음 행사 안내를 위한 개인정보 수집에 동의하지 않은 신청정보는 행사 종료 후 폐기되며, 이 외의 목적으로 사용되지 않습니다.<br /><strong>- 공간후원 : 은행권청년창업재단 D.CAMP</strong></p> <p> </p>';

export const index: React.FC = () => {
  return <TuiViewer content={content} />;
};
