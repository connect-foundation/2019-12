import React, { useState } from 'react';

import { EventsState } from 'types/States';
import MyPageTemplate from './template';
import { LNB, CardGrid } from 'components';

function MyPage(): React.ReactElement {
  const [templateStep, setTemplateStep] = useState(1);
  const [boughtEvents, setBoughtEvents] = useState([]);

  return (
    <MyPageTemplate
      step={templateStep}
      lnbTab={
        <LNB
          items={['내 티켓', '주최한 이벤트', '로그아웃']}
          onTabClicked={tabIndex => {
            setTemplateStep(tabIndex);
          }}
        />
      }
      ticketsProps={{
        title: '구매 완료한 티켓',
        cardGrid: <></>,
      }}
      createdEventsProps={{}}
    />
  );
}

export default MyPage;
