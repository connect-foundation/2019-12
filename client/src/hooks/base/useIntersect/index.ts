import { useState, useEffect, useCallback } from 'react';

interface OptionProps {
  root?: null;
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
  // intersecting이 있을 때 target 엔트리와 observer를 넘겨주자.
  const checkIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entry.isIntersecting) {
        onIntersect(entry, observer);
      }
    },
    [onIntersect],
  );
  // ref나 option이 바뀔 경우 observer를 새로 등록한다.
  useEffect(() => {
    let observer: IntersectionObserver;
    if (ref) {
      observer = new IntersectionObserver(checkIntersect, {
        ...baseOption,
        ...option,
      });
      // start to observe ref
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
  // setRef를 넘겨주어서 ref를 변경시킬 수 있도록 한다.
  return [ref, setRef];
};
