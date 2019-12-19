import React, { createContext, useState, Dispatch } from 'react';

export const AfterLoginState = createContext<string>('');
export const AfterLoginAction = createContext<{
  setLoginCallback: Dispatch<string>;
}>({ setLoginCallback: () => {} });

function AccountStoreProvider({ children }: { children: React.ReactElement }) {
  const [loginCallbackState, setLoginCallback] = useState<string>('');

  return (
    <AfterLoginState.Provider value={loginCallbackState}>
      <AfterLoginAction.Provider value={{ setLoginCallback }}>
        {children}
      </AfterLoginAction.Provider>
    </AfterLoginState.Provider>
  );
}

export default AccountStoreProvider;
