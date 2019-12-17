import React, { useState, useEffect, useContext, useRef, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

import MyPageTemplate from './template';
import { LNB, CardGrid, EventSection } from 'components';
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
  BOUGHT_TICKET_EVENT_TITLE,
  BOUGHT_TICKET_EVENT_TITLE_CAPTION,
  HISTORY_METHOD_PUSH,
  HISTORY_METHOD_REPLACE,
} from 'commons/constants/string';
import {
  MY_TICKETS_TAB_INDEX,
  MY_CREATED_EVENT_TAB_INDEX,
} from 'commons/constants/number';
import { BoughtTicketEvent, CreatedEvent } from 'types/Data';
import {
  getEventSectionProps,
  getTicketBoxesProps,
  checkBoughtTicketEventRoute,
  convertToEventCardFromBought,
  convertToEventCardTypeFromCreated,
} from './helper';

function MyPage(): React.ReactElement {
  const boughtTicketEventId = useMemo(
    () => checkBoughtTicketEventRoute(window.location.pathname),
    [],
  );
  const [historyPath, setHistoryPath] = useState({
    method: '',
    route: window.location.pathname,
  });
  const currentTabIndex = useRef(MY_TICKETS_TAB_INDEX);
  const { state, dispatch: useAction } = useContext(MyPageContext);
  const [, , removeCookie] = useCookies(['cookie-name']);
  const { accountDispatcher } = useContext(UserAccountAction);
  const history = useHistory();
  function routeByTabIndex(tabIndex: number) {
    const routeActions = [
      () => {
        setHistoryPath({
          method: HISTORY_METHOD_PUSH,
          route: ROUTES.MYPAGE_TICKETS,
        });
        currentTabIndex.current = MY_TICKETS_TAB_INDEX;
      },
      () => {
        setHistoryPath({
          method: HISTORY_METHOD_PUSH,
          route: ROUTES.MYPAGE_CREATED_EVENTS,
        });
        currentTabIndex.current = MY_CREATED_EVENT_TAB_INDEX;
      },
      () => {
        removeCookie('UID');
        accountDispatcher({ type: 'LOGOUT' });
        alert(MY_PAGE_LOGOUT_ALERT);
        setHistoryPath({
          method: HISTORY_METHOD_REPLACE,
          route: ROUTES.HOME,
        });
      },
    ];

    routeActions[tabIndex - 1]();
  }

  const [boughtTicketResponse, requestBoughtTicket] = useApiRequest<
    BoughtTicketEvent[]
  >(getBoughtTicketEvent);
  const [createdEventsResponse, requestCreatedEvents] = useApiRequest<
    CreatedEvent[]
  >(getCreatedEvents);

  useEffect(() => {
    requestBoughtTicket({ type: REQUEST });
    requestCreatedEvents({ type: REQUEST });
  }, [requestBoughtTicket, requestCreatedEvents]);

  useEffect(() => {
    const { pathname } = window.location;
    if (pathname === historyPath.route) return;

    setHistoryPath({
      method: HISTORY_METHOD_REPLACE,
      route: `${ROUTES.MYPAGE_TICKETS_EVENT}/${boughtTicketEventId}`,
    });
  }, [boughtTicketEventId, historyPath.route]);

  useEffect(() => {
    const { route, method } = historyPath;
    const { pathname } = window.location;
    if (pathname === historyPath.route) return;

    if (method === HISTORY_METHOD_PUSH) {
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
          tabIndex={currentTabIndex.current}
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
      boughtTicketEventTemplateProps={{
        eventHeader: (
          <EventSection
            {...getEventSectionProps({
              boughtTicketEventMap: state.events,
              boughtTicketEventId,
            })}
            imgPosition="left"
            border
          />
        ),
        ticketsList: getTicketBoxesProps({
          boughtTicketEventMap: state.events,
          boughtTicketEventId,
        }),
        ticketsTitle: BOUGHT_TICKET_EVENT_TITLE,
        ticektsTitleCaption: BOUGHT_TICKET_EVENT_TITLE_CAPTION,
      }}
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
