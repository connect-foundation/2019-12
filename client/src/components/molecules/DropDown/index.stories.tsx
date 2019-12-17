import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import DropDown from '.';

export default {
  title: 'Molecules / DropDown',
};

const items = [
  {
    title: '서울 중구 남대문로9길 24',
    desc: '패스트파이브타워',
    value: {
      latitude: '37.567139973786',
      longitude: '126.981133316413',
    },
  },
  {
    title: '서울 중구 남대문로9길 24',
    desc: '패스트파이브타워',
    value: {
      latitude: '37.567139973786',
      longitude: '126.981133316413',
    },
  },
];

export const index: React.FC = () => {
  return (
    <DropDown
      visible={boolean('visible', false)}
      items={items}
      handleOnClick={action('handleOnClick')}
    />
  );
};
