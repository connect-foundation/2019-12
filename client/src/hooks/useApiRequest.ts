import { AxiosResponse, AxiosError } from 'axios';
import { useReducer, useEffect } from 'react';

export interface FetchProps<T> {
  type: '' | 'REQUEST' | 'SUCCESS' | 'FAILURE';
  data?: T;
  err?: AxiosError;
  status?: number;
  body?: any[];
}

interface Reducer<T> {
  (result: FetchProps<T>, action: FetchProps<T>): FetchProps<T>;
}
export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export function reducer<T>(
  result: FetchProps<T>,
  action: FetchProps<T>,
): FetchProps<T> {
  const { type, body } = action;

  switch (type) {
    case REQUEST:
      return { type, body };
    case SUCCESS:
      return { type, data: action.data, status: action.status };
    case FAILURE:
      return { type, err: action.err, status: action.status };
    default:
      return { type };
  }
}

export async function fetchData<T>(
  apiRequest: (...args: any[]) => Promise<AxiosResponse<T>>,
  dispatch: React.Dispatch<FetchProps<T>>,
  body?: any[],
) {
  try {
    const { status, data } = body
      ? await apiRequest(...body)
      : await apiRequest();
    if (status < 300) {
      dispatch({ type: SUCCESS, data, status });
    }
  } catch (err) {
    return dispatch({ type: FAILURE, err });
  }
}

export default function useApiRequest<T>(
  apiRequest: (...args: any[]) => Promise<AxiosResponse<T>>,
): [FetchProps<T>, React.Dispatch<FetchProps<T>>] {
  const initialState: FetchProps<T> = {
    type: '',
  };
  const [result, dispatch] = useReducer<Reducer<T>>(reducer, initialState);
  useEffect(() => {
    if (result.type === REQUEST) {
      fetchData<T>(apiRequest, dispatch, result.body);
    }
  }, [result, apiRequest]);

  return [result, dispatch];
}
