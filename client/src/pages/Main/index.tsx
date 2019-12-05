import React, { useCallback, useContext } from 'react';
import axios from 'axios';

import MainTemplate from './template';
import MainBanner from 'components/organisms/MainBanner';
import CardGrid from 'components/organisms/CardGrid';
import { Event } from 'types/Data';
import { useIntersect } from 'hooks';
import { EventsStoreState, EventsStoreAction } from 'stores/eventsStore';
const { REACT_APP_SERVER_UR: SERVER_URL } = process.env;

const fetchEvents = async (startAt: string) => {
  const { data } = await axios({
    method: 'GET',
    url: `${SERVER_URL}/api/events?cnt=12${startAt}`,
  });
  const events = new Map<number, Event>();
  const order = data.map((event: Event) => {
    events.set(event.id, event);
    return event.id;
  });
  return { events, order };
};

function Main(): React.ReactElement {
  const eventsState = useContext(EventsStoreState);
  const { eventsDispather } = useContext(EventsStoreAction);

  const getNextEvents = useCallback(async () => {
    let startAt = '';
    if (eventsState.order!.length !== 0) {
      const lastItemIndex = eventsState.order!.slice(-1)[0];
      startAt = `&startAt=${eventsState.events.get(lastItemIndex)!.startAt}`;
    }
    eventsDispather({
      type: 'MAIN',
      value: await fetchEvents(startAt),
    });
  }, [eventsDispather, eventsState.events, eventsState.order]);

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
