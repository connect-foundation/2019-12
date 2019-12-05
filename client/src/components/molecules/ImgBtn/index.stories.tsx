import React from 'react';
import { text } from '@storybook/addon-knobs';

import ImgBtn from '.';

export default {
  title: 'Molecules / ImgBtn',
};

export const imgBtn: React.FC = () => (
  <ImgBtn
    src="https://sprint.kr.object.ncloudstorage.com/tempimages/main-banner-1"
    alt={text('alt', 'img btn alt')}
    href="http://naver.com"
  />
);
