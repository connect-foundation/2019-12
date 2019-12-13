import React from 'react';

import { useHistory } from 'react-router-dom';
import { IconBtn } from 'components';
import { OAUTH_GOOGLE, LOGIN_SOCIAL } from 'commons/constants/string';
import googleSvg from 'assets/img/google.svg';
import LogoSvg from 'assets/img/logo.svg';
import LoginTemplate from './templates';

const { REACT_APP_SERVER_URL } = process.env;

const AuthURL = `${REACT_APP_SERVER_URL}/api/auth?returnTo=/`;

function Login(): React.ReactElement {
  const history = useHistory();

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
              window.location.href = AuthURL;
            },
          }}
          fullid
          circleImgSrc={googleSvg}
          children={OAUTH_GOOGLE}
        />
      }
    />
  );
}

export default Login;
