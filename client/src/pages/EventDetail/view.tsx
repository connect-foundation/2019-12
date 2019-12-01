import React, { useContext, useEffect, useCallback } from 'react';
import EventDetailTemplate from './template';
import EventHeader from 'components/organisms/EventHeader';
import Ticket from 'components/organisms/Ticket';
import Place from 'components/organisms/Place';

import { EventDataAction, EventDataState } from './store';
import { useFetch } from '../../hooks/base/useFetch';
import { EventDetail } from '../../types/Data';

const { REACT_APP_SERVER_URL } = process.env;
interface Props {
  eventId: number;
}

function EventDetailView({ eventId }: Props): React.ReactElement {
  const dispatcher = useCallback(useContext(EventDataAction), []);
  const states = useContext(EventDataState);

  const eventDataReq = useFetch({
    method: 'get',
    url: `${REACT_APP_SERVER_URL}/api/events/${eventId}`,
  });

  useEffect(() => {
    const { type } = eventDataReq;
    switch (type) {
      case 'request':
        break;

      case 'success':
        dispatcher({
          type: 'eventData',
          value: eventDataReq.data as EventDetail,
        });
        break;

      case 'failure':
        // TODO: Route 404
        console.log('failure event data');
        break;
    }
  }, [dispatcher, eventDataReq]);

  const { eventData } = states;
  const {
    mainImg,
    title,
    startAt,
    endAt,
    user,
    desc,
    ticketTypes,
    place,
    address,
    placeDesc,
  } = eventData;
  const ticket = ticketTypes[0];

  // TODO: need profileImgUrl, Location in user table (DB)
  user.profileImgUrl =
    'https://cf.festa.io/img/2019-5-30/754f6674-e1e4-41d0-b24b-f4bef430dfe5.jpeg';
  const location = {
    lat: 37.5662952,
    lng: 126.9779451,
  };

  return (
    <EventDetailTemplate
      eventHeader={
        <EventHeader
          {...{
            mainImg,
            title,
            place,
            startAt,
            endAt,
            user,
            ticketTypes,
          }}
        />
      }
      // TODO: eventContent will change to contentViewer component
      eventContent={<div dangerouslySetInnerHTML={{ __html: desc }} />}
      ticket={<Ticket {...ticket} />}
      place={<Place {...{ place, address, placeDesc, location }} />}
    />
  );
}

export default EventDetailView;
