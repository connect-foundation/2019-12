import React, { useEffect, useState } from 'react';
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

  enum doneEventTypeEnum {
    SUCCESS,
    NOT_REMAIN_EVENT_DAY,
    NO_TICKET,
    NOT_REMAIN_TICKET_DAY,
  }

  function doneEventType(): doneEventTypeEnum {
    const UtcDate = new Date();
    UtcDate.setHours(UtcDate.getHours() - 9);
    const remainEventDays = calculateDiffDaysOfDateRange(
      UtcDate.toString(),
      endAt,
    );
    const remainTicketDays = calculateDiffDaysOfDateRange(
      UtcDate.toString(),
      ticketType.salesEndAt,
    );

    if (remainEventDays <= 0) return doneEventTypeEnum.NOT_REMAIN_EVENT_DAY;
    if (ticketType.leftCnt === 0) return doneEventTypeEnum.NO_TICKET;
    if (remainTicketDays <= 0) return doneEventTypeEnum.NOT_REMAIN_TICKET_DAY;
    return doneEventTypeEnum.SUCCESS;
  }

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
      ticket={<Ticket {...ticketType} />}
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
