import React from 'react';
import * as S from './style';
import Card from '../../molecules/Card';
import { Event } from '../../../types/Event';

interface Props {
  cards: Event[];
  setRef?: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

function CardGrid({ cards, setRef }: Props): React.ReactElement {
  return (
    <S.CardGridWrapper>
      <S.CardGridContainer>
        {cards.map(card => (
          <Card
            key={card.id}
            imgSrc={card.mainImg}
            date={card.startAt}
            title={card.title}
            host={card.user.lastName + card.user.firstName}
            price={card.ticketType.price}
            to={`/events/${card.id}`}
          />
        ))}
      </S.CardGridContainer>
      <div ref={setRef}></div>
    </S.CardGridWrapper>
  );
}

export default CardGrid;
