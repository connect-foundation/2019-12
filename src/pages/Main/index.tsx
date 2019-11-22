import React from 'react';

import MainTemplate from './template';
import MainBanner from '../../components/organisms/MainBanner';

function Main(): React.ReactElement {
  return <MainTemplate mainBanner={<MainBanner />}></MainTemplate>;
}

export default Main;
