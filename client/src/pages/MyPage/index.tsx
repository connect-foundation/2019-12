import React, { useState, useEffect, useContext, useReducer } from 'react';
// eslint-disable-next-line
import { useHistory, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import MyPageTemplate from './template';
import { LNB, CardGrid } from 'components';

import ROUTES from 'commons/constants/routes';
import { MY_TICKETS_TITLE, MY_CREATED_EVENTS } from 'commons/constants/string';
import { BoughtTicketEvent, EventCard, CreatedEvent } from 'types/Data';
import { UserAccountAction } from 'stores/accountStore';

import MyPageReducer, {
  Reducer,
  defaultState,
  FETCH_EVENTS,
  FETCH_CREATED_EVENTS,
} from './reducer';
import { getBoughtTicketEvent } from 'apis';
import useApiRequest, { REQUEST, SUCCESS, FAILURE } from 'hooks/useApiRequest';
import { produce } from 'immer';
import { getCreatedEvents } from '../../apis/user';

interface TemplateRoutesProps {
  [key: string]: string;
}

// const templateRoutes: TemplateRoutesProps = {
//   tickets: ROUTES.MYPAGE_TICKETS,
//   events: ROUTES.MYPAGE_CREATED_EVENTS,
//   logout: ROUTES.LOGOUT,
// };

function checkBoughtTicketEventRoute(url: string) {
  const boughtTicketEventRegex = url.match(/\/my\/tickets\/event\/([0-9]+)/);

  let boughtTicketEventId = 0;
  if (boughtTicketEventRegex && boughtTicketEventRegex[1]) {
    boughtTicketEventId = +boughtTicketEventRegex[1];
  }

  return boughtTicketEventId;
}

function MyPage(): React.ReactElement {
  // const { templateName } = useParams();

  const boughtTicketEventId = checkBoughtTicketEventRoute(window.location.href);
  const defaultReplace = boughtTicketEventId
    ? `${ROUTES.MYPAGE_TICKETS_EVENT}/${boughtTicketEventId}`
    : '';

  const [requsetReplace, setRequestReplace] = useState(defaultReplace);
  // const [currrentTabIndex, setCurrentTabIndex] = useState();
  const [requestBoughtData, setRequestBoughtData] = useApiRequest<
    BoughtTicketEvent[]
  >(getBoughtTicketEvent);
  const [requestCreatedEventData, setRequestCreatedEventData] = useApiRequest<
    CreatedEvent[]
  >(getCreatedEvents);

  const [state, dispatch] = useReducer<Reducer>(MyPageReducer, defaultState);

  // const history = useHistory();
  const [, , removeCookie] = useCookies(['cookie-name']);
  const { accountDispatcher } = useContext(UserAccountAction);

  const routeByTabIndex = (tabIndex: number) => {
    const routeActions = [
      () => {
        setRequestReplace(ROUTES.MYPAGE_TICKETS);
      },
      () => {
        setRequestReplace(ROUTES.MYPAGE_CREATED_EVENTS);
      },
      () => {
        removeCookie('UID');
        accountDispatcher({ type: 'LOGOUT' });
        alert('로그아웃 되었습니다.');
        setRequestReplace(ROUTES.HOME);
      },
    ];

    routeActions[tabIndex - 1]();
  };

  // const isPossibleHistoryMove =
  //   requsetReplace !== '' &&
  //   templateName &&
  //   templateRoutes[templateName] !== requsetReplace;

  const convertToEventCardFromBought = (
    sourceMap: Map<number, BoughtTicketEvent>,
  ) => {
    const targetMap = new Map<number, EventCard>();
    return produce(targetMap, draft => {
      sourceMap.forEach(value => {
        const { id, mainImg, startAt, title, ticket } = value;
        const eventCard: EventCard = {
          id,
          mainImg,
          startAt,
          title,
          name: '',
          price: ticket.price,
        };

        draft.set(value.id, eventCard);
      });
    });
  };

  const convertToEventCardTypeFromCreated = (
    sourceMap: Map<number, CreatedEvent>,
  ) => {
    const targetMap = new Map<number, EventCard>();
    return produce(targetMap, draft => {
      sourceMap.forEach(value => {
        const { id, mainImg, startAt, title } = value;
        const eventCard: EventCard = {
          id,
          mainImg,
          startAt,
          title,
          name: '',
          price: 0,
        };

        draft.set(value.id, eventCard);
      });
    });
  };

  useEffect(
    () => {
      setRequestBoughtData({ type: REQUEST });
      setRequestCreatedEventData({ type: REQUEST });
    },
    // eslint-disable-next-line
    [],
  );

  useEffect(
    () => {
      const { type } = requestBoughtData;
      switch (type) {
        case SUCCESS:
          const { data } = requestBoughtData;
          if (data) {
            const events = new Map<number, BoughtTicketEvent>();
            const eventsOrder = data.map((event: BoughtTicketEvent) => {
              events.set(event.id, event);
              return event.id;
            });
            dispatch({
              type: FETCH_EVENTS,
              value: {
                events,
                eventsOrder,
                createdEvents: state.createdEvents,
                createdEventsOrder: state.createdEventsOrder,
              },
            });
          }
          break;

        case FAILURE:
          alert(`요청에 실패했습니다. ${requestBoughtData.status}`);
          break;
      }
    },
    // eslint-disable-next-line
    [requestBoughtData.type],
  );

  useEffect(
    () => {
      const { type } = requestCreatedEventData;
      switch (type) {
        case SUCCESS:
          const { data } = requestCreatedEventData;
          if (data) {
            const createdEvents = new Map<number, CreatedEvent>();
            const createdEventsOrder = data.map((event: CreatedEvent) => {
              createdEvents.set(event.id, event);
              return event.id;
            });
            dispatch({
              type: FETCH_CREATED_EVENTS,
              value: {
                events: state.events,
                eventsOrder: state.eventsOrder,
                createdEvents,
                createdEventsOrder,
              },
            });
          }
          break;

        case FAILURE:
          alert(`요청에 실패했습니다. ${requestBoughtData.status}`);
          break;
      }
    },
    // eslint-disable-next-line
    [requestCreatedEventData.type],
  );

  return (
    <MyPageTemplate
      routePath={requsetReplace || ROUTES.MYPAGE_TICKETS}
      lnbTab={
        <LNB
          items={['내 티켓', '주최한 이벤트', '로그아웃']}
          onTabClicked={routeByTabIndex}
        />
      }
      ticketsProps={{
        title: MY_TICKETS_TITLE,
        cardGrid: (
          <CardGrid
            events={convertToEventCardFromBought(state.events)}
            eventsOrder={state.eventsOrder}
          />
        ),
      }}
      createdEventsProps={{
        title: MY_CREATED_EVENTS,
        cardGrid: (
          <CardGrid
            events={convertToEventCardTypeFromCreated(state.createdEvents)}
            eventsOrder={state.createdEventsOrder}
          />
        ),
      }}
      boughtTicketEventTemplateProps={{ eventId: boughtTicketEventId }}
      isLoading={requestBoughtData.type === REQUEST}
    />
  );
}

export default MyPage;
