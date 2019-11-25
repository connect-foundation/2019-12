import React from 'react';
import * as S from './style';
import Card from '../../molecules/Card';

interface Props {
  cards: any[];
}

function CardGrid({ cards }: Props): React.ReactElement {
  return (
    <S.CardGridWrapper>
      <S.CardGridContainer>
        {cards.map((val, idx) => (
          <Card
            key={val.id}
            imgSrc={val.mainImg}
            date={val.startAt}
            name={val.title}
            host={'하하,,'}
            price={'1000'}
            to={`/events/${val.id}`}
          />
        ))}
      </S.CardGridContainer>
    </S.CardGridWrapper>
  );
}

export default CardGrid;
