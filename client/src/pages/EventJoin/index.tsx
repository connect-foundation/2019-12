import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UNAUTHORIZED, FORBIDDEN, NOT_FOUND } from 'http-status';
import { useHistory } from 'react-router-dom';

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
  INTERNAL_SERVER_ERROR,
} from 'commons/constants/string';
import { NOT_OPEN, SOLD_OUT, EXCEED_LIMIT } from 'commons/constants/number';
import ROUTES from 'commons/constants/routes';
import { joinEvent, getEvent } from 'apis';
import { calculateStringOfDateRange } from 'utils/dateCalculator';
import { getImageURL, imageTypes } from 'utils/getImageURL';
import useApiRequest, { REQUEST, SUCCESS, FAILURE } from 'hooks/useApiRequest';

const minTicketCount = 1;
const steps = [JOIN_STEP_CHOICE, JOIN_STEP_PURCHASE];

const defaultEventData = {
  id: 1,
  title: '',
  startAt: '',
  endAt: '',
  place: '',
  address: '',
  placeDesc: '',
  latitude: 37.5662952,
  longitude: 126.9779451,
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
  user: { id: 0, lastName: '조', firstName: '성동', profileImgUrl: '' },
};

function EventJoin(): React.ReactElement {
  const [isReserved, setisReserved] = useState(false);
  const [isTicketChecked, setIsTicketChecked] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const [templateStep, setTemplateStep] = useState(1);

  const history = useHistory();
  const { eventId: originEventId } = useParams<{
    eventId: string;
  }>();

  const eventId = +originEventId;

  const [internalServerError, setInternalError] = useState(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [event, setEvent] = useState<EventDetail>(defaultEventData);
  const [fetchResult, fetchEvent] = useApiRequest<EventDetail>(getEvent);

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

  const { title, mainImg, startAt, endAt, user, ticketType } = event;
  const { maxCntPerPerson } = ticketType;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isVisibleCounter = (): boolean => {
    return maxCntPerPerson > minTicketCount && isTicketChecked;
  };

  const requestOrder = async (): Promise<void> => {
    if (!isTicketChecked || ticketCount <= 0) {
      return alert(RESERVE_REQUIRE_CHOICE);
    }
    setTemplateStep(templateStep + 1);
  };

  const purchaseOrder = async (): Promise<void> => {
    if (isReserved) return;

    if (ticketCount <= 0) return alert(RESERVE_MIN_FAIL);

    try {
      await joinEvent(eventId, ticketCount);
      setisReserved(true);
      alert(RESERVE_COMPLETE);
      history.replace(ROUTES.MYPAGE_TICKETS);
    } catch (err) {
      const { response } = err;
      if (!response) {
        alert(INTERNAL_SERVER_ERROR);
        history.push(ROUTES.HOME);
        return;
      }
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
      loading={isLoading}
      internalServerError={internalServerError}
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
      place={<Place mapHeight={'20rem'} {...event} />}
      ticketChoiceProps={{
        header: TICKET_CHOICE_TITLE,
        ticketBox: (
          <TicketBox
            {...ticketType}
            chkProps={{
              checked: isTicketChecked,
              onClick: (): void => setIsTicketChecked(!isTicketChecked),
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
