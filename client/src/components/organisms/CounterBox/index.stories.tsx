import React from 'react';

import CounterBox from '.';

export default {
  title: 'Organisms / CounterBox',
};

export const index: React.FC = () => {
  return (
    <CounterBox label={'수량'} counterProps={{ minCount: 1, maxCount: 5 }} />
  );
};
