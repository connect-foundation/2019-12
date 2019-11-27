import Axios from 'axios';
import { useReducer } from 'react';

interface StateProps {
  type: string;
  data?: object;
  isLoading?: boolean;
  err?: Error;
}
interface ActionProps {
  type: string;
  data?: object;
  err?: Error;
}

function reducer(result: StateProps, action: ActionProps): StateProps {
  const { type } = action;

  switch (type) {
    case 'request':
      return { type, isLoading: true };
    case 'success':
      return { type, isLoading: false, data: action.data };
    default:
      return { type, isLoading: false, err: action.err };
  }
}

export function useFetch(axiosOptions: object) {
  const initialState = {
    type: 'request',
    isLoading: true,
  };

  const [result, dispatch] = useReducer(reducer, initialState);

  Axios(axiosOptions)
    .then(({ status, data }) => {
      if (status === 200) {
        dispatch({ type: 'success', data });
      }
    })
    .catch(err => {
      dispatch({ type: 'failure', err });
    });

  return result;
}
