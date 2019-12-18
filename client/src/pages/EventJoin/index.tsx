import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { UNAUTHORIZED, FORBIDDEN, NOT_FOUND } from 'http-status';
import { useHistory } from 'react-router-dom';

import { EventsStoreState, EventsStoreAction } from 'stores/eventsStore';
import { EventDetail } from 'types/Data';

import EventJoinTemplate from './template';
import {
  Btn,
  CounterBox,
  TicketBox,
  StepList,
  EventSection,
  Place,
  Ticket,
  Price,
} from 'components';
import {
  BUY_TICKET_BTN,
  COUNTER_BOX_LABEL,
  RESERVE_REQUIRE_LOGIN,
  RESERVE_COMPLETE,
  RESERVE_MIN_FAIL,
  JOIN_STEP_CHOICE,
  JOIN_STEP_PURCHASE,
  TICKET_CHOICE_TITLE,
  TICKET_PURCHASE_TITLE,
  TOTAL_PRICE_LABEL,
  TICKET_PURCHASE_BTN,
  RESERVE_REQUIRE_CHOICE,
  RESERVE_INVALID_DATE,
  RESERVE_SOLD_OUT,
  RESERVE_PER_PERSON_OVER,
  RESERVE_WRONG_NUMBER,
} from 'commons/constants/string';
import { NOT_OPEN, SOLD_OUT, EXCEED_LIMIT } from 'commons/constants/number';
import ROUTES from 'commons/constants/routes';
import { joinEvent } from 'apis';
import { calculateStringOfDateRange } from 'utils/dateCalculator';
import { getImageURL, imageTypes } from 'utils/getImageURL';

const minTicketCount = 1;
const steps = [JOIN_STEP_CHOICE, JOIN_STEP_PURCHASE];

const defaultEventData = {
  id: 1,
  title: '이벤트 제목이랍니다.',
  startAt: '2019-11-04T15:00:00.000Z',
  endAt: '2019-11-05T15:00:00.000Z',
  place: '위플레이스 강남점(서울시 강남구 강남대로 340 경원빌딩 3층)',
  address: '서울시 강남구 강남대로 340',
  placeDesc: '',
  latitude: 37.5662952,
  longitude: 126.9779451,
  mainImg: '',
  desc: '',

  ticketType: {
    id: 1,
    eventId: 1,
    name: '일반 입장권',
    desc: '',
    price: 10000,
    quantity: 0,
    leftCnt: 20,
    isPublicLeftCnt: false,
    maxCntPerPerson: 10,
    salesStartAt: '2019-11-04T15:00:00.000Z',
    salesEndAt: '2019-11-28T14:00:00.000Z',
    refundEndAt: '2019-11-28T14:00:00.000Z',
  },
  user: { id: 0, lastName: '조', firstName: '성동', profileImgUrl: '' },
};

function EventJoin(): React.ReactElement {
  window.scrollTo(0, 0);
  const [isReserved, setisReserved] = useState(false);
  const [isTicketChecked, setIsTicketChecked] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const [templateStep, setTemplateStep] = useState(1);
  const [eventState, setEventState] = useState(defaultEventData);
  const eventsState = useContext(EventsStoreState);
  const { eventFetchDispatcher } = useContext(EventsStoreAction);

  const history = useHistory();
  const { eventId: originEventId } = useParams();
  if (typeof originEventId === 'undefined') {
    history.push('/404');
  }
  const eventId = +originEventId!;

  const getInEventState = useCallback(
    (eventData: EventDetail) => {
      setEventState(eventData);
    },
    [setEventState],
  );

  useEffect(() => {
    if (eventsState && eventsState.events) {
      const gettedEventData = eventsState.events.get(eventId);
      if (gettedEventData) {
        getInEventState(gettedEventData);
      } else {
        eventFetchDispatcher({
          type: 'EVENT',
          params: { eventId },
        });
      }
    }
  }, [eventFetchDispatcher, eventId, eventsState, getInEventState]);

  const { title, mainImg, startAt, endAt, user, ticketType } = eventState;
  const { maxCntPerPerson } = ticketType;
  const isVisibleCounter = () => {
    return maxCntPerPerson > minTicketCount && isTicketChecked;
  };

  const requestOrder = async () => {
    if (!isTicketChecked || ticketCount <= 0) {
      return alert(RESERVE_REQUIRE_CHOICE);
    }
    setTemplateStep(templateStep + 1);
  };

  const purchaseOrder = async () => {
    if (isReserved) {
      return;
    }
    if (ticketCount <= 0) {
      return alert(RESERVE_MIN_FAIL);
    }
    try {
      await joinEvent(eventId, ticketCount);
      setisReserved(true);
      alert(RESERVE_COMPLETE);
      history.push(ROUTES.HOME);
    } catch (err) {
      const { response } = err;
      const { status: statusCode, data } = response;

      if (statusCode === UNAUTHORIZED) {
        alert(RESERVE_REQUIRE_LOGIN);
        history.push(ROUTES.LOGIN);
        return;
      }

      const { state } = data;
      if (statusCode === FORBIDDEN) {
        switch (state) {
          case NOT_OPEN:
            return alert(RESERVE_INVALID_DATE);

          case SOLD_OUT:
            return alert(RESERVE_SOLD_OUT);

          case EXCEED_LIMIT:
            return alert(RESERVE_PER_PERSON_OVER);
        }
      }

      if (statusCode === NOT_FOUND) {
        return alert(RESERVE_WRONG_NUMBER);
      }
    }
  };

  return (
    <EventJoinTemplate
      step={templateStep}
      stepList={<StepList steps={steps} pivot={templateStep} />}
      eventSection={
        <EventSection
          title={title}
          subtitle={['일시', '주최']}
          content={[
            calculateStringOfDateRange(startAt, endAt),
            user.lastName + user.firstName,
          ]}
          imgSrc={getImageURL(mainImg, imageTypes.eventDetailRegisterImg)}
        />
      }
      place={<Place mapHeight={'20rem'} {...eventState} />}
      ticketChoiceProps={{
        header: TICKET_CHOICE_TITLE,
        ticketBox: (
          <TicketBox
            {...ticketType}
            chkProps={{
              checked: isTicketChecked,
              onClick: () => {
                setIsTicketChecked(!isTicketChecked);
              },
            }}
            showDueDate
          />
        ),

        counter: isVisibleCounter() && (
          <CounterBox
            label={COUNTER_BOX_LABEL}
            counterProps={{
              minCount: minTicketCount,
              maxCount: maxCntPerPerson,
              handler: setTicketCount,
            }}
          />
        ),
        submitBtn: (
          <Btn
            styletype={'secondary'}
            onClick={requestOrder}
            children={BUY_TICKET_BTN}
            data-testid={'ticketchoice-submitbtn'}
          />
        ),
      }}
      ticketPurchaseProps={{
        header: TICKET_PURCHASE_TITLE,
        ticket: <Ticket count={ticketCount} {...ticketType} />,
        totalPriceLabel: TOTAL_PRICE_LABEL,
        price: <Price separated>{ticketType.price * ticketCount}</Price>,
        purchaseBtn: (
          <Btn
            grow
            children={TICKET_PURCHASE_BTN}
            onClick={purchaseOrder}
            data-testid={'ticketpurchase-purchasebtn'}
          />
        ),
      }}
    />
  );
}

export default EventJoin;
