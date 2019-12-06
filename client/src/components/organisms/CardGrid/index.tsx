import React from 'react';

import * as S from './style';
import Card from 'components/molecules/Card';
import { Event } from 'types/Event';
import ROUTES from 'commons/constants/routes';

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
            price={card.ticketType.price}
            to={`${ROUTES.EVENT_DETAIL}/${card.id}`}
          />
        ))}
      </S.CardGridContainer>
      <div ref={setRef}></div>
    </>
  );
}

export default CardGrid;
