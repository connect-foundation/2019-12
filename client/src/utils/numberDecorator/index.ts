interface Props {
  mount: number;
  currency?: '₩' | '$';
  separated: boolean;
}
export default ({ mount, currency, separated }: Props) => {
  const seperator = (targetStr: string) => {
    return targetStr
      .split('')
      .reverse()
      .reduce<string[]>((acc, cur, i, arr) => {
        if ((i + 1) % 3 === 0 && i !== arr.length - 1) {
          acc = [...acc, cur, ','];
          return acc;
        }
        acc.push(cur);
        return acc;
      }, [])
      .reverse()
      .join('');
  };

  let mountStr = `${mount}`;
  if (separated) mountStr = seperator(mountStr);

  if (currency) return `${currency} ${mountStr}`;
  return mountStr;
};
