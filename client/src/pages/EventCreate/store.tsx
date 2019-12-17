import React, { useEffect, createContext, useReducer, Dispatch } from 'react';
import { useHistory } from 'react-router-dom';
import { BAD_REQUEST, FORBIDDEN, OK } from 'http-status';

import { ActionParams } from 'types/Actions';
import { EventCreateFormState } from 'types/States';
import { UseStateReducer } from 'types/CustomHooks';
import { createEvent } from 'apis';

export function useStateReducer<T>(state: T, action: ActionParams<T>): T {
  const { type, value } = action;

  return {
    ...state,
    [type]: value,
  };
}

const defaultState: EventCreateFormState = {
  isPublic: {
    valid: true,
    value: false,
  },
  eventTitle: {
    valid: false,
    value: '',
  },
  eventDate: {
    valid: false,
    value: {
      startAt: '',
    },
  },
  eventPlace: {
    valid: false,
    value: '',
  },
  eventAddress: {
    valid: false,
    value: {
      address: '',
      latitude: 0,
      longitude: 0,
    },
  },
  eventPlaceDesc: {
    valid: false,
    value: '',
  },
  eventMainImg: {
    valid: false,
    value: {},
  },
  eventDesc: {
    valid: false,
    value: '',
  },
  ticketName: {
    valid: false,
    value: '',
  },
  ticketDesc: {
    valid: false,
    value: '',
  },
  ticketPrice: {
    valid: false,
    value: '',
  },
  ticketQuantity: {
    valid: false,
    value: '',
  },
  ticketIsPublicLeftCnt: {
    valid: false,
    value: false,
  },
  ticketMaxCntPerPerson: {
    valid: false,
    value: '',
  },
  ticketSalesDate: {
    valid: false,
    value: {
      startAt: '',
    },
  },
  ticketRefundDate: {
    valid: false,
    value: {
      startAt: '',
    },
  },
  submit: false,
};

const validateStates = (states: EventCreateFormState) =>
  Object.values(states).every((state, index, arr) =>
    index === arr.length - 1 ? true : state.valid,
  );

const createFormData = (states: EventCreateFormState) => {
  const formData = new FormData();
  for (const [key, state] of Object.entries(states)) {
    formData.append(key, state.value);
  }
  console.log(formData);
  return formData;
};

export const EventCreateState = createContext<EventCreateFormState>(
  defaultState,
);
export const EventCreateAction = createContext<
  Dispatch<ActionParams<EventCreateFormState>>
>(() => {});

function StoreProvider({ children }: { children: React.ReactElement }) {
  const history = useHistory();
  const [states, dispatcher] = useReducer<
    UseStateReducer<EventCreateFormState>
  >(useStateReducer, defaultState);
  const formValid = validateStates(states);

  const { submit } = states;

  useEffect(() => {
    console.log('상태 변경!');
    console.log(states);
  }, [states]);

  useEffect(() => {
    console.log('formValid', formValid);
    if (!formValid) {
      dispatcher({ type: 'submit', value: false });
      return alert('입력값을 확인해주세요.');
    }
    // const createdFormData = createFormData(states);
  }, [formValid, submit]);

  return (
    <EventCreateState.Provider value={states}>
      <EventCreateAction.Provider value={dispatcher}>
        {children}
      </EventCreateAction.Provider>
    </EventCreateState.Provider>
  );
}

export default StoreProvider;
