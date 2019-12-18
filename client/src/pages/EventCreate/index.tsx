import React from 'react';

import StoreProvider from './store';
import View from './view';

function EventCreatePage(): React.ReactElement {
  return (
    <StoreProvider>
      <View />
    </StoreProvider>
  );
}

export default EventCreatePage;
