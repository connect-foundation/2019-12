const days = ['일', '월', '화', '수', '목', '금', '토'];

export function convertDate(targetDate: string): Date {
  const koreaTime = new Date(targetDate).toLocaleString('en-US', {
    timeZone: 'Asia/Tokyo',
  });

  return new Date(koreaTime);
}

export function getMorningAndAfternoonString(hour: number): string {
  const morningStr = '오전';
  const afternoonStr = '오후';

  if (hour < 12) {
    return `${morningStr} ${fillZero(hour)}`;
  }
  if (hour === 12) {
    hour += 12;
  }
  return `${afternoonStr} ${fillZero(hour - 12)}`;
}

export function fillZero(targetNumber: number): string {
  if (targetNumber < 10) {
    return `0${targetNumber}`;
  }
  return `${targetNumber}`;
}

export function getKoreanDateString(at: string) {
  const atDate = convertDate(at);

  const atDateStr = `${fillZero(atDate.getFullYear())}년 ${fillZero(
    atDate.getMonth() + 1,
  )}월 ${fillZero(atDate.getDate())}일 (${days[atDate.getDay()]})`;

  const noon = getMorningAndAfternoonString(atDate.getHours());
  const time = `${noon}:${fillZero(atDate.getMinutes())}`;

  return `${atDateStr} ${time}`;
}

export function calculateStringOfDateRange(
  startAt: string,
  endAt: string,
): string {
  const startAtDate = convertDate(startAt);
  const endAtDate = convertDate(endAt);

  const startDateStr = `${fillZero(startAtDate.getFullYear())}년 ${fillZero(
    startAtDate.getMonth() + 1,
  )}월 ${fillZero(startAtDate.getDate())}일 (${days[startAtDate.getDay()]})`;
  const startHour = getMorningAndAfternoonString(startAtDate.getHours());
  const endHour = getMorningAndAfternoonString(endAtDate.getHours());

  const startTimeStr = `${startHour}:${fillZero(startAtDate.getMinutes())}`;
  const endTimeStr = `${endHour}:${fillZero(endAtDate.getMinutes())}`;
  const isSameDate =
    startAtDate.getFullYear() === endAtDate.getFullYear() &&
    startAtDate.getMonth() === endAtDate.getMonth() &&
    startAtDate.getDate() === endAtDate.getDate();

  if (isSameDate) {
    return `${startDateStr}\n${startTimeStr} - ${endTimeStr}`;
  }

  const endDateStr = `${fillZero(endAtDate.getMonth() + 1)}월 ${fillZero(
    endAtDate.getDate(),
  )}일 (${days[endAtDate.getDay()]})`;

  return `${startDateStr} ${startTimeStr}\n- ${endDateStr} ${endTimeStr}`;
}
