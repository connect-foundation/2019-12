import React, { useState, useCallback } from 'react';

import MainTemplate from './template';
import { MainBanner, CardGrid } from 'components';
import { Event } from 'types/Event';
import { useIntersect } from 'hooks';
import delay from 'utils/delay';
import { getEvents } from 'apis';

const requestEventNum = 12;

function Main(): React.ReactElement {
  const [events, setEvents] = useState<Event[]>([]);
  const fetchItems = useCallback(async () => {
    const startAt =
      events.length === 0 ? '' : `${events[events.length - 1].startAt}`;
    const { data } = await getEvents(requestEventNum, startAt);

    await delay(100);
    setEvents([...events, ...data]);
  }, [events]);

  const [, setRef] = useIntersect(
    async (
      entry: IntersectionObserverEntry,
      observer: IntersectionObserver,
    ) => {
      await fetchItems();
    },
    {
      root: null,
      threshold: 1.0,
      rootMargin: '0% 0% 25% 0%',
    },
  );

  return (
    <MainTemplate
      mainBanner={<MainBanner />}
      cardGrid={<CardGrid cards={events} setRef={setRef} />}
    />
  );
}

export default Main;
