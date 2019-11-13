import React from 'react';
import { text } from '@storybook/addon-knobs';
import Logo from '../../src/commons/components/atoms/Logo';

export default {
  title: 'Components|Organisms/Form',
};

export const TicketForm = () => <Logo content={text('logoText', 'Bookus')} />;
