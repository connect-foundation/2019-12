import React, { useState } from 'react';

import CardGrid from '.';
import { EventCard } from 'types/Data';

export default {
  title: 'Organisms / CardGrid',
};

const defaultEventData: EventCard = {
  id: 733,
  title: '리눅스 커널 v5.3 분석: 네트워크 TCP/IP 주말특강(12월)',
  startAt: '2019-12-21T03:00:00.000Z',
  mainImg: 'https://bookus.kr.object.ncloudstorage.com/733',
  price: 160000,
  name: '조성동',
};
const events = new Map<number, EventCard>();
const eventsOrder: number[] = [];

for (let i = 0; i < 10; i += 1) {
  defaultEventData.id = i;
  events.set(i, defaultEventData);
  eventsOrder.push(i);
}

export const index = React.createElement(() => {
  const [myEvents, setEvents] = useState(events);
  const [myEventsOrder, setEventsOrder] = useState(eventsOrder);

  function getNextEvents() {
    const newEvents = Object.assign({}, myEvents);
    const newOrder: number[] = [];
    for (let i = 10; i < 20; i += 1) {
      const event = events.get(i - 10)!;
      event.id = i + 999;
      newEvents.set(i, event);
      newOrder.push(i);
    }

    setEvents(newEvents);
    setEventsOrder(newOrder);
  }

  return (
    <CardGrid
      events={myEvents}
      eventsOrder={myEventsOrder}
      requestNextData={getNextEvents}
    />
  );
});

export const notIntersection: React.FC = () => {
  return <CardGrid events={events} eventsOrder={eventsOrder} />;
};
