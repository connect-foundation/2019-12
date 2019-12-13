import React, { useCallback } from 'react';

import * as S from './style';
import { Card } from 'components';
import { useIntersect } from 'hooks';
import ROUTES from 'commons/constants/routes';
import { EventCard } from 'types/Data';

interface Props {
  events: Map<number, EventCard>;
  eventsOrder: number[];
  requestNextData?: () => void;
}

const fn = (): void => {};

function CardGrid({
  events,
  eventsOrder,
  requestNextData,
}: Props): React.ReactElement {
  const getNextEventsTrigger = useCallback(requestNextData || fn, [
    requestNextData,
  ]);

  const [, setRef] = useIntersect(intersectCallback, {
    root: null,
    threshold: 1.0,
    rootMargin: '0% 0% 50% 0%',
  });

  async function intersectCallback() {
    setRef(null);
    getNextEventsTrigger();
  }

  return (
    <>
      <S.CardGridContainer>
        {eventsOrder.map((eventIndex, index) => {
          const eventData = events.get(eventIndex);
          if (!eventData) {
            return <></>;
          }
          const { id, mainImg, startAt, title, name, price, to } = eventData;

          return (
            <Card
              key={id}
              imgSrc={mainImg}
              date={startAt}
              title={title}
              host={name}
              price={price}
              to={to || `${ROUTES.EVENT_DETAIL}/${id}`}
              setRef={
                requestNextData && eventsOrder.length - 1 === index
                  ? setRef
                  : undefined
              }
            />
          );
        })}
      </S.CardGridContainer>
    </>
  );
}

export default CardGrid;
