import React from 'react';

import StoreProvider from './store';
import View from './view';

function SignUpPage(): React.ReactElement {
  return (
    <StoreProvider>
      <View />
    </StoreProvider>
  );
}

export default SignUpPage;
