import axios, { AxiosRequestConfig } from 'axios';
import { useReducer, useEffect } from 'react';

export interface FetchProps<T> {
  type: 'request' | 'success' | 'failure';
  data?: T;
  err?: Error;
}

function reducer<T = any>(
  result: FetchProps<T>,
  action: FetchProps<T>,
): FetchProps<T> {
  const { type } = action;

  switch (type) {
    case 'request':
      return { type };
    case 'success':
      return { type, data: action.data };
    case 'failure':
      return { type, err: action.err };
  }
  return result;
}

export function useFetch<T>(axiosOptions: AxiosRequestConfig) {
  const initialState: FetchProps<T> = {
    type: 'request',
  };
  const [result, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await axios(axiosOptions);
        if (status === 200) {
          dispatch({ type: 'success', data });
        }
      } catch (err) {
        dispatch({ type: 'failure', err });
      }
    };

    if (result.type === 'request') {
      fetchData();
    }
  }, [result.type, axiosOptions]);

  return result;
}
