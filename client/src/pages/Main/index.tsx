import React, { useCallback, useContext } from 'react';

import MainTemplate from './template';
import { MainBanner, CardGrid } from 'components';
import { useIntersect } from 'hooks';
import { EventsStoreState, EventsStoreAction } from 'stores/eventsStore';
import { EventsState } from 'types/States';

const requestEventNum = 12;

const getStartAt = (eventsState: EventsState) => {
  let startAt = '';
  if (eventsState.order!.length !== 0) {
    const lastItemIndex = eventsState.order!.slice(-1)[0];
    startAt = eventsState.events.get(lastItemIndex)!.startAt;
  }
  return startAt;
};

function Main(): React.ReactElement {
  const eventsState = useContext(EventsStoreState);
  const { eventFetchDispatcher } = useContext(EventsStoreAction);

  const getNextEvents = useCallback(
    async function() {
      const startAt = getStartAt(eventsState);
      eventFetchDispatcher({
        type: 'EVENTS',
        params: {
          cnt: requestEventNum,
          startAt,
        },
      });
    },
    [eventsState, eventFetchDispatcher],
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
      cardGrid={<CardGrid eventsState={eventsState} setRef={setRef} />}
    />
  );
}

export default Main;
