import { ActionParams } from 'types/Actions';
/**
 * useState로써 사용되는 state 들을 한번에 넘길 수 있는 것.
 * @param state state로써 사용될 것들을 객체형식으로 넣어주면 됨.
 * @param action Action으로써 사용될 Param을 넘겨줌.
 * Action의 type은 state의 key를 넣으면 됨.
 * Action의 value는 리턴되는 값임.
 */
export function useStateReducer<T>(state: T, action: ActionParams<T>): T {
  const { type, value } = action;

  return {
    ...state,
    [type]: value,
  };
}
