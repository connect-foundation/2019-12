import React, { useContext, useEffect } from 'react';
import EventDetailTemplate from './template';

import { EventDataAction, EventDataState } from './store';
import { useFetch } from '../../hooks/base/useFetch';

const { REACT_APP_SERVER_URL } = process.env;

interface Props {
  eventId: number;
}

function EventDetailView({ eventId }: Props): React.ReactElement {
  const dispatcher = useContext(EventDataAction);
  const states = useContext(EventDataState);

  const fetchResult = useFetch({
    method: 'get',
    url: `${REACT_APP_SERVER_URL}/api/events/${eventId}`,
  });

  useEffect(() => {
    if (fetchResult.type === 'success') {
      dispatcher({ type: 'data', value: fetchResult.data });
    }
  }, [dispatcher, fetchResult]);

  return <EventDetailTemplate data={states.data} />;
}

export default EventDetailView;
