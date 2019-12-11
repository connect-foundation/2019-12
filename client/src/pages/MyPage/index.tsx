import React from 'react';

import MyPageTemplate from './template';
import { LNB } from 'components';

function MyPage(): React.ReactElement {
  return (
    <MyPageTemplate
      lnbTab={
        <LNB
          items={['내 티켓', '호스트', '주최한 이벤트', '프로필', '로그아웃']}
        />
      }
    />
  );
}

export default MyPage;
