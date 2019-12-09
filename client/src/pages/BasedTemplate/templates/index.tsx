import React from 'react';

import * as S from './style';

import ROUTES from 'commons/constants/routes';
import { Header, Footer, Loading } from 'components';

interface Props {
  loading?: boolean;
  internalServerError?: boolean;
  notFoundError?: boolean;
  children: React.ReactNode;
}

function BasedTemplate({
  children,
  loading = false,
  internalServerError = false,
  notFoundError = false,
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
    if (notFoundError)
      return (
        <S.InternalServerError
          alt="404 Not Found Error"
          src="https://kr.object.ncloudstorage.com/bookus/notfound.jpg"
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
      <S.ChildrenWrapper>{conditionalRender()}</S.ChildrenWrapper>
      <S.FooterWrapper>
        <Footer />
      </S.FooterWrapper>
    </>
  );
}

export default BasedTemplate;
