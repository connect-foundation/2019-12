import React from 'react';
import produce from 'immer';

import { BoughtTicketEvent, CreatedEvent, EventCard } from 'types/Data';
import ROUTES from 'commons/constants/routes';
import {
  calculateStringOfDateRange,
  getKoreanDateString,
} from 'utils/dateCalculator/index';
import { Props as EventSectionProps } from 'components/organisms/EventSection';
import { TicketBox } from 'components';
import { TICKETBOX_REFUND_BTN } from '../../commons/constants/string';

export function checkBoughtTicketEventRoute(url: string) {
  const myTicketEventsRoute = /\/my\/tickets\/event\/([0-9]+)/;
  const boughtTicketEventRegex = url.match(myTicketEventsRoute);

  let boughtTicketEventId = 0;
  if (boughtTicketEventRegex && boughtTicketEventRegex[1]) {
    boughtTicketEventId = +boughtTicketEventRegex[1];
  }
  return boughtTicketEventId;
}

export function getEventSectionProps({
  boughtTicketEventId,
  boughtTicketEventMap,
}: {
  boughtTicketEventId: number;
  boughtTicketEventMap?: Map<number, BoughtTicketEvent>;
}) {
  const willPassedData: EventSectionProps = {
    content: [],
    imgSrc: '',
    place: '',
    subtitle: [],
    title: '',
  };
  if (!boughtTicketEventMap) {
    return willPassedData;
  }

  const getStoreData = boughtTicketEventMap.get(boughtTicketEventId);
  if (!getStoreData) {
    return willPassedData;
  }
  const {
    startAt,
    endAt,
    title,
    lastName,
    firstName,
    mainImg,
    address,
  } = getStoreData;
  willPassedData.content = [
    calculateStringOfDateRange(startAt, endAt),
    lastName + firstName,
  ];
  willPassedData.imgSrc = mainImg;
  willPassedData.place = address;
  willPassedData.subtitle = ['일시', '주최'];
  willPassedData.title = title;

  return willPassedData;
}

export function getTicketBoxesProps({
  boughtTicketEventId,
  boughtTicketEventMap,
}: {
  boughtTicketEventId: number;
  boughtTicketEventMap?: Map<number, BoughtTicketEvent>;
}) {
  if (!boughtTicketEventMap) {
    return [<></>];
  }

  const getStoreData = boughtTicketEventMap.get(boughtTicketEventId);
  if (!getStoreData) {
    return [<></>];
  }

  return getStoreData.userTickets.map(userTicket => {
    const { name, desc, price, salesEndAt, id } = getStoreData.ticket;
    const { createdAt, isAttendance } = userTicket;
    const props = {
      purchaseDate: getKoreanDateString(createdAt),
      checked: isAttendance,
      desc,
      price,
      salesEndAt,
      name,
      ticketId: `${id}`,
    };
    return (
      <TicketBox
        chkProps={{ checked: false }}
        refundBtProps={{
          onClick: () => {
            alert('환불하시겠습니까?');
          },
          children: TICKETBOX_REFUND_BTN,
        }}
        chkDesc={'출석체크'}
        showPurchaseDate
        showTicketId
        showChkIcon
        showRefundBtn
        disabledChkIcon
        {...props}
      />
    );
  });
}

export function convertToEventCardFromBought(
  sourceMap: Map<number, BoughtTicketEvent>,
) {
  const targetMap = new Map<number, EventCard>();
  return produce(targetMap, draft => {
    sourceMap.forEach(value => {
      const { id, mainImg, startAt, title, ticket } = value;

      draft.set(value.id, {
        id,
        mainImg,
        startAt,
        title,
        name: '',
        price: ticket.price,
        to: `${ROUTES.MYPAGE_TICKETS_EVENT}/${id}`,
      });
    });
  });
}

export function convertToEventCardTypeFromCreated(
  sourceMap: Map<number, CreatedEvent>,
) {
  const targetMap = new Map<number, EventCard>();
  return produce(targetMap, draft => {
    sourceMap.forEach(value => {
      const { id, mainImg, startAt, title } = value;

      draft.set(value.id, {
        id,
        mainImg,
        startAt,
        title,
        name: '',
        price: 0,
        to: `${ROUTES.MYPAGE_TICKETS_EVENT}/${id}`,
      });
    });
  });
}
