import React from 'react';

import * as S from './style';
import IconBtn from '../../components/molecules/IconBtn';
import { OAUTH_GOOGLE, LOGIN_SOCIAL } from '../../commons/constants/string';
import googleSvg from '../../assets/img/google.svg';
import LogoSvg from '../../assets/img/logo.svg';
import LoginTemplate from './templates';

const AuthURL = `http://localhost:13000/api/auth?returnTo=/login`;

function Login(): React.ReactElement {
  return (
    <LoginTemplate
      logoImg={<S.LogoImg alt={'Logo'} src={LogoSvg} />}
      socialLoginLabel={<S.SocialLoginLabel>{LOGIN_SOCIAL}</S.SocialLoginLabel>}
      oauthContent={
        <IconBtn
          fullid={true}
          styletype={'transparent-border'}
          src={googleSvg}
          content={OAUTH_GOOGLE}
          alt={OAUTH_GOOGLE}
          onClick={() => {
            window.location.href = AuthURL;
          }}
        />
      }
    />
  );
}

export default Login;
