import React from 'react';

import * as S from './style';
import { Header, Footer, Divider } from 'components';

interface Props {
  children: React.ReactNode;
  hasHeaderLine?: boolean;
}

function BasedTemplate({
  children,
  hasHeaderLine = false,
}: Props): React.ReactElement {
  return (
    <S.Container>
      <S.HeaderWrapper>
        <Header />
      </S.HeaderWrapper>
      {hasHeaderLine && <Divider borderWidth={'0.05rem'} />}
      <S.ChildrenWrapper>{children}</S.ChildrenWrapper>
      <S.FooterWrapper>
        <Footer />
      </S.FooterWrapper>
    </S.Container>
  );
}

export default BasedTemplate;
