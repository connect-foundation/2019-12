import React from 'react';
import { text, boolean } from '@storybook/addon-knobs';

import FormItem from '../../src/components/molecules/FormItem';

export default {
  title: 'Components | Molecules / FormItem',
};

export const formItem: React.FC = () => (
  <FormItem
    name={text('name', '이메일 주소')}
    required={boolean('required', true)}
  />
);
