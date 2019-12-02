import React, { useState, useCallback } from 'react';
import axios from 'axios';

import MainTemplate from './template';
import MainBanner from 'components/organisms/MainBanner';
import CardGrid from 'components/organisms/CardGrid';
import { Event } from '../../types/Event';
import { useIntersect } from '../../hooks';
import delay from '../../utils/delay';

function Main(): React.ReactElement {
  const [events, setEvents] = useState<Event[]>([]);
  const { REACT_APP_SERVER_URL: SERVER_URL } = process.env;

  const fetchItems = useCallback(async () => {
    const startAt =
      events.length === 0
        ? ''
        : `&startAt=${events[events.length - 1].startAt}`;
    const { data } = await axios({
      method: 'GET',
      url: `${SERVER_URL}/api/events?cnt=12${startAt}`,
      withCredentials: true,
    });
    await delay(100);
    setEvents([...events, ...data]);
  }, [SERVER_URL, events]);

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
