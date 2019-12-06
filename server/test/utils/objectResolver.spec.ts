import { resolveObject as resolve } from '../../src/utils/objectResolver';

describe('utils - resolveObject()', () => {
  it('1 뎁스 키의 값을 반환한다', () => {
    const object = { a: 'b' };
    expect(resolve(object, 'a')).toBe(object.a);
  });

  it('2 뎁스 키의 값을 반환한다', () => {
    const object = { a: { b: 'c' } };
    expect(resolve(object, 'a.b')).toBe(object.a.b);
  });

  it('키로 값을 찾을 수 없을 때는 null 을 반환한다', () => {
    const object = { a: { b: 'c' } };
    expect(resolve(object, 'c.d.f')).toBeNull();
  });
});
