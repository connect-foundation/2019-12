import React from 'react';

import * as S from './style';

export interface Props {
  title: string;
  cardGrid: React.ReactNode;
}

function CreatedEventsTemplate({ title, cardGrid }: Props): React.ReactElement {
  return (
    <>
      <S.Title>{title}</S.Title>
      <S.CardGridWrapper>{cardGrid}</S.CardGridWrapper>
    </>
  );
}

export default CreatedEventsTemplate;
