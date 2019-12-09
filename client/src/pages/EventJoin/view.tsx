import React, { useState } from 'react';
import httpStatus from 'http-status';
import { useHistory } from 'react-router-dom';

import EventJoinTemplate from './template';
import { Btn, Counter, TicketBox } from 'components';
import * as S from './style';
import { joinEvent } from 'apis';

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

interface Props {
  eventId: number;
}

function EventJoin({ eventId }: Props): React.ReactElement {
  const [isReserved, setisReserved] = useState(false);

  const history = useHistory();
  let ticketCount = 0;

  const counterHandler = (count: number) => {
    ticketCount = count;
  };

  const requestOrder = async () => {
    if (isReserved) {
      return;
    }
    if (ticketCount <= 0) {
      alert('티켓 개수는 1개 이상이어야 합니다.');
      return;
    }
    // 401 : 로그인
    // 403, 404 : ban

    joinEvent(eventId, ticketCount)
      .then(res => {
        const { status } = res;
        if (status === httpStatus.OK) {
          setisReserved(true);

          alert('예약이 완료되었습니다.');
          history.push('/');
        }
      })
      .catch(err => {
        const { response } = err;
        const { status } = response;
        if (status === httpStatus.UNAUTHORIZED) {
          history.push('/login');
        } else if (
          status === httpStatus.FORBIDDEN ||
          status === httpStatus.NOT_FOUND
        ) {
          alert('티켓 구매에 실패했습니다. 😔');
        }
      });
  };

  return (
    <EventJoinTemplate
      TicketHeader={<S.TicketHeader>Tickets</S.TicketHeader>}
      TicketBox={<TicketBox {...ticketData} />}
      Counter={
        <Counter
          minCount={0}
          maxCount={ticketData.maxCntPerPerson}
          handler={counterHandler}
        />
      }
      SubmitBtn={
        <Btn
          styletype={'secondary'}
          onClick={requestOrder}
          grow={true}
          children={'구매하기'}
        />
      }
    />
  );
}

export default EventJoin;
