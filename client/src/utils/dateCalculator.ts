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

export function calculateStringOfDateRange(
  startAt: string,
  endAt: string,
): string {
  const startAtDate = convertDate(startAt);
  const endAtDate = convertDate(endAt);
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const startDateStr = `${fillZero(startAtDate.getFullYear())}년 ${fillZero(
    startAtDate.getMonth() + 1,
  )}월 ${fillZero(startAtDate.getDate())}일 (${days[startAtDate.getDay()]})`;
  const startHour = getMorningAndAfternoonString(startAtDate.getHours());
  const endHour = getMorningAndAfternoonString(endAtDate.getHours());

  const startTimeStr = `${startHour}:${fillZero(startAtDate.getMinutes())}`;
  const endTimeStr = `${endHour}:${fillZero(endAtDate.getMinutes())}`;

  if (
    startAtDate.getFullYear() === endAtDate.getFullYear() &&
    startAtDate.getMonth() === endAtDate.getMonth() &&
    startAtDate.getDate() === endAtDate.getDate()
  ) {
    return `${startDateStr}\n${startTimeStr} - ${endTimeStr}`;
  }

  const endDateStr = `${fillZero(endAtDate.getMonth() + 1)}월 ${fillZero(
    endAtDate.getDate(),
  )}일 (${days[endAtDate.getDay()]})`;

  return `${startDateStr} ${startTimeStr}\n- ${endDateStr} ${endTimeStr}`;
}

export function calculateDiffDaysOfDateRange(
  startAt: string,
  endAt: string,
): number {
  const startAtDate = convertDate(startAt);
  const endAtDate = convertDate(endAt);

  const diffInTime = endAtDate.getTime() - startAtDate.getTime();
  const diffDays = diffInTime / (1000 * 3600 * 24);

  return Math.floor(diffDays);
}
