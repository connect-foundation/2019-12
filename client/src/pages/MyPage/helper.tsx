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
import { imageTypes, getImageURL } from 'utils/getImageURL';
import { FetchProps } from 'hooks/useApiRequest';
import { REQUEST } from '../../hooks/useApiRequest';

export function checkBoughtTicketEventRoute(url: string): number {
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
}): EventSectionProps {
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
  willPassedData.imgSrc = getImageURL(
    mainImg,
    imageTypes.myPageBoughtTicketsEvent,
  );
  willPassedData.place = address;
  willPassedData.subtitle = ['일시', '주최'];
  willPassedData.title = title;

  return willPassedData;
}

export function getTicketBoxesProps({
  boughtTicketEventId,
  boughtTicketEventMap,
  requestRefundCallback,
}: {
  boughtTicketEventId: number;
  boughtTicketEventMap?: Map<number, BoughtTicketEvent>;
  requestRefundCallback: React.Dispatch<FetchProps<{ ticketId: number }>>;
}): React.ReactNode[] {
  if (!boughtTicketEventMap) {
    return [<></>];
  }

  const getStoreData = boughtTicketEventMap.get(boughtTicketEventId);
  if (!getStoreData) {
    return [<></>];
  }

  return getStoreData.userTickets.map(userTicket => {
    const { name, desc, price, salesEndAt } = getStoreData.ticket;
    const { createdAt, isAttendance, id } = userTicket;
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
        refundBtnProps={{
          onClick: (): void => {
            requestRefundCallback({ type: REQUEST, body: [id] });
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
): Map<number, EventCard> {
  const targetMap = new Map<number, EventCard>();
  return produce(targetMap, draft => {
    sourceMap.forEach(value => {
      const { id, mainImg, startAt, title, ticket } = value;

      draft.set(value.id, {
        id,
        mainImg: getImageURL(mainImg, imageTypes.mainEventImg),
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
): Map<number, EventCard> {
  const targetMap = new Map<number, EventCard>();
  return produce(targetMap, draft => {
    sourceMap.forEach(value => {
      const { id, mainImg, startAt, title } = value;

      draft.set(value.id, {
        id,
        mainImg: getImageURL(mainImg, imageTypes.mainEventImg),
        startAt,
        title,
        name: '',
        price: 0,
        to: `${ROUTES.EVENT_DETAIL}/${id}`,
      });
    });
  });
}

export function removeTicketInState(
  boughtTicketEventMap: Map<number, BoughtTicketEvent>,
  boughtTicketEventOrder: number[],
  ticketID: number,
) {
  let willRemoveEventId = 0;
  let willRevmoeOrderIndex = 0;

  for (const boughtTicketEvent of Array.from(boughtTicketEventMap)) {
    for (const userTicket of boughtTicketEvent[1].userTickets) {
      if (userTicket.id === ticketID) {
        willRemoveEventId = boughtTicketEvent[1].id;
        break;
      }
    }
  }
  boughtTicketEventMap.delete(willRemoveEventId);

  for (const index in boughtTicketEventOrder) {
    const eventId = boughtTicketEventOrder[index];
    if (eventId === willRemoveEventId) {
      willRevmoeOrderIndex = +index;
      break;
    }
  }

  boughtTicketEventOrder.splice(willRevmoeOrderIndex, 1);
}
