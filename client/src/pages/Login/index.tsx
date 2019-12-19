import React, { useContext, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { IconBtn } from 'components';
import { OAUTH_GOOGLE, LOGIN_SOCIAL } from 'commons/constants/string';
import googleSvg from 'assets/img/google.svg';
import LogoSvg from 'assets/img/logo.svg';
import LoginTemplate from './templates';
import { AfterLoginState } from 'stores/afterLoginStore';

const { REACT_APP_SERVER_URL } = process.env;

const AuthURL = (returnTo = '/'): string =>
  `${REACT_APP_SERVER_URL}/api/auth?returnTo=${returnTo}`;

function Login(): React.ReactElement {
  const history = useHistory();
  const loginCallbackState = useContext(AfterLoginState);

  useEffect(() => {
    console.log(loginCallbackState);
  }, [loginCallbackState]);

  return (
    <LoginTemplate
      logoImg={
        <img
          alt={'Logo'}
          src={LogoSvg}
          onClick={() => {
            history.push('/');
          }}
        />
      }
      socialLoginLabel={LOGIN_SOCIAL}
      oauthContent={
        <IconBtn
          btnProps={{
            styletype: 'transparent-border',
            onClick: () => {
              window.location.href = AuthURL(loginCallbackState);
            },
          }}
          fullid
          noneIconColor={'black'}
          circleImgSrc={googleSvg}
          children={OAUTH_GOOGLE}
        />
      }
    />
  );
}

export default Login;
