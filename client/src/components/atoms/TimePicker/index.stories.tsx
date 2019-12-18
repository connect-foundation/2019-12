import React from 'react';
import { action } from '@storybook/addon-actions';
import TimePicker from '.';

export default {
  title: 'Atoms / TimePicker',
};

export const index: React.FC = () => {
  return <TimePicker onChange={action('time changed')} />;
};
