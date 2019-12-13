import React from 'react';
import { text } from '@storybook/addon-knobs';

import IconLabel from '.';
import { FaCheck } from 'react-icons/fa';

export default {
  title: 'Molecules / IconLabel',
};

export const index: React.FC = () => (
  <IconLabel
    icon={<FaCheck size={'1.5rem'} />}
    labelContent={text('labelContent', '1인당 2개 구입 가능')}
  />
);
