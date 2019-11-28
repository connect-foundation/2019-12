import Axios, { AxiosRequestConfig } from 'axios';
import { useReducer } from 'react';

interface StateProps<T> {
  type: 'request' | 'success' | 'failure';
  data?: T;
  isLoading: boolean;
  err?: Error;
}
interface ActionProps<T> {
  type: 'request' | 'success' | 'failure';
  data?: T;
  err?: Error;
}

function reducer<T = any>(
  result: StateProps<T>,
  action: ActionProps<T>,
): StateProps<T> {
  const { type } = action;

  switch (type) {
    case 'request':
      return { type, isLoading: true };
    case 'success':
      return { type, isLoading: false, data: action.data };
    case 'failure':
      return { type, isLoading: false, err: action.err };
  }
  return result;
}

export function useFetch<T>(axiosOptions: AxiosRequestConfig) {
  const initialState: StateProps<T> = {
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
