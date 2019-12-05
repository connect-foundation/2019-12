import React from 'react';
import GoogleMap from '.';
import { number } from '@storybook/addon-knobs';

export default {
  title: 'Atoms / GoogleMap',
};

export const index: React.FC = () => {
  const latitude = number('latitude', 37.5662952);
  const longitude = number('longitude', 126.9779451);

  return <GoogleMap {...{ latitude, longitude }} />;
};
