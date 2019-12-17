export function validatePhoneNumber(number: string, type = false): boolean {
  if (number.length === 0) return !type;
  return /^010[\d]{8}$/.test(number);
}
export function validateName(name: string, type = false): boolean {
  if (name.length === 0) return !type;
  return /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{0,5}$/.test(name);
}
export function validateEmptyAndExceedMaximumLength(title: string): boolean {
  return /^.{1,30}$/.test(title);
}
export function validateIsSameOrLower(a: number, b: number): boolean {
  return a <= b;
}
export function validateIsNotEmptyString(value: string): boolean {
  return value.length !== 0;
}
