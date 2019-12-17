import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import DateTimePicker from '.';

export default {
  title: 'Molecules / DateTimePicker',
};

export const index: React.FC = () => {
  return (
    <DateTimePicker
      range={boolean('range', true)}
      firstLabelName={text('firstLabelName', '시작')}
      secondLabelName={text('secondLabelName', '종료')}
      handleOnChange={action('handleOnChange')}
    />
  );
};
