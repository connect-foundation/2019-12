import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import EventDetailTemplate from './template';
import EventHeader from 'components/organisms/EventHeader';
import Ticket from 'components/organisms/Ticket';
import Place from 'components/organisms/Place';

import { EventsStoreState, EventsStoreAction } from 'stores/eventsStore';
import { useFetch } from 'hooks/base/useFetch';
import { EventDetail } from 'types/Data';

const { REACT_APP_SERVER_URL } = process.env;
// TODO: type에 해당 defaultValue도 같이 있어주면 어떨까라는 생각을 함
// 8 Dec 2019 by inthewalter
const defaultEventDetail: EventDetail = {
  id: 0,
  title: '',
  startAt: '',
  endAt: '',
  place: '',
  address: '',
  placeDesc: '',
  latitude: 0,
  longitude: 0,
  mainImg: '',
  desc: '',
  ticketType: {
    id: 0,
    eventId: 0,
    name: '',
    desc: '',
    price: 0,
    quantity: 0,
    leftCnt: 0,
    isPublicLeftCnt: false,
    maxCntPerPerson: 0,
    salesStartAt: '',
    salesEndAt: '',
    refundEndAt: '',
  },
  user: { id: 0, lastName: '', firstName: '', profileImgUrl: '' },
};

const checkIfEventIsInState = (
  events: Map<number, EventDetail>,
  eventId: number,
) => (events.get(eventId) ? true : false);

function EventDetailView(): React.ReactElement {
  window.scrollTo(0, 0);
  const eventsState = useContext(EventsStoreState);
  const { eventsDispather } = useContext(EventsStoreAction);
  const { eventId } = useParams();
  const [internalServerError, setInternalError] = useState(false);
  const [notFoundError, setNotFoundError] = useState(false);
  const isEventInState = checkIfEventIsInState(eventsState.events, +eventId!);

  const events = isEventInState
    ? eventsState.events.get(+eventId!)!
    : defaultEventDetail;
  const loading = isEventInState ? false : true;

  const {
    id,
    mainImg,
    title,
    startAt,
    endAt,
    user,
    desc,
    ticketType,
    place,
    address,
    placeDesc,
    latitude,
    longitude,
  } = events;

  const requestFetch = useFetch({
    method: 'get',
    url: `${REACT_APP_SERVER_URL}/api/events/${eventId}`,
  });

  useEffect(() => {
    if (!isEventInState) {
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
          if (requestFetch.status === 404) setNotFoundError(true);
          else setInternalError(true);
      }
    }
  }, [requestFetch, eventId, eventsDispather, eventsState, isEventInState]);

  return (
    <EventDetailTemplate
      eventHeader={
        <EventHeader
          {...{
            id,
            mainImg,
            title,
            startAt,
            endAt,
            user,
            place,
            ticketType,
          }}
        />
      }
      // TODO: eventContent will change to contentViewer component
      eventContent={desc}
      ticket={<Ticket {...ticketType} />}
      place={
        <Place
          {...{
            place,
            address,
            placeDesc,
            location: { latitude, longitude },
          }}
        />
      }
      loading={loading}
      internalServerError={internalServerError}
      notFoundError={notFoundError}
    />
  );
}

export default EventDetailView;
