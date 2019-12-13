import { singleFileLimitImageType } from '../../src/routes/middlewares';
import { createRequest, createResponse } from 'node-mocks-http';
import { BAD_REQUEST } from 'http-status';

describe('middleware - singleFileLimitImageType', () => {
  it('이미지 파일이면 next 함수 호출', () => {
    const req = createRequest({ fileType: { mime: 'image/jpeg' } });
    const res = createResponse();
    const next = jest.fn();

    singleFileLimitImageType(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });

  it('이미지 파일이 아니면 400 응답', () => {
    const req = createRequest({ fileType: { mime: 'application/pdf' } });
    const res = createResponse();
    const next = jest.fn();

    singleFileLimitImageType(req, res, next);
    expect(res.statusCode).toBe(BAD_REQUEST);
    expect(next).not.toHaveBeenCalled();
  });

  it('파일이 없으면 400 응답', () => {
    const req = createRequest();
    const res = createResponse();
    const next = jest.fn();

    singleFileLimitImageType(req, res, next);
    expect(res.statusCode).toBe(BAD_REQUEST);
    expect(next).not.toHaveBeenCalled();
  });
});
