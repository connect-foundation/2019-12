import React, { createContext, useReducer } from 'react';
import { MyPageState } from 'types/States';
import { MyPageReducer } from 'types/CustomHooks';
import { BoughtTicketEvent, CreatedEvent } from 'types/Data';
import myPageReducer from './reducer';
import useAction, { UseAction } from './actions';
import { FetchProps } from 'hooks/useApiRequest';

export const defaultState = {
  events: new Map<number, BoughtTicketEvent>(),
  eventsOrder: [],
  createdEvents: new Map<number, CreatedEvent>(),
  createdEventsOrder: [],
};

const defaultUseAction = {
  successFetchBoughtTicket: (
    boughtTicketResponse: FetchProps<BoughtTicketEvent[]>,
  ) => {},
  failureFetchBoughtTicket: (
    boughtTicketResponse: FetchProps<BoughtTicketEvent[]>,
  ) => {},
  successFetchCreatedEvents: (
    createdEventsResponse: FetchProps<CreatedEvent[]>,
  ) => {},
  failureFetchCreatedEvents: (
    createdEventsResponse: FetchProps<CreatedEvent[]>,
  ) => {},
  updateBoughtTickets: ({
    events,
    eventsOrder,
  }: Pick<MyPageState, 'events' | 'eventsOrder'>) => {},
};

export const MyPageContext = createContext<{
  state: MyPageState;
  dispatch: UseAction;
}>({
  state: defaultState,
  dispatch: defaultUseAction,
});

export default function StoreProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [state, reducerDispatch] = useReducer<MyPageReducer>(
    myPageReducer,
    defaultState,
  );

  const dispatch = useAction(reducerDispatch);

  return (
    <MyPageContext.Provider value={{ state, dispatch }}>
      {children}
    </MyPageContext.Provider>
  );
}
