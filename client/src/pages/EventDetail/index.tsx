import React from 'react';
import { useParams } from 'react-router-dom';

import View from './view';
import StoreProvider from './store';

function EventDetail(): React.ReactElement {
  const { eventId } = useParams();

  if (typeof eventId === 'undefined') {
    // already process in Routing (App.tsx)
    return <>404</>;
  }

  return (
    <StoreProvider>
      <View eventId={+eventId} />
    </StoreProvider>
  );
}

export default EventDetail;
