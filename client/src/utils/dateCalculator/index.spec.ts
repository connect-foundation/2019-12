import {
  convertDate,
  getMorningAndAfternoonString,
  fillZero,
  calculateStringOfDateRange,
} from '.';

describe('datecalculateulator', () => {
  // given
  const startAt = '2019-12-21T03:00:00Z';
  const endAt = '2019-12-22T09:00:00Z';

  it('convertDate 날짜 객체가 반환된다.', () => {
    // when
    const startAtDate = convertDate(startAt);
    const endAtDate = convertDate(endAt);

    // then
    expect(startAtDate.getHours()).toBe(12);
    expect(endAtDate.getHours()).toBe(18);
  });

  it('시간을 오전/오후에 맞춰 출력한다', () => {
    const morning = getMorningAndAfternoonString(3);
    const afternoon = getMorningAndAfternoonString(12);

    expect(morning).toBe('오전 03');
    expect(afternoon).toBe('오후 12');
  });

  it("시간(월,일,시,분)에 '0' prefix를 넣는다.", () => {
    const lessThanTen = fillZero(3);
    const greaterThanTen = fillZero(11);

    expect(lessThanTen).toBe('03');
    expect(greaterThanTen).toBe('11');
  });

  it('당일 일정일 경우 날짜 형식이 올바르게 표시된다.', () => {
    // given
    const startAtOneDay = '2018-04-22T00:00:00Z';
    const endAtOneDay = '2018-04-22T09:00:00Z';

    // when
    const resultString = calculateStringOfDateRange(startAtOneDay, endAtOneDay);

    // then
    expect(resultString).toBe('2018년 04월 22일 (일)\n오전 09:00 - 오후 06:00');
  });

  it('여러 날에 걸친 일정일 경우 형식이 올바르게 표시된다.', () => {
    // when
    const resultString = calculateStringOfDateRange(startAt, endAt);

    // then
    expect(resultString).toBe(
      '2019년 12월 21일 (토) 오후 12:00\n- 12월 22일 (일) 오후 06:00',
    );
  });
});
