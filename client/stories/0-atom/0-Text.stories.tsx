import React from 'react';
import { text } from '@storybook/addon-knobs';
import Logo from '../../src/commons/components/atoms/Logo';

export default {
  title: 'Components|Atom/Text',
};

export const logo: React.FC = () => (
  <Logo content={text('logoText', 'Bookus')} />
);

export const primarybutton: React.FC = () => (
  <Logo content={text('logoText', 'Bookus')} />
);
