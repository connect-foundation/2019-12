import React, { useContext } from 'react';

import MainTemplate from './template';
import { MainBanner, CardGrid } from 'components';
import { EventsStoreState, EventsStoreAction } from 'stores/eventsStore';
import { EventsState } from 'types/States';
import { REQUEST_EVENT_CARD_GRID_NUM } from 'commons/constants/number';

function Main(): React.ReactElement {
  const eventsState = useContext(EventsStoreState);
  const { eventFetchDispatcher } = useContext(EventsStoreAction);
  const { events, order } = eventsState;

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

  return (
    <MainTemplate
      mainBanner={<MainBanner />}
      cardGrid={
        <CardGrid
          events={events!}
          eventsOrder={order!}
          requestNextData={getNextEvents}
        />
      }
    />
  );
}

export default Main;
