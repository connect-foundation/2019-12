import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { NOT_FOUND, INTERNAL_SERVER_ERROR } from 'http-status';

import EventDetailTemplate from './template';
import { EventHeader, Ticket, Place, TuiViewer } from 'components';
import { EventsStoreState, EventsStoreAction } from 'stores/eventsStore';
import { EventDetail } from 'types/Data';
import delay from 'utils/delay';
import { getImageURL, imageTypes } from 'utils/getImageURL';
import { calculateDiffDaysOfDateRange } from 'utils/dateCalculator';

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
  const { eventFetchDispatcher } = useContext(EventsStoreAction);
  const { eventId } = useParams();
  const [internalServerError, setInternalError] = useState(false);
  const history = useHistory();
  const isEventInState = checkIfEventIsInState(eventsState.events!, +eventId!);

  const events = isEventInState
    ? eventsState.events!.get(+eventId!)!
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

  const remainDays = calculateDiffDaysOfDateRange(
    Date().toString(),
    ticketType.salesEndAt,
  );

  useEffect(() => {
    if (!isEventInState)
      eventFetchDispatcher({
        type: 'EVENT',
        params: {
          eventId: +eventId!,
        },
      });

    if (eventsState.status === NOT_FOUND) {
      history.replace('/NOT_FOUND');
    } else if (eventsState.status === INTERNAL_SERVER_ERROR) {
      (async () => {
        await delay(2000);
        setInternalError(true);
      })();
    }
  }, [
    eventFetchDispatcher,
    eventId,
    eventsState.status,
    history,
    isEventInState,
  ]);

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
          doneEvent={remainDays <= 0}
        />
      }
      eventContent={<TuiViewer content={desc} />}
      ticket={<Ticket {...ticketType} doneEvent={remainDays <= 0} />}
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
