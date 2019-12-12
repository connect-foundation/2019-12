import { limitSizeSingleFile } from '../../src/routes/middlewares';
import { createRequest, createResponse } from 'node-mocks-http';
import { BAD_REQUEST } from 'http-status';

describe('middleware - limitSizeSingleFile', () => {
  it('업로드 하는 파일이 없으면 next 함수 호출', () => {
    const req = createRequest();
    const res = createResponse();
    const next = jest.fn();

    limitSizeSingleFile(3000)(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });

  it('업로드 하는 파일의 용량이 제한보다 작으면 next 함수 호출', () => {
    const maxSize = 3000;
    const size = 2000;

    const req = createRequest({ file: { size } });
    const res = createResponse();
    const next = jest.fn();

    limitSizeSingleFile(maxSize)(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });

  it('업로드 하는 파일의 용량이 제한보다 크면 400 응답', () => {
    const maxSize = 3000;
    const size = 5000;

    const req = createRequest({ file: { size } });
    const res = createResponse();
    const next = jest.fn();

    limitSizeSingleFile(maxSize)(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(BAD_REQUEST);
  });
});
