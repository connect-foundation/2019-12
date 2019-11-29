import React from 'react';
import { text } from '@storybook/addon-knobs';

import Icon from '.';
import ExternalLinkSymbol from '../../../assets/img/external-link-symbol.svg';

export default {
  title: 'Atoms / Icon',
};

export const index: React.FC = () => (
  <div style={{ padding: '1rem', backgroundColor: 'gray' }}>
    <Icon
      alt={text('alt', 'External Link Icon')}
      height={text('height', '2rem')}
      src={ExternalLinkSymbol}
    />
  </div>
);

export const circular: React.FC = () => (
  <div style={{ padding: '1rem', backgroundColor: 'gray' }}>
    <Icon
      alt={text('alt', 'External Link Icon')}
      height={text('height', '2rem')}
      src={ExternalLinkSymbol}
      circular={true}
    />
  </div>
);
