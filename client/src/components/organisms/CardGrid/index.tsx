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
    <>
      <S.CardGridContainer>
        {cards.map(card => (
          <Card
            key={card.id}
            imgSrc={card.mainImg}
            date={card.startAt}
            title={card.title}
            host={card.user.lastName + card.user.firstName}
            price={card.ticketTypes[0].price} // TODO: db 수정 후 바꿔야함
            to={`/events/${card.id}`}
          />
        ))}
      </S.CardGridContainer>
      <div ref={setRef}></div>
    </>
  );
}

export default CardGrid;
