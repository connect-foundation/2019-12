import React from 'react';

import Divider from '.';

export default {
  title: 'Atoms / Divider',
};

export const index: React.FC = () => (
  <Divider borderWidth={'1px'} type={'solid'} grayScaleLevel={6} />
);
