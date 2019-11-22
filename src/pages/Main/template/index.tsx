import React from 'react';
import * as S from './style';
import Template from '../../BasicPage/templates';

interface Props {
  mainBanner: React.ReactNode;
  // content: React.ReactNode;
}

function MainTemplate({ mainBanner }: Props): React.ReactElement {
  return (
    <Template>
      <S.MainBannerContainer>{mainBanner}</S.MainBannerContainer>
      <S.EventCardGridContainer></S.EventCardGridContainer>
    </Template>
  );
}

export default MainTemplate;
