import React from 'react';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

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
