import React from 'react';
import { text, object, boolean } from '@storybook/addon-knobs';

import TicketBox from '.';

export default {
  title: 'Organisms / TicketBox',
};

const ticketData = {
  id: 1,
  eventId: 2,
  name: '일반 입장권',
  desc: '코어 자바스크립트 책을 지참하시면 현장에서 오천원을 돌려드립니다.',
  price: 10000,
  quantity: 80,
  leftCnt: 0,
  isPublicLeftCnt: false,
  maxCntPerPerson: 5,
  salesStartAt: '2019-11-04T15:00:00.000Z',
  salesEndAt: '2019-11-28T14:00:00.000Z',
  refundEndAt: '2019-11-28T14:00:00.000Z',
  purchaseDate: '2019-11-28',
  ticketId: '12345',
};

export const index: React.FC = () => (
  <TicketBox
    {...ticketData}
    chkProps={object('chkProps', { checked: false })}
    checked={boolean('checked', false)}
    showDueDate={boolean('showDueDate', true)}
  />
);

export const options: React.FC = () => (
  <TicketBox
    {...ticketData}
    chkProps={object('chkProps', { checked: false })}
    checked={boolean('checked', false)}
    chkDesc={text('chkDesc', '출석체크')}
    showPurchaseDate={boolean('showPurchaseDate', true)}
    showTicketId={boolean('showTicketId', true)}
    showChkIcon={boolean('showChkIcon', true)}
    showRefundBtn={boolean('showRefundBtn', true)}
  />
);
