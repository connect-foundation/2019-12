import * as React from 'react';
import styled from 'styled-components';

import Logo from '../../commons/components/atoms/Logo'

const LoginPage = styled.div`
  color: #2c2c2c;
`;

const Login: React.FC = () => {
    return (
        <LoginPage className="Login">
            <Logo content={'Bookus!'}/>
        </LoginPage>
    )
}

export default Login;