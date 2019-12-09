import React, { createContext, useReducer, Dispatch } from 'react';

import { EventsAction } from 'types/Actions';
import { EventsState } from 'types/States';
import { EventsReducer } from 'types/CustomHooks';
import { eventsReducer, defaultEventsState } from 'hooks';

export const EventsStoreState = createContext<EventsState>(defaultEventsState);
export const EventsStoreAction = createContext<{
  eventsDispather: Dispatch<EventsAction>;
}>({
  eventsDispather: () => {},
});

function EventsProvider({ children }: { children: React.ReactElement }) {
  const [eventsState, eventsDispather] = useReducer<EventsReducer>(
    eventsReducer,
    defaultEventsState,
  );

  return (
    <EventsStoreState.Provider value={eventsState}>
      <EventsStoreAction.Provider value={{ eventsDispather }}>
        {children}
      </EventsStoreAction.Provider>
    </EventsStoreState.Provider>
  );
}

export default EventsProvider;
