import React from 'react';

import StepList from '.';
import { array, number } from '@storybook/addon-knobs';

export default {
  title: 'Molecules / StepList',
};

export const index: React.FC = () => {
  return (
    <StepList
      steps={array('steps', ['a', 'b', 'c'])}
      pivot={number('pivot', 1)}
    />
  );
};
