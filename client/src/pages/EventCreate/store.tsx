import React, {
  useState,
  SetStateAction,
  useEffect,
  createContext,
  useReducer,
  Dispatch,
  useContext,
} from 'react';
import { useHistory } from 'react-router-dom';
import { ActionParams } from 'types/Actions';
import { EventFormState, TicketFormState } from 'types/States';
import { UseStateReducer } from 'types/CustomHooks';
import { EventsStoreAction } from 'stores/eventsStore';
import { createEvent } from 'apis';
import { validateStates } from 'utils/validateInput';
import { EventDetail } from 'types/Data';
import useApiRequest, { REQUEST, SUCCESS, FAILURE } from 'hooks/useApiRequest';
import { ACTION_CREATE_EVENT } from 'commons/constants/string';

export function useStateReducer<T>(state: T, action: ActionParams<T>): T {
  const { type, value } = action;

  return {
    ...state,
    [type]: value,
  };
}

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
    value: true,
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
    valid: true,
    value: '',
  },
  price: {
    valid: true,
    value: '0',
  },
  quantity: {
    valid: false,
    value: '',
  },
  isPublicLeftCnt: {
    valid: true,
    value: true,
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

function StoreProvider({
  children,
}: {
  children: React.ReactElement;
}): JSX.Element {
  const history = useHistory();
  const { eventFetchDispatcher } = useContext(EventsStoreAction);
  const [submit, setSubmit] = useState<boolean>(false);
  const [eventFormStates, eventFormDispatcher] = useReducer<
    UseStateReducer<EventFormState>
  >(useStateReducer, EventFormDefaultState);
  const [ticketFormStates, ticketFormDispatcher] = useReducer<
    UseStateReducer<TicketFormState>
  >(useStateReducer, TicketFormDefaultState);

  const [fetchResult, fetchEvent] = useApiRequest<EventDetail>(createEvent);

  useEffect(() => {
    if (!submit) return;
    const formValid = validateStates(eventFormStates, ticketFormStates);
    if (!formValid) return setSubmit(false);
    const formData = createFormData(eventFormStates, ticketFormStates);
    fetchEvent({ type: REQUEST, body: [formData] });
  }, [fetchEvent, eventFormStates, submit, ticketFormStates]);

  useEffect(() => {
    const { type, data: event } = fetchResult;
    switch (type) {
      case REQUEST:
        break;
      case SUCCESS:
        if (!event) return;
        setSubmit(false);
        eventFetchDispatcher({
          type: ACTION_CREATE_EVENT,
          data: {
            createdEvent: event,
          },
        });
        return history.push(`/events/${event.id}`);
      case FAILURE:
        alert('👀 서버에 무언가 문제가 있네요. 다시한번 시도해주세요.');
        setSubmit(false);
        break;
    }
  }, [eventFetchDispatcher, fetchResult, history]);

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
