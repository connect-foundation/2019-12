import React from 'react';

import EventSection from '.';
import { text, array } from '@storybook/addon-knobs';

export default {
  title: 'Organisms / EventSection',
};

export const index: React.FC = () => (
  <div style={{ width: '40rem' }}>
    <EventSection
      title={text('title', '국토도시 빅데이터 윈터스쿨(중급반)')}
      subtitle={array('subtitle', ['일시', '주최'])}
      content={array('content', [
        '2019년 12월 20일 (금) 오전 09:00\n- 12월 22일 (일) 오후 06:00',
        'DACON',
      ])}
      place={text(
        'place',
        '서울특별시 종로구 중학동 19 더케이트윈타워 A동 11층',
      )}
      imgSrc={
        'https://cf.festa.io/img/2019-11-31/42d5aedc-0f66-44a4-a288-0086ff5836c1.png'
      }
      imgPosition={text('imgPosition', 'top') as 'top' | 'left'}
    />
  </div>
);
