import React from 'react';

import * as S from './style';
import Header from '../../../components/organisms/Header';
import Footer from '../../../components/organisms/Footer';

interface Props {
  contentComponent: React.FC;
}

function Page({ contentComponent }: Props): React.ReactElement {
  return (
    <S.Container>
      <Header userNameText={'Sungdong Jo'} />
      {contentComponent({})}
      <Footer />
    </S.Container>
  );
}

export default Page;
