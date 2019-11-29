import React from 'react';

import * as S from './style';
import IconBtn from '../../components/molecules/IconBtn';
import { OAUTH_GOOGLE, LOGIN_SOCIAL } from '../../commons/constants/string';
import googleSvg from '../../assets/img/google.svg';
import LogoSvg from '../../assets/img/logo.svg';
import LoginTemplate from './templates';

const { REACT_APP_SERVER_URL } = process.env;

const AuthURL = `${REACT_APP_SERVER_URL}/api/auth?returnTo=/login`;

function Login(): React.ReactElement {
  return (
    <LoginTemplate
      logoImg={<S.LogoImg alt={'Logo'} src={LogoSvg} />}
      socialLoginLabel={<S.SocialLoginLabel>{LOGIN_SOCIAL}</S.SocialLoginLabel>}
      oauthContent={
        <IconBtn
          fullid={true}
          styletype={'transparent-border'}
          iconSrc={googleSvg}
          content={OAUTH_GOOGLE}
          onClick={() => {
            window.location.href = AuthURL;
          }}
        />
      }
    />
  );
}

export default Login;
