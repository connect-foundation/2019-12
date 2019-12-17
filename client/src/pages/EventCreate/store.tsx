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
  Object.values(states).every(state => state.valid);

const createFormData = (states: EventCreateFormState) => {
  const formData = new FormData();
  for (const [key, state] of Object.entries(states)) {
    formData.append(key, state.value);
  }
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

  const {
    isPublic,
    eventTitle,
    eventDate,
    eventPlace,
    eventAddress,
    eventPlaceDesc,
    eventMainImg,
    eventDesc,
    ticketName,
    ticketDesc,
    ticketPrice,
    ticketQuantity,
    ticketIsPublicLeftCnt,
    ticketMaxCntPerPerson,
    ticketSalesDate,
    ticketRefundDate,
    submit,
  } = states;
  useEffect(() => {
    console.log('상태 변경!');
    console.log(states);
  }, [states]);
  useEffect(() => {
    console.log(formValid);
    if (formValid) {
    } else {
      alert('잘못된 폼이 있습니다. 확인해주세요.');
      dispatcher({ type: 'submit', value: false });
    }
  }, [formValid, submit]);
  useEffect(() => {
    if (!formValid) return;
    // if (
    //   firstNameValidate ||
    //   lastNameValidate ||
    //   phoneValidate ||
    //   !firstName ||
    //   !lastName ||
    //   !phoneNumber
    // ) {
    alert('입력값을 확인해주세요');
    return;
    // }
    // try {
    //   if (updateUserRes.status === OK) {
    //     alert('이벤트 생성이 완료되었습니다.');
    //     history.push('/');
    //   }
    // } catch (err) {
    //   //400 관련 코드는 전부 err로 넘어옴. 이것을 catch로써 처리함.
    //   if (err.response.status === FORBIDDEN) {
    //     alert('잘못된 입력값입니다.');
    //     dispatcher({ type: 'submit', value: false });
    //   }
    // }
  }, [formValid]);

  return (
    <EventCreateAction.Provider value={dispatcher}>
      <EventCreateState.Provider value={states}>
        {children}
      </EventCreateState.Provider>
    </EventCreateAction.Provider>
  );
}

export default StoreProvider;
