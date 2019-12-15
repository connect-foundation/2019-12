import React from 'react';
import { text } from '@storybook/addon-knobs';

import Img from '.';

export default {
  title: 'Atoms / Img',
};

export const index: React.FC = () => (
  <div style={{ padding: '1rem', backgroundColor: 'gray' }}>
    <div style={{ width: '100%' }}>
      <Img
        alt={text('alt', 'main banner img')}
        src={
          'https://sprint.kr.object.ncloudstorage.com/tempimages/main-banner-1'
        }
      />
    </div>
    <div style={{ width: '100%' }}>
      <Img
        alt={text('alt', 'main banner img')}
        src={
          'https://sprint.kr.object.ncloudstorage.com/tempimages/main-banner-2'
        }
      />
    </div>
  </div>
);
