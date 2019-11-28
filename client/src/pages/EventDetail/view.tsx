import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import EventDetailTemplate from './template';

import { EventDataAction, EventDataState } from './store';
import { useFetch } from '../../hooks/base/useFetch';

interface Props {
  eventId: number;
}

function EventDetailView({ eventId }: Props): React.ReactElement {
  const dispatcher = useContext(EventDataAction);
  const states = useContext(EventDataState);

  const fetchResult = useFetch({
    method: 'get',
    url: `http://localhost:4000/api/events/${eventId}`,
  });

  (async function test() {
    const mockURL = `http://localhost:4000/api/events/${eventId}`;
    const result = await axios({
      method: 'get',
      url: mockURL,
    });

    console.log(result);
  })();

  useEffect(() => {
    if (fetchResult.type === 'success') {
      console.log('success');
      dispatcher({ type: 'data', value: fetchResult.data });
    }
  }, [dispatcher, fetchResult]);

  return <EventDetailTemplate data={states.data} />;
}

export default EventDetailView;
