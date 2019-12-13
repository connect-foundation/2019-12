import { AxiosResponse } from 'axios';
import { useReducer, useEffect } from 'react';
import { OK } from 'http-status';

export interface FetchProps<T> {
  type: '' | 'REQUEST' | 'SUCCESS' | 'FAILURE';
  data?: T;
  err?: Error;
  status?: number;
}

interface Reducer<T> {
  (result: FetchProps<T>, action: FetchProps<T>): FetchProps<T>;
}
export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

function reducer<T = any>(
  result: FetchProps<T>,
  action: FetchProps<T>,
): FetchProps<T> {
  const { type } = action;

  switch (type) {
    case REQUEST:
      return { type };
    case SUCCESS:
      return { type, data: action.data, status: action.status };
    case FAILURE:
      return { type, err: action.err, status: action.status };
  }
  return result;
}

export default function useApiRequest<T>(
  apiRequest: () => Promise<AxiosResponse<any>>,
): [FetchProps<T>, React.Dispatch<FetchProps<T>>] {
  const initialState: FetchProps<T> = {
    type: '',
  };
  const [result, dispatch] = useReducer<Reducer<T>>(reducer, initialState);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await apiRequest();
        if (status === OK) {
          console.log('success!');
          dispatch({ type: SUCCESS, data, status });
        }
      } catch (err) {
        return dispatch({ type: FAILURE, err, status: err.response.status });
      }
    };
    if (result.type === REQUEST) {
      fetchData();
    }
  }, [result.type, apiRequest]);

  return [result, dispatch];
}
