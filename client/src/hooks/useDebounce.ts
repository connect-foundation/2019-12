import { useState, useEffect } from 'react';

export default function useDebounce<T = any>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handleTimeOut = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handleTimeOut);
    };
  }, [delay, value]);

  return debouncedValue;
}
