import {
  validatePhoneNumber,
  validateName,
} from '../../src/utils/validateSignUpForms';

describe('휴대폰 번호 validator', () => {
  it('휴대폰 번호가 숫자가 아닐경우', () => {
    const data = 'aoeif-*j';

    expect(validatePhoneNumber(data)).toBe(false);
  });
  it('휴대폰 번호 중간에 특수문자가 있을 경우', () => {
    const data = '0109180-123';

    expect(validatePhoneNumber(data)).toBe(false);
  });
  it('휴대폰 번호가 010으로 시작하지 않을 경우', () => {
    const data = '01112345678';

    expect(validatePhoneNumber(data)).toBe(false);
  });
  it('휴대폰 번호가 10자리 미만일경우', () => {
    const data = '0101234567';

    expect(validatePhoneNumber(data)).toBe(false);
  });
  it('휴대폰 번호가 11자리 초과일 경우', () => {
    const data = '010123456789';

    expect(validatePhoneNumber(data)).toBe(false);
  });
  it('Type이 기본값일 경우, 휴대폰 번호가 입력이 안되어있을 때', () => {
    const data = '';

    expect(validatePhoneNumber(data)).toBe(true);
  });
  it('Type이 true일 경우, 휴대폰 번호가 입력이 안되어있을 때', () => {
    const data = '';

    expect(validatePhoneNumber(data, true)).toBe(false);
  });
  it('휴대폰 번호가 맞을 때', () => {
    const data = '01012345678';

    expect(validatePhoneNumber(data)).toBe(true);
  });
});

describe('이름 validator', () => {
  it('이름이 한글이 아닐경우', () => {
    const data = 'aoei';

    expect(validateName(data)).toBe(false);
  });
  it('이름이 다섯글자가 넘어갈 경우', () => {
    const data = '안녕하세욤ㅇ';

    expect(validateName(data)).toBe(false);
  });
  it('Type이 기본값일 때, 이름이 입력되지 않을 경우', () => {
    const data = '';

    expect(validateName(data)).toBe(true);
  });
  it('Type이 True일 때, 이름이 입력되지 않을 경우', () => {
    const data = '';

    expect(validateName(data, true)).toBe(false);
  });
  it('이름이 맞을 때', () => {
    const data = '안녕하';

    expect(validateName(data)).toBe(true);
  });
});
