import React from 'react';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import IconBtn from '.';
import ExternalLinkSymbol from 'assets/img/external-link-black.svg';
import ExternalLinkSymbolColored from 'assets/img/external-link-colored.svg';
const tempCircleImgSrc =
  'https://cf.festa.io/default-images/host-profiles/Profile-00047.jpg';

export default {
  title: 'Molecules / IconBtn',
};

export const index: React.FC = () => (
  <IconBtn
    iconSrc={ExternalLinkSymbol}
    content={text('content', 'IconButton')}
    styletype={'primary'}
    onClick={action('onClick')}
  />
);

export const fullid: React.FC = () => (
  <IconBtn
    fullid={true}
    iconSrc={ExternalLinkSymbol}
    content={text('content', 'IconButton')}
    styletype={'primary'}
    onClick={action('onClick')}
  />
);

export const circleImg: React.FC = () => (
  <IconBtn
    height={'2rem'}
    iconSrc={ExternalLinkSymbol}
    hoveredIconSrc={ExternalLinkSymbolColored}
    circleImgSrc={tempCircleImgSrc}
    content={text('content', 'IconButtonWithCircleImg')}
    styletype={'transparent-hover'}
  />
);
