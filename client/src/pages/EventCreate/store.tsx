import React, {
  useState,
  SetStateAction,
  useEffect,
  createContext,
  useReducer,
  Dispatch,
} from 'react';
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

const validateStateWithTraverse = (
  states: EventFormState | TicketFormState,
): boolean =>
  Object.entries(states).every(([key, value]) => {
    if (value.valid) return true;
    alert(`${key}가 올바르지 않습니다. 확인해주세요. 👀`);
    return false;
  });
const validateStates = (
  eventFormStates: EventFormState,
  ticketFormStates: TicketFormState,
): boolean =>
  validateStateWithTraverse(eventFormStates) &&
  validateStateWithTraverse(ticketFormStates);

const convertKeyWithObject = (key: string, object?: string): string =>
  object ? `${object}[${key}]` : key;
const appendStatesToFormData = (
  formData: FormData,
  states: EventFormState | TicketFormState,
  object?: string,
): void => {
  for (const [key, state] of Object.entries(states)) {
    const stateValue = state.value;
    if (key === 'mainImg' || typeof stateValue !== 'object')
      formData.append(convertKeyWithObject(key, object), stateValue);
    else
      for (const [key, value] of Object.entries<string>(stateValue))
        formData.append(convertKeyWithObject(key, object), value);
  }
};

const createFormData = (
  eventFormStates: EventFormState,
  ticketFormStates: TicketFormState,
): FormData => {
  const formData = new FormData();
  appendStatesToFormData(formData, eventFormStates);
  appendStatesToFormData(formData, ticketFormStates, 'ticket');
  return formData;
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
    valid: true,
    value: '',
  },
  mainImg: {
    valid: false,
    value: new File([], 'maiImg'),
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
export const SubmitContext = createContext<Dispatch<SetStateAction<boolean>>>(
  () => {},
);
async function send(formData: FormData): Promise<void> {
  try {
    const { data } = await createEvent(formData);
    console.log(data);
  } catch (err) {
    console.log('fail');
    alert('-ㅇ- 무언가 문제가 있네요. 다시한번 폼을 확인해주세요.');
    console.dir(err);
  }
}
function StoreProvider({
  children,
}: {
  children: React.ReactElement;
}): JSX.Element {
  const [submit, setSubmit] = useState<boolean>(false);
  const [eventFormStates, eventFormDispatcher] = useReducer<
    UseStateReducer<EventFormState>
  >(useStateReducer, EventFormDefaultState);
  const [ticketFormStates, ticketFormDispatcher] = useReducer<
    UseStateReducer<TicketFormState>
  >(useStateReducer, TicketFormDefaultState);

  useEffect(() => {
    console.log('상태 변경!');
    console.log(eventFormStates);
    console.log(ticketFormStates);
  }, [eventFormStates, ticketFormStates]);

  useEffect(() => {
    if (!submit) return;
    const formValid = validateStates(eventFormStates, ticketFormStates);
    if (!formValid) return setSubmit(false);
    const formData = createFormData(eventFormStates, ticketFormStates);
    send(formData);
  }, [eventFormStates, submit, ticketFormStates]);

  return (
    <EventAction.Provider value={eventFormDispatcher}>
      <TicketAction.Provider value={ticketFormDispatcher}>
        <TicketState.Provider value={ticketFormStates}>
          <EventState.Provider value={eventFormStates}>
            <SubmitContext.Provider value={setSubmit}>
              {children}
            </SubmitContext.Provider>
          </EventState.Provider>
        </TicketState.Provider>
      </TicketAction.Provider>
    </EventAction.Provider>
  );
}

export default StoreProvider;
