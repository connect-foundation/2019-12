import React from 'react';

import MainBanner from '.';
import { select } from '@storybook/addon-knobs';

export default {
  title: 'Organisms / MainBanner',
};

const styleTypeS = {
  label: 'imgSrc',
  options: [
    'https://sprint.kr.object.ncloudstorage.com/tempimages/main-banner-1',
    'https://sprint.kr.object.ncloudstorage.com/tempimages/main-banner-2',
  ],
  defaultValue:
    'https://sprint.kr.object.ncloudstorage.com/tempimages/main-banner-1',
};

export const mainBanner: React.FC = () => {
  return (
    <MainBanner
      imgSrc={select(
        styleTypeS.label,
        styleTypeS.options,
        styleTypeS.defaultValue,
      )}
    />
  );
};
