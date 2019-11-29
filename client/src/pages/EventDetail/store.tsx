import React, { createContext, useReducer, Dispatch } from 'react';

import { useStateReducer } from '../../hooks/base/useStateReduter';
import { UseStateReducer } from '../../types/CustomHooks';
import { ActionParams } from '../../types/Actions';
import { EventDetailState } from '../../types/States';

const defaultState: EventDetailState = {
  data: {
    title: '',
    startAt: '',
    endAt: '',
    place: '',
    address: '',
    placeDesc: '',
    mainImg: '',
    desc: '',
    ticketTypes: [
      {
        id: 0,
        eventId: 0,
        name: '',
        desc: '',
        price: 0,
        quantity: 0,
        leftCnt: 0,
        isPublicLeftCnt: false,
        maxCntPerPerson: 0,
        salesStartAt: '',
        salesEndAt: '',
        refundEndAt: '',
      },
    ],
    user: { id: 0, lastName: '', firstName: '' },
  },
};

export const EventDataState = createContext(defaultState);
export const EventDataAction = createContext<
  Dispatch<ActionParams<EventDetailState>>
>(() => {});

function StoreProvider({ children }: { children: React.ReactElement }) {
  const [states, dispatcher] = useReducer<UseStateReducer<EventDetailState>>(
    useStateReducer,
    defaultState,
  );

  return (
    <EventDataAction.Provider value={dispatcher}>
      <EventDataState.Provider value={states}>
        {children}
      </EventDataState.Provider>
    </EventDataAction.Provider>
  );
}

export default StoreProvider;
