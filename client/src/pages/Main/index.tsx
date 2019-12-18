import React, { useContext } from 'react';

import MainTemplate from './template';
import { MainBanner, CardGrid } from 'components';
import { EventsStoreState, EventsStoreAction } from 'stores/eventsStore';
import { EventsState } from 'types/States';
import { REQUEST_EVENT_CARD_GRID_NUM } from 'commons/constants/number';
import { EventDetail } from 'types/Data';
import { EventCard } from '../../types/Data';
import { produce } from 'immer';
import { getImageURL, imageTypes } from 'utils/getImageURL';

function Main(): React.ReactElement {
  const eventsState = useContext(EventsStoreState);
  const { eventFetchDispatcher } = useContext(EventsStoreAction);
  const { events, order } = eventsState;

  if (!events || !order) {
    return <MainTemplate mainBanner={<MainBanner />} cardGrid={<></>} />;
  }

  const getStartAt = ({ events, order }: Partial<EventsState>) => {
    if (order!.length === 0) return '';
    const lastItemIndex = order!.slice(-1)[0];
    return events!.get(lastItemIndex)!.startAt;
  };

  function getNextEvents() {
    const startAt = getStartAt({ events, order });
    eventFetchDispatcher({
      type: 'EVENTS',
      params: {
        cnt: REQUEST_EVENT_CARD_GRID_NUM,
        startAt,
      },
    });
  }

  const convertToEventCardType = (sourceMap: Map<number, EventDetail>) => {
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
