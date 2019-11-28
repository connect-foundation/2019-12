import React from 'react';
import { useParams } from 'react-router-dom';

import BasedTemplate from '../BasedTemplate/templates';
import View from './view';
import StoreProvider from './store';

function EventDetail(): React.ReactElement {
  let { eventId } = useParams();
  eventId = eventId || '';

  return (
    <StoreProvider>
      <BasedTemplate>
        <View eventId={+eventId} />
      </BasedTemplate>
    </StoreProvider>
  );
}

export default EventDetail;
