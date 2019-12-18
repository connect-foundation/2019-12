import React from 'react';
import { action } from '@storybook/addon-actions';
import { FaExternalLinkAlt } from 'react-icons/fa';

import IconBtn from '.';

const tempCircleImgSrc =
  'https://cf.festa.io/default-images/host-profiles/Profile-00047.jpg';

export default {
  title: 'Molecules / IconBtn',
};

export const index: React.FC = () => (
  <IconBtn
    btnProps={{
      styletype: 'primary',
      onClick: action('onClick'),
    }}
    icon={FaExternalLinkAlt}
    noneIconColor={'black'}
    circleImgSrc={tempCircleImgSrc}
  >
    Hello
  </IconBtn>
);
