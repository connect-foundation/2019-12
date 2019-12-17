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
    const { type, data } = getTokenResponse;
    if (type === REQUEST) return;
    const accountData = { ...data, isLogin: false };
    if (type === SUCCESS) accountData.isLogin = true;
    accountDispatcher({
      type: 'LOGIN',
      value: accountData,
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
