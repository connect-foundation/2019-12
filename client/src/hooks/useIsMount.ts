import { useRef, useEffect } from 'react';

export default function(fn: Function, input: any) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) fn();
    else didMountRef.current = true;
  }, [fn, input]);
}
