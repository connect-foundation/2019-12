import React, { useContext } from 'react';

import MainTemplate from './template';
import { MainBanner, CardGrid } from 'components';
import { EventsStoreState, EventsStoreAction } from 'stores/eventsStore';
import { REQUEST_EVENT_CARD_GRID_NUM } from 'commons/constants/number';
import { EventDetail } from 'types/Data';
import { EventCard } from '../../types/Data';
import { produce } from 'immer';
import { getImageURL, imageTypes } from 'utils/getImageURL';
import { ACTION_FETCH_EVENTS } from 'commons/constants/string';

const getStartAt = ({
  events,
  order,
}: {
  events: Map<number, EventDetail>;
  order: number[];
}): string => {
  if (order.length === 0) return '';
  const lastItemIndex = order.slice(-1)[0];
  const event = events.get(lastItemIndex);
  if (!event) return '';
  return event.startAt;
};

const convertToEventCardType = (
  sourceMap: Map<number, EventDetail>,
): Map<number, EventCard> => {
  const targetMap = new Map<number, EventCard>();
  return produce(targetMap, draft => {
    sourceMap.forEach(value => {
      const { id, mainImg, startAt, title, user, ticketType } = value;
      const eventCard: EventCard = {
        id,
        mainImg: getImageURL(mainImg, imageTypes.mainEventImg),
        startAt,
        title,
        name: user.lastName + user.firstName,
        price: ticketType.price,
      };
      draft.set(value.id, eventCard);
    });
  });
};

function Main(): React.ReactElement {
  const eventsState = useContext(EventsStoreState);
  const { eventFetchDispatcher } = useContext(EventsStoreAction);
  const { events, order } = eventsState;

  if (!events || !order) {
    return <MainTemplate mainBanner={<MainBanner />} cardGrid={<></>} />;
  }

  function getNextEvents(): void {
    if (!events || !order) return;
    const startAt = getStartAt({ events, order });
    eventFetchDispatcher({
      type: ACTION_FETCH_EVENTS,
      data: {
        cnt: REQUEST_EVENT_CARD_GRID_NUM,
        startAt,
      },
    });
  }

  return (
    <MainTemplate
      mainBanner={<MainBanner />}
      cardGrid={
        <CardGrid
          events={convertToEventCardType(events)}
          eventsOrder={order}
          requestNextData={getNextEvents}
        />
      }
    />
  );
}

export default Main;
