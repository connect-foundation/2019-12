import React from 'react';

import * as S from './style';
import { Card } from 'components';
import ROUTES from 'commons/constants/routes';
import { EventDetail } from 'types/Data';

interface Props {
  events: Map<number, EventDetail>;
  eventsOrder: number[];
  setRef?: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

function CardGrid({ events, eventsOrder, setRef }: Props): React.ReactElement {
  return (
    <>
      <S.CardGridContainer>
        {eventsOrder.map((eventIndex, index) => {
          const { id, mainImg, startAt, title, user, ticketType } = events.get(
            eventIndex,
          )!;
          return (
            <Card
              key={id}
              imgSrc={mainImg}
              date={startAt}
              title={title}
              host={user.lastName + user.firstName}
              price={ticketType.price}
              to={`${ROUTES.EVENT_DETAIL}/${id}`}
              setRef={eventsOrder.length - 1 === index ? setRef : undefined}
            />
          );
        })}
      </S.CardGridContainer>
    </>
  );
}

export default CardGrid;
