import React from 'react';
import * as S from './style';
import logo from '../../../assets/img/logo.svg';

function LogoImage(): React.ReactElement {
  return <S.Img alt="Logo" src={logo} />;
}

export default LogoImage;
