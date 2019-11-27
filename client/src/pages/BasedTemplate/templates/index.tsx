import React from 'react';

import * as S from './style';
import Header from '../../../components/organisms/Header';
import Footer from '../../../components/organisms/Footer';

interface Props {
  children: React.ReactNode;
}

function BasedTemplate({ children }: Props): React.ReactElement {
  return (
    <S.Container>
      <S.HeaderWrapper>
        <Header userNameText={'Sungdong Jo'} />
      </S.HeaderWrapper>
      <S.ChildrenWrapper>{children}</S.ChildrenWrapper>
      <S.FooterWrapper>
        <Footer />
      </S.FooterWrapper>
    </S.Container>
  );
}

export default BasedTemplate;
