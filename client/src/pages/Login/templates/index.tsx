import React from 'react';

import * as S from './style';

interface Props {
  logoImg: React.ReactNode;
  socialLoginLabel: React.ReactNode;
  oauthContent: React.ReactNode;
}

function LoginTemplate({
  logoImg,
  socialLoginLabel,
  oauthContent,
}: Props): React.ReactElement {
  return (
    <S.Container>
      <S.LogoWrapper>{logoImg}</S.LogoWrapper>
      <S.OauthContainer>
        <S.SocialLoginWrapper>{socialLoginLabel}</S.SocialLoginWrapper>
        {oauthContent}
      </S.OauthContainer>
    </S.Container>
  );
}

export default LoginTemplate;
