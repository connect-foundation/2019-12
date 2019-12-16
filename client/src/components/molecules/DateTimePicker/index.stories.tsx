import React from 'react';
import DateTimePicker from '.';

export default {
  title: 'Molecules / DateTimePicker',
};

export const index: React.FC = () => {
  return (
    <DateTimePicker
      range={true}
      firstLabelName="시작"
      firstPlaceholder="시작날짜"
      secondLabelName="종료"
    />
  );
};
