import * as React from 'react';
import Logo from '../../commons/components/atoms/Logo';
import OAuthBtn from './OAuthBtn';

const Login: React.FC = () => {
  return (
    <div className="Login">
      <Logo content={'Bookus!'} />
      <OAuthBtn />
    </div>
  );
};

export default Login;
