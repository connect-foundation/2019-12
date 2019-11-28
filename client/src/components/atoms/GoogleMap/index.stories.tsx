import React from 'react';
import { text } from '@storybook/addon-knobs';
import GoogleMap from '.';

export default {
  title: 'Atoms / GoogleMap',
};

// default: seoul city hall
const defaultLocation = {
  lat: 37.5662952,
  lng: 126.9779451,
};

export const index: React.FC = () => <GoogleMap location={defaultLocation} />;
