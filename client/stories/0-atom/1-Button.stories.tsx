import React from 'react';
import { text } from '@storybook/addon-knobs';

import LogoBtn from '../../src/components/atoms/LogoBtn';
import Btn from '../../src/components/atoms/Btn';

export default {
  title: 'Components | Atom / Button',
};

export const logo: React.FC = () => <LogoBtn />;

export const btn: React.FC = () => (
  <Btn content={text('content', '일반 버튼')} />
);
