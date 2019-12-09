import React, { useState } from 'react';
import { UNAUTHORIZED, FORBIDDEN, NOT_FOUND } from 'http-status';
import { useHistory } from 'react-router-dom';

import EventJoinTemplate from './template';
import { Btn, CounterBox, TicketBox } from 'components';
import {
  BUY_TICKET_BTN,
  COUNTER_BOX_LABEL,
  RESERVE_COMPLETE,
  RESERVE_BAD_FAIL,
  RESERVE_MIN_FAIL,
} from 'commons/constants/string';
import ROUTES from 'commons/constants/routes';
import * as S from './style';
import { joinEvent } from 'apis';

interface Props {
  eventId: number;
}

const minTicketCount = 1;
const ticketData = {
  id: 1,
  eventId: 2,
  name: '일반 입장권',
  desc: '발표자 선물 및 음료/다과 구입으로 사용됩니다.',
  price: 10000,
  quantity: 80,
  leftCnt: 0,
  isPublicLeftCnt: false,
  maxCntPerPerson: 5,
  salesStartAt: '2019-11-04T15:00:00.000Z',
  salesEndAt: '2019-11-28T14:00:00.000Z',
  refundEndAt: '2019-11-28T14:00:00.000Z',
};

function EventJoin({ eventId }: Props): React.ReactElement {
  const [isReserved, setisReserved] = useState(false);
  const [isTicketChecked, setIsTicketChecked] = useState(false);
  const [ticketCount, setTicketCount] = useState(0);

  const history = useHistory();

  const { maxCntPerPerson } = ticketData;
  const isVisibleCounter = () => {
    return maxCntPerPerson > minTicketCount && isTicketChecked;
  };

  const requestOrder = async () => {
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
      const { status } = response;

      if (status === UNAUTHORIZED) {
        history.push(ROUTES.LOGIN);
        return;
      }

      if (status === FORBIDDEN || status === NOT_FOUND) {
        alert(RESERVE_BAD_FAIL);
      }
    }
  };

  return (
    <EventJoinTemplate
      TicketHeader={<S.TicketHeader>Tickets</S.TicketHeader>}
      TicketBox={
        <TicketBox
          {...ticketData}
          chkBoxProps={{
            checked: isTicketChecked,
            onClick: () => {
              setIsTicketChecked(!isTicketChecked);
            },
          }}
        />
      }
      Counter={
        isVisibleCounter() && (
          <CounterBox
            label={COUNTER_BOX_LABEL}
            counterProps={{
              minCount: minTicketCount,
              maxCount: maxCntPerPerson,
              handler: setTicketCount,
            }}
          />
        )
      }
      SubmitBtn={
        <Btn
          styletype={'secondary'}
          onClick={requestOrder}
          grow={true}
          children={BUY_TICKET_BTN}
        />
      }
    />
  );
}

export default EventJoin;
