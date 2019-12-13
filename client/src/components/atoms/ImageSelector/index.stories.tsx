import React from 'react';

import ImageSelector from '.';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Atoms / ImageSelector',
};

export const index: React.FC = () => <ImageSelector />;

export const onChange: React.FC = () => (
  <ImageSelector onChange={action('onChange')} />
);
