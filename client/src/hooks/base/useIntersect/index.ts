import { useState, useEffect, useCallback } from 'react';

interface OptionProps {
  root?: HTMLElement | null;
  threshold?: number;
  rootMargin?: string;
}

const baseOption: OptionProps = {
  root: null,
  threshold: 0.5,
  rootMargin: '0px',
};

export const useIntersect = (
  onIntersect: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver,
  ) => {},
  option: OptionProps,
): [
  HTMLElement | null,
  React.Dispatch<React.SetStateAction<HTMLElement | null>>,
] => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const checkIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entry.isIntersecting) {
        onIntersect(entry, observer);
      }
    },
    [onIntersect],
  );
  useEffect(() => {
    let observer: IntersectionObserver;
    if (ref) {
      observer = new IntersectionObserver(checkIntersect, {
        ...baseOption,
        ...option,
      });
      observer.observe(ref);
    }
    return (): void => observer && observer.disconnect();
  }, [
    ref,
    option.root,
    option.threshold,
    option.rootMargin,
    checkIntersect,
    option,
  ]);
  return [ref, setRef];
};
