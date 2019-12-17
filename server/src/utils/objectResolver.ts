export function resolveObject<T>(obj: T, key: string): T[keyof T] | null {
  return key
    .split('.')
    .reduce((prev: any, k: string) => (prev && prev[k] ? prev[k] : null), obj);
}
