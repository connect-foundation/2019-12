import React from 'react';
import * as S from './style';
import BasedTemplate from 'pages/BasedTemplate/templates';

interface Props {
  content: React.ReactNode;
}

function NotFoundTemplate({ content }: Props): React.ReactElement {
  return (
    <BasedTemplate>
      <S.ContentContainer>{content}</S.ContentContainer>
    </BasedTemplate>
  );
}

export default NotFoundTemplate;
