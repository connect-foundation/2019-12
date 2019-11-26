import React from 'react';
import { text } from '@storybook/addon-knobs';
import GoogleMap from '.';

export default {
  title: 'Atoms / GoogleMap',
};

export const index: React.FC = () => (
  <GoogleMap address={text('address', '강남역')} />
);
