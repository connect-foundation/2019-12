import { paramsValidator } from '../../src/routes/middlewares';
import { BAD_REQUEST } from 'http-status';
import { createRequest, createResponse } from 'node-mocks-http';

describe('middleware - paramsValidator', () => {
  it('param 에 숫자가 들어오면 next 함수 호출', () => {
    const paramName = 'eventId';
    const param = '300';

    const req = createRequest({ params: { [paramName]: param } });
    const res = createResponse();
    const next = jest.fn();

    paramsValidator(paramName)(req, res, next);
    expect(next).toBeCalledWith();
  });

  it('param 에 문자가 들어오면 400 응답', () => {
    const paramName = 'eventId';
    const param = 'event';

    const req = createRequest({ params: { [paramName]: param } });
    const res = createResponse();
    const next = jest.fn();

    paramsValidator(paramName)(req, res, next);
    expect(res.statusCode).toBe(BAD_REQUEST);
  });

  it('param 에 문자와 숫자가 들어오면 400 응답', () => {
    const paramName = 'eventId';
    const param = '300event';

    const req = createRequest({ params: { [paramName]: param } });
    const res = createResponse();
    const next = jest.fn();

    paramsValidator(paramName)(req, res, next);
    expect(res.statusCode).toBe(BAD_REQUEST);
  });

  it('param 에 undefined 가 들어오면 400 응답', () => {
    const paramName = 'eventId';
    const param = undefined;

    const req = createRequest({ params: { [paramName]: param } });
    const res = createResponse();
    const next = jest.fn();

    paramsValidator(paramName)(req, res, next);
    expect(res.statusCode).toBe(BAD_REQUEST);
  });
});
