import React from 'react';
import { text, boolean, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import IconBtn from '.';
import ExternalLinkSymbol from '../../../assets/img/external-link-symbol.svg';

export default {
  title: 'Molecules / IconBtn',
};

export const index: React.FC = () => (
  <IconBtn
    alt={text('alt', 'External Link Icon')}
    height={text('height', '2rem')}
    src={ExternalLinkSymbol}
    content={text('content', 'IconButton')}
    styleType={'primary'}
    onClick={action('onClick')}
  />
);
