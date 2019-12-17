import React, { useRef, useEffect } from 'react';

export default function(fn: Function, input: React.ComponentState) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) fn();
    else didMountRef.current = true;
  }, [fn, input]);
}
