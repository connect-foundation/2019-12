import React from 'react';
import { text } from '@storybook/addon-knobs';

import LogoBtn from '../../src/components/atoms/LogoBtn';
import AccountBtn from '../../src/components/atoms/AccountBtn';
import CreateEventBtn from '../../src/components/atoms/CreateEventBtn';

export default {
  title: 'Components | Atom / Button',
};

export const logo: React.FC = () => <LogoBtn />;

export const accountBtn: React.FC = () => (
  <AccountBtn content={text('content', '가입 혹은 로그인')} />
);

export const createEventBtn: React.FC = () => <CreateEventBtn />;
