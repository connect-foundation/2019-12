import React from 'react';

import * as S from './style';
import logoGray from '../../../assets/img/logo-gray.svg';
import { FOOTER_INFO } from '../../../commons/constants/string';


function Footer(): React.ReactElement {
  return (
    <>
      <S.Img alt={'Logo'} src={logoGray} />
      <S.Info>{FOOTER_INFO}</S.Info>
    </>
  );
}

export default Footer;
