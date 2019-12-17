import numberDecorator from '.';

describe('numberDecorator', () => {
  // given
  const mount = 16000000;
  const currency = '₩';
  const separated = true;

  // when
  const result = numberDecorator({ mount, currency, separated });

  it('currency가 표시된다.', () => {
    const currencyIndex = result.indexOf('₩');

    // then
    expect(currencyIndex).toBe(0);
  });

  it('separated에 따라 분리하거나 분리하지 않는다.', () => {
    // when (separated)
    const commas = result.split(',');
    const firstCommaIndex = result.indexOf(',');
    const lastCommaIndex = result.indexOf(',', firstCommaIndex + 1);

    // then
    expect(commas).toHaveLength(3);
    expect(firstCommaIndex).toBe(4);
    expect(lastCommaIndex).toBe(8);
  });

  it('separted에 따라 분리하지 않는다', () => {
    // given
    const nonSeparated = numberDecorator({ mount, currency, separated: false });

    // when (non-separated)
    const commas = nonSeparated.split(',');

    // then
    expect(commas).toHaveLength(1);
  });

  it('currency와 separated 된 값이 반환된다.', () => {
    // then
    expect(result).toBe('₩ 16,000,000');
  });
});
