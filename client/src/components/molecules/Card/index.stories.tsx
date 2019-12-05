import React from 'react';
import { text, number } from '@storybook/addon-knobs';

import Card from '.';

export default {
  title: 'Molecules / Card',
};

export const index: React.FC = () => (
  <div style={{ width: '1060px' }}>
    <Card
      to={text('to', '/')}
      imgSrc={text(
        'imgSrc',
        'https://cf.festa.io/img/2019-11-19/40e8a4ca-afc3-43aa-a0a1-436b25dadbef.png',
      )}
      date={text('data', '2019년 12월 04일 오후 7:30')}
      title={text('title', 'Jenkins Korea Meetup #1 19/12/4(수) 19:30 ~ 21:00')}
      host={text('host', '이청규')}
      price={number('price', 3000)}
    />
  </div>
);
