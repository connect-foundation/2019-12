import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { NOT_FOUND } from 'http-status';

import EventDetailTemplate from './template';
import { EventHeader, Ticket, Place, TuiViewer } from 'components';
import { EventDetail } from 'types/Data';
import { getImageURL, imageTypes } from 'utils/getImageURL';
import { calculateDiffDaysOfDateRange } from 'utils/dateCalculator';
import useApiRequest, { REQUEST, SUCCESS, FAILURE } from 'hooks/useApiRequest';
import { getEvent } from 'apis';

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

function EventDetailView(): React.ReactElement {
  window.scrollTo(0, 0);
  const remainDays = useRef(0);
  const history = useHistory();
  const [internalServerError, setInternalError] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [event, setEvent] = useState<EventDetail>(defaultEventDetail);
  const [fetchResult, fetchEvent] = useApiRequest<EventDetail>(getEvent);
  const { eventId: originEventId } = useParams<{
    eventId: string;
  }>();
  const eventId = +originEventId;

  useEffect(() => {
    fetchEvent({ type: 'REQUEST', body: [eventId] });
  }, [fetchEvent, eventId]);

  useEffect(() => {
    const { type, data, err } = fetchResult;
    switch (type) {
      case REQUEST:
        break;
      case SUCCESS:
        if (data) {
          setEvent(data);
          setLoading(false);
        }
        break;
      case FAILURE:
        if (err && err.response && err.response.status === NOT_FOUND)
          history.replace('/NOT_FOUND');
        else if (err) setInternalError(true);
    }
  }, [fetchResult, history]);

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
  } = event;

  function doneEventType(): 0 | 1 | 2 {
    remainDays.current = calculateDiffDaysOfDateRange(
      Date().toString(),
      ticketType.salesEndAt,
    );

    if (remainDays.current <= 0) return 1;

    const remainTickets = ticketType.quantity - ticketType.leftCnt;
    if (remainTickets <= 0) return 2;

    return 0;
  }

  useEffect(() => {
    remainDays.current = calculateDiffDaysOfDateRange(
      Date().toString(),
      ticketType.salesEndAt,
    );
  }, [ticketType.salesEndAt]);

  return (
    <EventDetailTemplate
      eventHeader={
        <EventHeader
          {...{
            id,
            mainImg: getImageURL(mainImg, imageTypes.eventDetailImg),
            title,
            startAt,
            endAt,
            user,
            place,
            ticketType,
          }}
          doneEventType={doneEventType()}
        />
      }
      eventContent={<TuiViewer content={desc} />}
      ticket={<Ticket {...ticketType} doneEvent={!!doneEventType()} />}
      place={
        <Place
          {...{
            place,
            address,
            placeDesc,
            latitude,
            longitude,
          }}
        />
      }
      loading={loading}
      internalServerError={internalServerError}
    />
  );
}

export default EventDetailView;
