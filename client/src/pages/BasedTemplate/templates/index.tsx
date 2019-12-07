import React from 'react';

import * as S from './style';
import Header from 'components/organisms/Header';
import Footer from 'components/organisms/Footer';
import Loading from 'components/atoms/Loading';

interface Props {
  loading?: boolean;
  children: React.ReactNode;
}

function BasedTemplate({
  children,
  loading = false,
}: Props): React.ReactElement {
  return (
    <S.Container>
      <S.HeaderWrapper>
        <Header />
      </S.HeaderWrapper>
      <S.ChildrenWrapper>{loading ? <Loading /> : children}</S.ChildrenWrapper>
      <S.FooterWrapper>
        <Footer />
      </S.FooterWrapper>
    </S.Container>
  );
}

export default BasedTemplate;
