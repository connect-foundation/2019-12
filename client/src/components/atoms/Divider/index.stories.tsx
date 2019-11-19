import React from 'react';
import { text } from '@storybook/addon-knobs';

import Divider from '.';

export default {
  title: 'Atoms / Divider',
};

export const index: React.FC = () => (
  <div style={{ margin: '2rem' }}>
    <Divider borderWidth={'1px'} type={'solid'} grayScaleLevel={6} />
  </div>
);
