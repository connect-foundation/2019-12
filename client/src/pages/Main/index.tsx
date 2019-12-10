import React, { useCallback, useContext } from 'react';
import { getEvents } from 'apis';

import MainTemplate from './template';
import { MainBanner, CardGrid } from 'components';
import { EventDetail } from 'types/Data';
import { useIntersect } from 'hooks';
import { EventsStoreState, EventsStoreAction } from 'stores/eventsStore';

const requestEventNum = 12;

const fetchEvents = async (startAt: string) => {
  const { data } = await getEvents(requestEventNum, startAt);

  const events = new Map<number, EventDetail>();
  const order = data.map((event: EventDetail) => {
    events.set(event.id, event);
    return event.id;
  });
  return { events, order };
};

function Main(): React.ReactElement {
  const eventsState = useContext(EventsStoreState);
  const { eventsDispather } = useContext(EventsStoreAction);

  const getNextEvents = useCallback(
    async function() {
      let startAt = '';
      if (eventsState.order!.length !== 0) {
        const lastItemIndex = eventsState.order!.slice(-1)[0];
        startAt = eventsState.events.get(lastItemIndex)!.startAt;
      }
      eventsDispather({
        type: 'MAIN',
        value: await fetchEvents(startAt),
      });
    },
    [eventsDispather, eventsState.events, eventsState.order],
  );

  const callback = async (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver,
  ) => await getNextEvents();

  const [, setRef] = useIntersect(callback, {
    root: null,
    threshold: 1.0,
    rootMargin: '0% 0% 25% 0%',
  });

  return (
    <MainTemplate
      mainBanner={<MainBanner />}
      cardGrid={<CardGrid eventsState={eventsState} setRef={setRef} />}
    />
  );
}

export default Main;
