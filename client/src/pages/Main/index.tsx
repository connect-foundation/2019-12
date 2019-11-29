import React, { useState, useCallback } from 'react';
import axios from 'axios';

import MainTemplate from './template';
import MainBanner from 'components/organisms/MainBanner';
import CardGrid from 'components/organisms/CardGrid';
import { Event } from '../../types/Event';
import { useIntersect } from '../../hooks';

function Main(): React.ReactElement {
  const [events, setEvents] = useState<Event[]>([]);

  const delay = (seconds: number): Promise<void> =>
    new Promise(resolve =>
      setTimeout(() => {
        resolve();
      }, seconds * 1000),
    );

  const fetchItems = useCallback(async () => {
    const lastId =
      events.length === 0 ? '' : `&lastId=${events[events.length - 1].id}`;
    const { data } = await axios.get<Event[]>(
      `http://localhost:13000/api/events?cnt=12${lastId}`,
    );
    await delay(0.5);
    setEvents([...events, ...data]);
  }, [events]);

  const [_, setRef] = useIntersect(
    async (
      entry: IntersectionObserverEntry,
      observer: IntersectionObserver,
    ) => {
      await fetchItems();
    },
    {
      threshold: 1.0,
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
