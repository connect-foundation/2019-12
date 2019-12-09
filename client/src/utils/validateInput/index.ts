export function validatePhoneNumber(number: string, type = false): boolean {
  if (number.length === 0) return !type;
  return /^010[\d]{8}$/.test(number);
}
export function validateName(name: string, type = false): boolean {
  if (name.length === 0) return !type;
  return /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{0,5}$/.test(name);
}
