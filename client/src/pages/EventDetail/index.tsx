import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import EventDetailTemplate from './template';
import EventHeader from 'components/organisms/EventHeader';
import Ticket from 'components/organisms/Ticket';
import Place from 'components/organisms/Place';

import { EventsStoreState, EventsStoreAction } from 'stores/eventsStore';
import { useFetch } from 'hooks/base/useFetch';
import { EventDetail } from 'types/Data';

const { REACT_APP_SERVER_URL } = process.env;

const checkEventIsInState = (
  events: Map<number, EventDetail>,
  eventId: number,
) => (events.get(eventId) ? true : false);

function EventDetailView(): React.ReactElement {
  window.scrollTo(0, 0);
  const eventsState = useContext(EventsStoreState);
  const { eventsDispather } = useContext(EventsStoreAction);
  const { eventId } = useParams();
  const [internalServerError, setinternalError] = useState(false);
  const history = useHistory();

  const events = eventsState.events.get(+eventId!)!;
  const loading = events ? false : true;

  const requestFetch = useFetch({
    method: 'get',
    url: `${REACT_APP_SERVER_URL}/api/events/${eventId}`,
  });

  useEffect(() => {
    if (!checkEventIsInState(eventsState.events, +eventId!)) {
      const { type } = requestFetch;
      const reqEventData = requestFetch.data as EventDetail;
      switch (type) {
        case 'request':
          break;
        case 'success':
          eventsDispather({
            type: 'DETAIL',
            value: {
              events: new Map([[reqEventData.id, reqEventData]]),
            },
          });
          break;
        case 'failure':
          if (requestFetch.status === 404) {
            history.replace('/NOTFOUND');
          } else setinternalError(true);
          break;
      }
    }
  }, [requestFetch, eventId, eventsDispather, eventsState, history]);

  return (
    <EventDetailTemplate
      eventHeader={<EventHeader {...(events && events)} />}
      // TODO: eventContent will change to contentViewer component
      eventContent={
        <div
          dangerouslySetInnerHTML={{
            __html: events && events.desc,
          }}
        />
      }
      ticket={<Ticket {...(events && events.ticketType)} />}
      place={<Place {...(events && events)} />}
      loading={loading}
      internalServerError={internalServerError}
    />
  );
}

export default EventDetailView;
