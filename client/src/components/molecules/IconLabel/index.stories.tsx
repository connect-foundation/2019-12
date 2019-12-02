import React from 'react';
import { text, object } from '@storybook/addon-knobs';

import IconLabel from '.';
import Check from '../../../assets/img/check-black.svg';

export default {
  title: 'Molecules / IconLabel',
};

export const index: React.FC = () => (
  <IconLabel
    iconProps={object('iconProps', {
      height: '1.5rem',
      alt: 'check',
      src: Check,
    })}
    labelStr={text('labelStr', '1인당 2개 구입 가능')}
  />
);
