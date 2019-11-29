import React from 'react';
import * as S from './style';

interface Props {
  header: React.ReactNode;
  content: React.ReactNode;
}

function SignUpTemplate({ header, content }: Props): React.ReactElement {
  return (
    <S.ContainerWrapper>
      <S.Container>
        <S.Header>{header}</S.Header>
        <S.Content>{content}</S.Content>
      </S.Container>
    </S.ContainerWrapper>
  );
}

export default SignUpTemplate;
