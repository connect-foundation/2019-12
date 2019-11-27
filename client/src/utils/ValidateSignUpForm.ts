export function validatePhoneNumber(
  number: string,
  type = false,
): boolean {
  const phonereg = /010[\d]{7,8}/;
  if (number.length === 0) return !type;
  if (number.length > 11) return false;
  if (!number.match(phonereg)) return false;
  return true;
}
export function validateName(name: string, type = false): boolean {
  const namereg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{0,5}/;
  if (name.length === 0) return !type;
  if (name.length > 5) return false;

  const regex = name.match(namereg);
  if (regex === null) return false;
  if (regex[0] !== regex.input) return false;
  return true;
}
