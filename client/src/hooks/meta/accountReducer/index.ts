import { AccountState } from '../../../types/States';
import { AccountAction } from '../../../types/Actions';

export const defaultAccountState: AccountState = {
  isLogin: false,
  userId: 0,
  googleId: 0,
  email: '',
  firstName: null,
  lastName: null,
};

export function accountReducer(state: AccountState, action: AccountAction) {
  switch (action.type) {
    case 'LOGOUT': {
      return Object.assign({ ...defaultAccountState });
    }
    case 'LOGIN': {
      // 여기서 action.value를 가져다 쓸 예정임.
      return Object.assign({ ...action.value });
    }
    default: {
      throw new Error(`unexpected action.type: ${action.type}`);
    }
  }
}
