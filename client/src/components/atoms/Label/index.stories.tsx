import React from 'react';
import { text, boolean } from '@storybook/addon-knobs';
import Label from '.';

export default {
  title: 'Atoms / Label',
};

export const defaultLabel: React.FC = () => (
  <Label required={boolean('required', false)} name={text('name', '이메일')} />
);

export const requiredLabel: React.FC = () => (
  <Label required={boolean('required', true)} name={text('name', '이메일')} />
);
