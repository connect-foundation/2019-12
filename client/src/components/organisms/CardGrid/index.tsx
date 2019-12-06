import React from 'react';
import * as S from './style';
import Card from 'components/molecules/Card';
import { EventsState } from 'types/States';

interface Props {
  eventsState: EventsState;
  setRef?: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

function CardGrid({ eventsState, setRef }: Props): React.ReactElement {
  return (
    <>
      <S.CardGridContainer>
        {eventsState.order!.map(index => {
          const {
            id,
            mainImg,
            startAt,
            title,
            user,
            ticketType,
          } = eventsState.events.get(index)!;
          return (
            <Card
              key={id}
              imgSrc={mainImg}
              date={startAt}
              title={title}
              host={user.lastName + user.firstName}
              price={ticketType.price}
              to={`/events/${id}`}
            />
          );
        })}
      </S.CardGridContainer>
      <div ref={setRef}></div>
    </>
  );
}

export default CardGrid;
