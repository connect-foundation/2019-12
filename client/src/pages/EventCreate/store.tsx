import React, { useEffect, createContext, useReducer, Dispatch } from 'react';
import { ActionParams } from 'types/Actions';
import { EventFormState, TicketFormState } from 'types/States';
import { UseStateReducer } from 'types/CustomHooks';
import { createEvent } from 'apis';

export function useStateReducer<T>(state: T, action: ActionParams<T>): T {
  const { type, value } = action;

  return {
    ...state,
    [type]: value,
  };
}

const validateStates = (
  eventFormStates: EventFormState,
  ticketFormStates: TicketFormState,
) =>
  Object.values(eventFormStates).every(state => state.valid) &&
  Object.values(ticketFormStates).every(state => state.valid);

const createFormData = (
  eventFormStates: EventFormState,
  ticketFormStates: TicketFormState,
) => {
  const form: any = {};
  const ticket: any = {};
  for (const [key, state] of Object.entries(eventFormStates)) {
    if (typeof state.value !== 'object') form[key] = state.value;
    else {
      for (const [key, value] of Object.entries(state.value)) {
        form[key] = value;
      }
    }
  }
  for (const [key, state] of Object.entries(ticketFormStates)) {
    if (typeof state.value !== 'object') ticket[key] = state.value;
    else {
      for (const [key, value] of Object.entries(state.value)) {
        ticket[key] = value;
      }
    }
  }
  console.log({ ...form, ticket });
  // isPublic: true,
  // title: '이벤트의 제목',
  // startAt: '2200-12-15 10:00:00',
  // endAt: '2201-05-01 13:00:00',
  // place: '패스트파이브 강남 4호점',
  // address: '서울시 강남구',
  // placeDesc: '주차 불가',
  // desc: '설명',
  // latitude: 37.5662952,
  // longitude: 126.9779451,
  // 'ticket[name]': '티켓 이름',
  // 'ticket[desc]': '티켓 설명',
  // 'ticket[quantity]': 30,
  // 'ticket[isPublicLeftCnt]': false,
  // 'ticket[maxCntPerPerson]': 10,
  // 'ticket[price]': 10000,
  // 'ticket[salesStartAt]': '2200-12-15 10:00:00',
  // 'ticket[salesEndAt]': '2200-12-17 13:00:00',
  // 'ticket[refundEndAt]': '2200-12-20 13:00:00',
  // console.log(formData);
};

const EventFormDefaultState: EventFormState = {
  isPublic: {
    valid: true,
    value: false,
  },
  title: {
    valid: false,
    value: '',
  },
  date: {
    valid: false,
    value: {
      startAt: '',
    },
  },
  place: {
    valid: false,
    value: '',
  },
  address: {
    valid: false,
    value: {
      address: '',
      latitude: 0,
      longitude: 0,
    },
  },
  placeDesc: {
    valid: false,
    value: '',
  },
  mainImg: {
    valid: false,
    value: '',
  },
  desc: {
    valid: false,
    value: '',
  },
};
const TicketFormDefaultState: TicketFormState = {
  name: {
    valid: false,
    value: '',
  },
  desc: {
    valid: false,
    value: '',
  },
  price: {
    valid: false,
    value: '',
  },
  quantity: {
    valid: false,
    value: '',
  },
  isPublicLeftCnt: {
    valid: false,
    value: false,
  },
  maxCntPerPerson: {
    valid: false,
    value: '',
  },
  salesDate: {
    valid: false,
    value: {
      salesStartAt: '',
      salesEndAt: '',
    },
  },
  refundDate: {
    valid: false,
    value: {
      refundEndAt: '',
    },
  },
};
export const EventState = createContext<EventFormState>(EventFormDefaultState);
export const EventAction = createContext<
  Dispatch<ActionParams<EventFormState>>
>(() => {});
export const TicketState = createContext<TicketFormState>(
  TicketFormDefaultState,
);
export const TicketAction = createContext<
  Dispatch<ActionParams<TicketFormState>>
>(() => {});

function StoreProvider({ children }: { children: React.ReactElement }) {
  const [eventFormStates, eventFormDispatcher] = useReducer<
    UseStateReducer<EventFormState>
  >(useStateReducer, EventFormDefaultState);
  const [ticketFormStates, ticketFormDispatcher] = useReducer<
    UseStateReducer<TicketFormState>
  >(useStateReducer, TicketFormDefaultState);
  // const formValid = validateStates(states);

  // const { submit } = states;

  useEffect(() => {
    console.log('상태 변경!');
    // console.log('eventFormStates', eventFormStates);
    // console.log('ticketFormStates', ticketFormStates);
    console.log(
      '유효성 -> ',
      validateStates(eventFormStates, ticketFormStates),
    );
    createFormData(eventFormStates, ticketFormStates);
  }, [eventFormStates, ticketFormStates]);

  // useEffect(() => {
  //   const createdFormData = createFormData(states);
  //   // console.log('formValid', formValid);
  //   // if (!formValid) {
  //   //   dispatcher({ type: 'submit', value: false });
  //   //   return alert('입력값을 확인해주세요.');
  //   // }

  //   console.dir(createdFormData);
  // }, [submit]);

  return (
    <EventState.Provider value={eventFormStates}>
      <EventAction.Provider value={eventFormDispatcher}>
        <TicketState.Provider value={ticketFormStates}>
          <TicketAction.Provider value={ticketFormDispatcher}>
            {children}
          </TicketAction.Provider>
        </TicketState.Provider>
      </EventAction.Provider>
    </EventState.Provider>
  );
}

export default StoreProvider;
