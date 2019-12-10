import React from 'react';

import * as S from './style';
import ROUTES from 'commons/constants/routes';
import { Header, Footer, Divider, Loading } from 'components';

interface Props {
  loading?: boolean;
  internalServerError?: boolean;
  children: React.ReactNode;
  hasHeaderLine?: boolean;
}

function BasedTemplate({
  children,
  loading = false,
  internalServerError = false,
  hasHeaderLine = false,
}: Props): React.ReactElement {
  const conditionalRender = () => {
    if (internalServerError)
      return (
        <S.InternalServerError
          alt="500 Internal Server Error"
          src="https://kr.object.ncloudstorage.com/bookus/internalServerError.png"
          to={ROUTES.HOME}
        />
      );
    if (loading) return <Loading />;
    return children;
  };
  return (
    <>
      <S.HeaderWrapper>
        <Header />
      </S.HeaderWrapper>
      {hasHeaderLine && <Divider borderWidth={'0.05rem'} />}
      <S.ChildrenWrapper>{conditionalRender()}</S.ChildrenWrapper>
      <S.FooterWrapper>
        <Footer />
      </S.FooterWrapper>
    </>
  );
}

export default BasedTemplate;
