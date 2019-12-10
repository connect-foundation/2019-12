import React from 'react';
import MyPageLNB from '.';

export default {
  title: 'Molecules / MyPageLNB',
};

export const index: React.FC = () => {
  return (
    <MyPageLNB
      items={['내 티켓', '호스트', '주최한 이벤트', '프로필', '로그아웃']}
    />
  );
};
