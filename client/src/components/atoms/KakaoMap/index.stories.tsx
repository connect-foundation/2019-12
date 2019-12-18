import React from 'react';
import KakaoMap from '.';
import { number } from '@storybook/addon-knobs';

export default {
  title: 'Atoms / KakaoMap',
};

export const index: React.FC = () => {
  const latitude = number('latitude', 37.5662952);
  const longitude = number('longitude', 126.9779451);

  return <KakaoMap {...{ latitude, longitude }} />;
};
