import React from 'react';
import { text } from '@storybook/addon-knobs';
import Logo from '../../src/commons/components/atoms/Logo';

export default {
  title: 'Components|Atom/Text'
};

export const logo = () => <Logo content={text('logoText', 'Bookus')} />;
export const primarybutton = () => (
  <Logo content={text('logoText', 'Bookus')} />
);
