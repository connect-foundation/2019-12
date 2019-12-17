import axios, { AxiosRequestConfig } from 'axios';
import { useReducer, useEffect } from 'react';
import { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } from 'http-status';
import delay from 'utils/delay';

export interface FetchProps<T> {
  type: 'request' | 'success' | 'failure';
  data?: T;
  err?: Error;
  status?: number;
}

interface Reducer<T> {
  (result: FetchProps<T>, action: FetchProps<T>): FetchProps<T>;
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
      return { type, data: action.data, status: action.status };
    case 'failure':
      return { type, err: action.err, status: action.status };
  }
  return result;
}

export default function useFetch<T>(
  axiosOptions: AxiosRequestConfig,
): FetchProps<T> {
  const initialState: FetchProps<T> = {
    type: 'request',
  };
  const [result, dispatch] = useReducer<Reducer<T>>(reducer, initialState);
  useEffect(() => {
    let retry = true;
    const fetchData = async () => {
      try {
        const { status, data } = await axios(axiosOptions);
        if (status === OK) {
          dispatch({ type: 'success', data, status });
        }
      } catch (err) {
        if (err.response && err.response.status === NOT_FOUND)
          return dispatch({ type: 'failure', err, status: NOT_FOUND });
        if (!retry)
          return dispatch({
            type: 'failure',
            err,
            status: INTERNAL_SERVER_ERROR,
          });
        retry = !retry;
        await delay(1000);
        fetchData();
      }
    };
    if (result.type === 'request') {
      fetchData();
    }
  }, [result.type, axiosOptions]);

  return result;
}
