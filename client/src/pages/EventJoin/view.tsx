import React, { useState } from 'react';
import axios from 'axios';

import EventJoinTemplate from './template';
import TicketBox from 'components/organisms/TicketBox';
import Counter from 'components/molecules/Counter';
import Btn from 'components/atoms/Btn';
import * as S from './style';
import { useHistory } from 'react-router-dom';

const { REACT_APP_SERVER_RESERVE_URL } = process.env;

const ticketData = {
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
    await axios({
      url: `${REACT_APP_SERVER_RESERVE_URL}/api/users/ticket`,
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      data: {
        ticketId: eventId,
        orderTicketNum: ticketCount,
      },
      withCredentials: true,
    });
    setisReserved(true);

    alert('예약이 완료되었습니다.');
    history.push('/');
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
