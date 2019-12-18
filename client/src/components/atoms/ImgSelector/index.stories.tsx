import React from 'react';

import ImgSelector from '.';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Atoms / ImgSelector',
};

export const index: React.FC = () => <ImgSelector />;

export const onChange: React.FC = () => (
  <ImgSelector onChange={action('onChange')} />
);

export const limitMaxSize10MB: React.FC = () => (
  <ImgSelector maxSize={1024 * 1024 * 10} />
);
