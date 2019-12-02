import React from 'react';
import { useParams } from 'react-router-dom';

import View from './view';
import StoreProvider from './store';

function EventDetail(): React.ReactElement {
  let { eventId } = useParams();
  eventId = eventId || '-1';

  return (
    <StoreProvider>
      <View eventId={+eventId} />
    </StoreProvider>
  );
}

export default EventDetail;
