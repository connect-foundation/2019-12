import React from 'react';

import * as S from './style';
import { CardGrid } from 'components';

export interface Props {
  title: string;
  cardGrid: React.ReactNode;
}

function TicketsTemplate({ title, cardGrid }: Props): React.ReactElement {
  return (
    <>
      <S.Title>{title}</S.Title>
      <S.CardGridWrapper>{cardGrid}</S.CardGridWrapper>
    </>
  );
}

export default TicketsTemplate;
