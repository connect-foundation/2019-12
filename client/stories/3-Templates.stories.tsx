import React from 'react';
import { text } from '@storybook/addon-knobs';
import Logo from '../src/commons/components/atoms/Logo';

export default {
  title: 'Components|Templates',
};

export const MainHeader: React.FC = () => (
  <Logo content={text('logoText', 'Bookus')} />
);

export const Footer: React.FC = () => (
  <Logo content={text('logoText', 'Bookus')} />
);
