import React from 'react';

import * as S from './style';

import ROUTES from 'commons/constants/routes';
import { Header, Footer, Loading } from 'components';

interface Props {
  loading?: boolean;
  internalServerError?: boolean;
  children: React.ReactNode;
}

function BasedTemplate({
  children,
  loading = false,
  internalServerError = false,
}: Props): React.ReactElement {
  return (
    <>
      <S.HeaderWrapper>
        <Header />
      </S.HeaderWrapper>
      <S.ChildrenWrapper>
        {internalServerError ? (
          <S.InternalServerError
            alt="500 Internal Server Error"
            src="https://kr.object.ncloudstorage.com/bookus/internalServerError.png"
            to={ROUTES.HOME}
          />
        ) : loading ? (
          <Loading />
        ) : (
          children
        )}
      </S.ChildrenWrapper>
      <S.FooterWrapper>
        <Footer />
      </S.FooterWrapper>
    </>
  );
}

export default BasedTemplate;
