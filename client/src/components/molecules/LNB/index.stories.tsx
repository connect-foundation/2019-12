import React from 'react';
import LNB from '.';

export default {
  title: 'Molecules / LNB',
};

export const index: React.FC = () => {
  return (
    <LNB items={['내 티켓', '호스트', '주최한 이벤트', '프로필', '로그아웃']} />
  );
};
