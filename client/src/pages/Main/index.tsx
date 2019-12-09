import React, { useCallback, useContext } from 'react';

import MainTemplate from './template';
import { MainBanner, CardGrid } from 'components';
import { useIntersect } from 'hooks';
import { EventsStoreState, EventsStoreAction } from 'stores/eventsStore';
import { EventsState } from 'types/States';

const requestEventNum = 12;

const getStartAt = ({ events, order }: Partial<EventsState>) => {
  let startAt = '';
  if (order!.length !== 0) {
    const lastItemIndex = order!.slice(-1)[0];
    startAt = events!.get(lastItemIndex)!.startAt;
  }
  return startAt;
};

function Main(): React.ReactElement {
  const eventsState = useContext(EventsStoreState);
  const { eventFetchDispatcher } = useContext(EventsStoreAction);
  const { events, order } = eventsState;

  const getNextEvents = useCallback(
    async function() {
      const startAt = getStartAt({ events, order });
      eventFetchDispatcher({
        type: 'EVENTS',
        params: {
          cnt: requestEventNum,
          startAt,
        },
      });
    },
    [events, order, eventFetchDispatcher],
  );

  const [, setRef] = useIntersect(callback, {
    root: null,
    threshold: 1.0,
    rootMargin: '0% 0% 50% 0%',
  });

  async function callback() {
    setRef(null);
    await getNextEvents();
  }

  return (
    <MainTemplate
      mainBanner={<MainBanner />}
      cardGrid={
        <CardGrid events={events!} eventsOrder={order!} setRef={setRef} />
      }
    />
  );
}

export default Main;
