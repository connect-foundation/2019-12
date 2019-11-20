import React from 'react';
import { text, boolean, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Icon from '.';
import ExternalLinkSymbol from '../../../assets/img/external-link-symbol.svg';

export default {
  title: 'Atoms / Icon',
};

export const index: React.FC = () => (
  <Icon
    alt={text('alt', 'External Link Icon')}
    height={text('height', '2rem')}
    src={ExternalLinkSymbol}
  />
);
