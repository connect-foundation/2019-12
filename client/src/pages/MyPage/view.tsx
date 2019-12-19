import React, { useState, useEffect, useContext, useRef } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

import MyPageTemplate from './template';
import { LNB, CardGrid, EventSection } from 'components';
import { UserAccountAction } from 'stores/accountStore';
import { MyPageStateContext, MyPageActionContext } from './store';
import useApiRequest, { REQUEST, SUCCESS, FAILURE } from 'hooks/useApiRequest';
import {
  getBoughtTicketEvent,
  getCreatedEvents,
  refundBoughtTicket,
} from 'apis';
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
  REFUND_TICKET_SUCCESS,
  REFUND_TICKET_FAILURE,
  NOT_FOUND_BOUGHT_TICKET,
  NOT_FOUND_CREATED_EVENT,
} from 'commons/constants/string';
import {
  MY_TICKETS_TAB_INDEX,
  MY_CREATED_EVENT_TAB_INDEX,
} from 'commons/constants/number';
import { BoughtTicketEvent, CreatedEvent } from 'types/Data';
import { BAD_REQUEST, OK } from 'http-status';
import {
  getEventSectionProps,
  getTicketBoxesProps,
  checkBoughtTicketEventRoute,
  convertToEventCardFromBought,
  convertToEventCardTypeFromCreated,
  removeTicketInState,
} from './helper';

function MyPage(): React.ReactElement {
  const boughtTicketEventId = checkBoughtTicketEventRoute(
    window.location.pathname,
  );
  const [historyPath, setHistoryPath] = useState({
    method: '',
    route: window.location.pathname,
  });
  const currentTabIndex = useRef(MY_TICKETS_TAB_INDEX);
  const state = useContext(MyPageStateContext);
  const useAction = useContext(MyPageActionContext);
  const [, , removeCookie] = useCookies(['cookie-name']);
  const { accountDispatcher } = useContext(UserAccountAction);
  const history = useHistory();

  function routeByTabIndex(tabIndex: number): void {
    const routeActions = [
      (): void => {
        setHistoryPath({
          method: HISTORY_METHOD_PUSH,
          route: ROUTES.MYPAGE_TICKETS,
        });
        currentTabIndex.current = MY_TICKETS_TAB_INDEX;
      },
      (): void => {
        setHistoryPath({
          method: HISTORY_METHOD_PUSH,
          route: ROUTES.MYPAGE_CREATED_EVENTS,
        });
        currentTabIndex.current = MY_CREATED_EVENT_TAB_INDEX;
      },
      (): void => {
        removeCookie('UID');
        accountDispatcher({ type: 'LOGOUT' });
        alert(MY_PAGE_LOGOUT_ALERT);
        history.push('/');
      },
    ];

    routeActions[tabIndex - 1]();
  }

  function navigateWithPathname(
    tabIndex: number,
    historyMethod: string,
    historyRoute: string,
  ): void {
    currentTabIndex.current = tabIndex;
    setHistoryPath({
      method: historyMethod,
      route: historyRoute,
    });
  }

  const [boughtTicketResponse, requestBoughtTicket] = useApiRequest<
    BoughtTicketEvent[]
  >(getBoughtTicketEvent);
  const [createdEventsResponse, requestCreatedEvents] = useApiRequest<
    CreatedEvent[]
  >(getCreatedEvents);
  const [refundResponse, requestRefund] = useApiRequest<{ ticketId: number }>(
    refundBoughtTicket,
  );

  useEffect(() => {
    requestBoughtTicket({ type: REQUEST });
    requestCreatedEvents({ type: REQUEST });
  }, [requestBoughtTicket, requestCreatedEvents]);

  useEffect(() => {
    const { pathname } = window.location;
    if (pathname === ROUTES.MYPAGE_TICKETS) {
      navigateWithPathname(
        MY_TICKETS_TAB_INDEX,
        HISTORY_METHOD_PUSH,
        ROUTES.MYPAGE_TICKETS,
      );
    } else if (pathname === ROUTES.MYPAGE_CREATED_EVENTS) {
      navigateWithPathname(
        MY_CREATED_EVENT_TAB_INDEX,
        HISTORY_METHOD_PUSH,
        ROUTES.MYPAGE_CREATED_EVENTS,
      );
    } else if (
      pathname.startsWith(
        `${ROUTES.MYPAGE_TICKETS_EVENT}/${boughtTicketEventId}`,
      )
    ) {
      navigateWithPathname(
        MY_TICKETS_TAB_INDEX,
        HISTORY_METHOD_REPLACE,
        `${ROUTES.MYPAGE_TICKETS_EVENT}/${boughtTicketEventId}`,
      );
    }
  }, [boughtTicketEventId]);

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

  useEffect(() => {
    const { type, status, err, data } = refundResponse;
    if (type === '') return;

    switch (type) {
      case SUCCESS:
        if (status === OK) {
          if (state.events && state.eventsOrder && data) {
            const { ticketId } = data;
            removeTicketInState(state.events, state.eventsOrder, ticketId);
            useAction.updateBoughtTickets({
              events: state.events,
              eventsOrder: state.eventsOrder,
            });
          }
          alert(REFUND_TICKET_SUCCESS);
          navigateWithPathname(
            MY_TICKETS_TAB_INDEX,
            HISTORY_METHOD_PUSH,
            ROUTES.MYPAGE_TICKETS,
          );
          requestRefund({ type: '' });
        }
        break;

      case FAILURE:
        if (!err || !err.response || !err.response.status) {
          alert(REFUND_TICKET_FAILURE);
          return;
        }

        const { status: errStatus } = err.response;
        if (errStatus === BAD_REQUEST) {
          alert(err.response.data.message);
        }
        requestRefund({ type: '' });
        break;
    }
  }, [
    refundResponse,
    requestRefund,
    state.events,
    state.eventsOrder,
    useAction,
  ]);

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
        cardGrid:
          state.events &&
          state.eventsOrder &&
          (state.events.size !== 0 ? (
            <CardGrid
              events={convertToEventCardFromBought(state.events)}
              eventsOrder={state.eventsOrder}
            />
          ) : (
            <h2>{NOT_FOUND_BOUGHT_TICKET}</h2>
          )),
      }}
      createdEventsProps={{
        title: MY_CREATED_EVENTS,
        cardGrid:
          state.createdEvents &&
          state.createdEventsOrder &&
          (state.createdEvents.size !== 0 ? (
            <CardGrid
              events={convertToEventCardTypeFromCreated(state.createdEvents)}
              eventsOrder={state.createdEventsOrder}
            />
          ) : (
            <h2>{NOT_FOUND_CREATED_EVENT}</h2>
          )),
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
          requestRefundCallback: requestRefund,
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
