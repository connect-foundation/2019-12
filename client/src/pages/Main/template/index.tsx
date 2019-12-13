import React from 'react';
import * as S from './style';
import BasedTemplate from 'pages/BasedTemplate/templates';

interface Props {
  mainBanner: React.ReactNode;
  cardGrid: React.ReactNode;
}

function MainTemplate({ mainBanner, cardGrid }: Props): React.ReactElement {
  return (
    <BasedTemplate>
      <S.MainBannerContainer>{mainBanner}</S.MainBannerContainer>
      <S.EventCardGridContainer>{cardGrid}</S.EventCardGridContainer>
    </BasedTemplate>
  );
}

export default MainTemplate;
