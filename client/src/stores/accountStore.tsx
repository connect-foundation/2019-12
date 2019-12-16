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
import { accountReducer, defaultAccountState } from 'hooks';
import { verifyToken, getUserInfo } from 'apis';
import { OK, UNAUTHORIZED } from 'http-status';

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

  useEffect(() => {
    if (!loginState) return;
    (async function() {
      let account = null;
      try {
        const { data } = await verifyToken();
        if (data.exist) {
          const accountData = await getUserInfo(data.id);
          account = { ...accountData.data, isLogin: true };
        }
      } catch (err) {
        account = { isLogin: false };
      } finally {
        accountDispatcher({
          type: 'LOGIN',
          value: account,
        });
      }
    })();
    setLoginState(false);
  }, [loginState]);

  return (
    <UserAccountAction.Provider value={{ accountDispatcher, setLoginState }}>
      <UserAccountState.Provider value={accountState}>
        {children}
      </UserAccountState.Provider>
    </UserAccountAction.Provider>
  );
}
export default AccountStoreProvider;
