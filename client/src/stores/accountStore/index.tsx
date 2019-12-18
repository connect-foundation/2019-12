import React, {
  createContext,
  useReducer,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { AccountAction } from 'types/Actions';
import { AccountState } from 'types/States';
import { AccountReducer } from 'types/CustomHooks';
import accountReducer, { defaultAccountState } from './reducer';
import useApiRequest, { REQUEST, SUCCESS, FAILURE } from 'hooks/useApiRequest';
import { verifyToken } from 'apis';

export const UserAccountState = createContext<AccountState>(
  defaultAccountState,
);

export const UserAccountAction = createContext<{
  accountDispatcher: Dispatch<AccountAction>;
  setLoginState: Dispatch<SetStateAction<boolean>>;
}>({ accountDispatcher: () => {}, setLoginState: () => {} });

function AccountStoreProvider({ children }: { children: React.ReactElement }) {
  const [accountState, accountDispatcher] = useReducer<AccountReducer>(
    accountReducer,
    defaultAccountState,
  );
  const [loginState, setLoginState] = useState(true);
  const [getTokenResponse, requestToken] = useApiRequest<any>(verifyToken);

  useEffect(() => {
    if (!loginState) return;
    requestToken({ type: REQUEST });
    setLoginState(false);
  }, [loginState, requestToken]);

  useEffect(() => {
    const { type, data, err } = getTokenResponse;
    let dispatchValue = null;
    if (type === REQUEST) return;
    if (type === SUCCESS) dispatchValue = { ...data, isLogin: true };
    if (type === FAILURE) {
      if (err && err.response)
        dispatchValue = { ...err.response.data, isLogin: false };
      else dispatchValue = { isLogin: false };
    }
    accountDispatcher({
      type: 'LOGIN',
      value: dispatchValue,
    });
  }, [getTokenResponse]);

  return (
    <UserAccountAction.Provider value={{ accountDispatcher, setLoginState }}>
      <UserAccountState.Provider value={accountState}>
        {children}
      </UserAccountState.Provider>
    </UserAccountAction.Provider>
  );
}
export default AccountStoreProvider;
