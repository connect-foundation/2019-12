import React from 'react';
import { useParams } from 'react-router-dom';

import View from './view';

function EventJoin(): React.ReactElement {
  const { eventId } = useParams();

  if (typeof eventId === 'undefined') {
    // already process in Routing (App.tsx)
    return <>404</>;
  }

  return <View eventId={+eventId} />;
}

export default EventJoin;
