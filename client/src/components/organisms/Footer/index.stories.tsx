import React from 'react';
import { text, boolean, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Footer from '.';

export default {
  title: 'Organisms / Footer',
};

export const index: React.FC = () => <Footer />;
