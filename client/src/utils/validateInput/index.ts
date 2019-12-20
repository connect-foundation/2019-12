import moment from 'moment';
import { EventFormState, TicketFormState } from 'types/States';
import { FORM_NAME } from 'commons/constants/string';

export function validatePhoneNumber(number: string, type = false): boolean {
  if (number.length === 0) return !type;
  return /^010[\d]{8}$/.test(number);
}
export function validateName(name: string, type = false): boolean {
  if (name.length === 0) return !type;
  return /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{0,5}$/.test(name);
}
export function validateIsSameOrLower(a: number, b: number): boolean {
  return a <= b;
}
export function validateIsNotEmptyString(value: string): boolean {
  return value.length !== 0;
}
export function validateLength(value: string, length: number): boolean {
  return value.length !== 0 && value.length <= length;
}
const validateStateWithTraverse = (
  states: EventFormState | TicketFormState,
  formType: string,
): boolean =>
  Object.entries(states).every(([key, value]) => {
    if (value.valid) return true;
    alert(FORM_NAME[formType][key]);
    return false;
  });
const validateDates = (
  eventFormStates: EventFormState,
  ticketFormStates: TicketFormState,
): boolean => {
  const now = moment();
  const eventEndAt = moment(eventFormStates.date.value.endAt);
  const salesStartAt = moment(ticketFormStates.salesDate.value.salesStartAt);
  const salesEndAt = moment(ticketFormStates.salesDate.value.salesEndAt);
  const refundEndAt = moment(ticketFormStates.refundDate.value.refundEndAt);
  if (
    !salesStartAt.isBetween(now, eventEndAt, undefined, '[]') ||
    !salesEndAt.isBetween(salesStartAt, eventEndAt, undefined, '[]')
  ) {
    alert('티켓 판매는 [현재 시각 ~ 행사 종료] 내에만 가능합니다.');
    return false;
  }
  if (!refundEndAt.isBetween(salesStartAt, eventEndAt, undefined, '[]')) {
    alert('티켓 환불은 [티켓 판매 시작 ~ 행사 종료] 내에만 가능합니다.');
    return false;
  }
  return true;
};
const validateQuantityAndMaxCntPerPerson = (
  ticketFormStates: TicketFormState,
): boolean => {
  const quantity = ticketFormStates.quantity.value;
  const maxCntPerPerson = ticketFormStates.maxCntPerPerson.value;
  if (+quantity < +maxCntPerPerson) {
    alert('티켓 수량보다 1인당 구매 가능 개수이 많을 수 없습니다.');
    return false;
  }
  return true;
};
export const validateStates = (
  eventFormStates: EventFormState,
  ticketFormStates: TicketFormState,
): boolean =>
  validateStateWithTraverse(eventFormStates, 'event') &&
  validateStateWithTraverse(ticketFormStates, 'ticket') &&
  validateDates(eventFormStates, ticketFormStates) &&
  validateQuantityAndMaxCntPerPerson(ticketFormStates);
