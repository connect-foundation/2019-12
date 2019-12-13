import React from 'react';
import { text } from '@storybook/addon-knobs';

import Icon from '.';
import LogoSvg from 'assets/img/logo.svg';

export default {
  title: 'Atoms / Icon',
};

export const index: React.FC = () => (
  <div style={{ padding: '1rem', backgroundColor: 'gray' }}>
    <Icon
      alt={text('alt', 'Google')}
      height={text('height', '2rem')}
      src={LogoSvg}
    />
  </div>
);

export const circular: React.FC = () => (
  <div style={{ padding: '1rem', backgroundColor: 'gray' }}>
    <Icon
      alt={text('alt', 'Google')}
      height={text('height', '2rem')}
      src={LogoSvg}
      circular
    />
  </div>
);
