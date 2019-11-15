import React from 'react';
import { text, boolean } from '@storybook/addon-knobs';

import Label from '../../src/components/atoms/Label';

export default {
  title: 'Components | Atom / Label',
};

export const label: React.FC = () => (
  <Label
    name={text('name', '이메일 주소')}
    required={boolean('required', true)}
  />
);
