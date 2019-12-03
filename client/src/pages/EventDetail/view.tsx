import React, { useContext, useEffect } from 'react';
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
  const dispatcher = useContext(EventDataAction);
  const states = useContext(EventDataState);
  const { eventData } = states;
  const {
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
  } = eventData;

  const requestFetch = useFetch({
    method: 'get',
    url: `${REACT_APP_SERVER_URL}/api/events/${eventId}`,
  });

  useEffect(() => {
    const { type } = requestFetch;
    const loadingMsg = '<h3>이벤트 정보를 불러오는 중...</h3>';
    const failureMsg = '<h3>서버 요청을 실패했습니다.</h3>';
    let reqEventData = requestFetch.data as EventDetail;

    switch (type) {
      case 'request':
        reqEventData = Object.assign(eventData, { desc: loadingMsg });
        break;
      case 'success':
        // pass eventData
        break;
      case 'failure':
        // TODO: Route 404
        reqEventData = Object.assign(eventData, { desc: failureMsg });
        break;
    }

    dispatcher({
      type: 'eventData',
      value: reqEventData,
    });
  }, [requestFetch, dispatcher, eventData]);

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
            ticketType,
          }}
        />
      }
      // TODO: eventContent will change to contentViewer component
      eventContent={<div dangerouslySetInnerHTML={{ __html: desc }} />}
      ticket={<Ticket {...ticketType} />}
      place={<Place {...{ place, address, placeDesc, location }} />}
    />
  );
}

export default EventDetailView;
