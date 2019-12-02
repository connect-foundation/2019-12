import React, { createContext, useReducer, Dispatch } from 'react';

interface AccountState {
  // Account 상태가 False일 경우, 모든 항목이 null임, 만약 true일 경우 모든 항목이 다 있어야함.
  // 만약 회원가입을 하지 않아서 값이 넘어오질 않으면, 이 State를 업데이트하지 않음.
  isLogin: boolean;
  userId: number | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  exp: number | null;
}
interface AccountAction {
  type: string;
  value: AccountState;
}
interface AccountReducer {
  (state: AccountState, action: AccountAction): AccountState;
}
const defaultAccountState: AccountState = {
  isLogin: false,
  userId: null,
  email: null,
  firstName: null,
  lastName: null,
  exp: null,
};

function accountReducer(state: AccountState, action: AccountAction) {
  switch (action.type) {
    case 'LOGOUT': {
      return Object.assign({ ...defaultAccountState });
    }
    case 'LOGIN': {
      // 여기서 action.value를 가져다 쓸 예정임.
      return Object.assign({ ...state, isLogin: true });
    }
    default: {
      throw new Error(`unexpected action.type: ${action.type}`);
    }
  }
}
export const AccountState = createContext<AccountState>(defaultAccountState);
export const AccountAction = createContext<Dispatch<AccountAction>>(() => {});

function AccountStoreProvider({ children }: { children: React.ReactElement }) {
  const [accountState, accountDispatcher] = useReducer<AccountReducer>(
    accountReducer,
    defaultAccountState,
  );

  return (
    <AccountAction.Provider value={accountDispatcher}>
      <AccountState.Provider value={accountState}>
        {children}
      </AccountState.Provider>
    </AccountAction.Provider>
  );
}

export default AccountStoreProvider;
