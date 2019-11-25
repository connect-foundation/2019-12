import React from 'react';
import * as S from './style';
import Template from '../../BasicPage/templates';

interface Props {
  mainBanner: React.ReactNode;
  cardGrid: React.ReactNode;
}

function MainTemplate({ mainBanner, cardGrid }: Props): React.ReactElement {
  return (
    <Template>
      <S.MainBannerContainer>{mainBanner}</S.MainBannerContainer>
      <S.EventCardGridContainer>{cardGrid}</S.EventCardGridContainer>
    </Template>
  );
}

export default MainTemplate;
