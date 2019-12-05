import { shortenTitle } from '.';
import { EVENT_NAME_MAX_LENGTH } from 'commons/constants/number';

describe('Moleculs / Card', () => {
  // given
  const shortString = 'Jenkins Korea Meetup #1';
  const longString =
    '리눅스 커널 v5.3 분석: 파일시스템 & 블록 I/O 주말특강(12월) 무료';

  it('카드 제목이 정상적으로 단축된다.', () => {
    // when
    const convertedShortString = shortenTitle(shortString);
    const convertedLongString = shortenTitle(longString);

    // then
    expect(convertedShortString).toHaveLength(convertedShortString.length);
    expect(convertedLongString).toHaveLength(EVENT_NAME_MAX_LENGTH + 3);
  });
});
