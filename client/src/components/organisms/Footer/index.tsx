import React from 'react';

import * as S from './style';
import logoGray from 'assets/img/logo-gray.svg';
import { FOOTER_INFO } from 'commons/constants/string';
import { Divider } from 'components';

function Footer(): React.ReactElement {
  return (
    <>
      <Divider />
      <S.Container>
        <S.Img alt={'Logo'} src={logoGray} />
        <S.Info>{FOOTER_INFO}</S.Info>
      </S.Container>
    </>
  );
}

export default Footer;
