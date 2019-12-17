import React, { useState, useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { produce } from 'immer';
import { useHistory } from 'react-router-dom';

import MyPageTemplate from './template';
import { LNB, CardGrid } from 'components';
import { UserAccountAction } from 'stores/accountStore';
import { MyPageContext } from './store';
import useApiRequest, { REQUEST, SUCCESS, FAILURE } from 'hooks/useApiRequest';
import { getBoughtTicketEvent, getCreatedEvents } from 'apis';
import ROUTES from 'commons/constants/routes';
import {
  MY_TICKETS_TITLE,
  MY_CREATED_EVENTS,
  MY_PAGE_LNB_MY_TICKETS,
  MY_PAGE_CREATED_EVENTS,
  MY_PAGE_LOGOUT,
  MY_PAGE_LOGOUT_ALERT,
} from 'commons/constants/string';
import { BoughtTicketEvent, EventCard, CreatedEvent } from 'types/Data';

function MyPage(): React.ReactElement {
  const myTicketEventsRoute = /\/my\/tickets\/event\/([0-9]+)/;
  const tabRoutes = {
    [ROUTES.MYPAGE_TICKETS]: 1,
    [ROUTES.MYPAGE_CREATED_EVENTS]: 2,
  };

  function checkBoughtTicketEventRoute(url: string) {
    const boughtTicketEventRegex = url.match(myTicketEventsRoute);
    let boughtTicketEventId = 0;
    if (boughtTicketEventRegex && boughtTicketEventRegex[1]) {
      boughtTicketEventId = +boughtTicketEventRegex[1];
    }
    return boughtTicketEventId;
  }

  function routeByTabIndex(tabIndex: number) {
    const routeActions = [
      () => {
        setHistoryPath({
          method: 'push',
          route: ROUTES.MYPAGE_TICKETS,
        });
        setCurrentTabIndex(1);
      },
      () => {
        setHistoryPath({
          method: 'push',
          route: ROUTES.MYPAGE_CREATED_EVENTS,
        });
        setCurrentTabIndex(2);
      },
      () => {
        removeCookie('UID');
        accountDispatcher({ type: 'LOGOUT' });
        alert(MY_PAGE_LOGOUT_ALERT);
        setHistoryPath({ method: 'replace', route: ROUTES.HOME });
      },
    ];

    routeActions[tabIndex - 1]();
  }

  function convertToEventCardFromBought(
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

  function convertToEventCardTypeFromCreated(
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

  const boughtTicketEventId = checkBoughtTicketEventRoute(
    window.location.pathname,
  );

  const [historyPath, setHistoryPath] = useState({
    method: '',
    route: window.location.pathname,
  });
  const [currentTabIndex, setCurrentTabIndex] = useState(1);

  const { state, dispatch: useAction } = useContext(MyPageContext);
  const [, , removeCookie] = useCookies(['cookie-name']);
  const { accountDispatcher } = useContext(UserAccountAction);
  const history = useHistory();

  const [boughtTicketResponse, requestBoughtTicket] = useApiRequest<
    BoughtTicketEvent[]
  >(getBoughtTicketEvent);
  const [createdEventsResponse, requestCreatedEvents] = useApiRequest<
    CreatedEvent[]
  >(getCreatedEvents);

  useEffect(() => {
    requestBoughtTicket({ type: REQUEST });
  }, [requestBoughtTicket]);

  useEffect(() => {
    requestCreatedEvents({ type: REQUEST });
  }, [requestCreatedEvents]);

  useEffect(() => {
    const { pathname } = window.location;
    setCurrentTabIndex(tabRoutes[pathname]);
  }, [tabRoutes]);

  useEffect(() => {
    const { route, method } = historyPath;
    const { pathname } = window.location;
    if (pathname === historyPath.route) {
      return;
    }
    if (method === 'push') {
      history.push(route);
      return;
    }
    history.replace(route);
  }, [historyPath, history]);

  useEffect(() => {
    const { type } = boughtTicketResponse;
    if (state.events && state.events.size !== 0) return;
    switch (type) {
      case SUCCESS:
        useAction.successFetchBoughtTicket(boughtTicketResponse);
        break;

      case FAILURE:
        useAction.failureFetchBoughtTicket(boughtTicketResponse);
        break;
    }
  }, [useAction, boughtTicketResponse, state.events]);

  useEffect(() => {
    const { type } = createdEventsResponse;
    if (state.createdEvents && state.createdEvents.size !== 0) return;
    switch (type) {
      case SUCCESS:
        useAction.successFetchCreatedEvents(createdEventsResponse);
        break;

      case FAILURE:
        useAction.failureFetchCreatedEvents(createdEventsResponse);
        break;
    }
  }, [useAction, createdEventsResponse, state.createdEvents]);

  return (
    <MyPageTemplate
      routePath={historyPath.route}
      lnbTab={
        <LNB
          items={[
            MY_PAGE_LNB_MY_TICKETS,
            MY_PAGE_CREATED_EVENTS,
            MY_PAGE_LOGOUT,
          ]}
          onTabClicked={routeByTabIndex}
          tabIndex={currentTabIndex}
        />
      }
      ticketsProps={{
        title: MY_TICKETS_TITLE,
        cardGrid: state.events && state.eventsOrder && (
          <CardGrid
            events={convertToEventCardFromBought(state.events)}
            eventsOrder={state.eventsOrder}
          />
        ),
      }}
      createdEventsProps={{
        title: MY_CREATED_EVENTS,
        cardGrid: state.createdEvents && state.createdEventsOrder && (
          <CardGrid
            events={convertToEventCardTypeFromCreated(state.createdEvents)}
            eventsOrder={state.createdEventsOrder}
          />
        ),
      }}
      boughtTicketEventTemplateProps={{ eventId: boughtTicketEventId }}
      isLoading={
        boughtTicketResponse.type === REQUEST ||
        createdEventsResponse.type === REQUEST
      }
      isInternalError={
        boughtTicketResponse.type === FAILURE ||
        createdEventsResponse.type === FAILURE
      }
    />
  );
}

export default MyPage;
