import React, {
  createContext,
  useReducer,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';

import { AccountAction } from '../types/Actions';
import { AccountState } from '../types/States';
import { AccountReducer } from '../types/CustomHooks';
import { accountReducer, defaultAccountState } from '../hooks';

const { REACT_APP_SERVER_URL } = process.env;

const verifyToken = () =>
  axios(`${REACT_APP_SERVER_URL}/api/auth`, {
    method: 'post',
    withCredentials: true,
  });

const getUserInfo = (id: number) =>
  axios.post(`${REACT_APP_SERVER_URL}/api/users/${id}`);

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
      try {
        const verifyTokenResult = await verifyToken();
        let account = null;
        if (verifyTokenResult.data.exist) {
          const accountData = await getUserInfo(verifyTokenResult.data.id);
          account = { ...accountData.data, isLogin: true };
        } else {
          const { id: userId, googleId, email } = verifyTokenResult.data;
          account = { userId, googleId, email, isLogin: false };
        }
        accountDispatcher({
          type: 'LOGIN',
          value: account,
        });
      } catch (err) {
        // 만약 API 콜이 실패했을 경우 이곳에서 에러처리
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
