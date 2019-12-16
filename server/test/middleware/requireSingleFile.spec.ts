import { requireSingleFile } from '../../src/routes/middlewares';
import { createRequest, createResponse } from 'node-mocks-http';
import { BAD_REQUEST } from 'http-status';

describe('middleware - requireSingleFile', () => {
  it('해당 필드의 이름을 가진 파일이 있으면 next 호출', () => {
    const fieldname = 'single';
    const req = createRequest({ file: { fieldname } });
    const res = createResponse();
    const next = jest.fn();

    requireSingleFile(fieldname)(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });

  it('파일이 없으면 400 응답', () => {
    const fieldname = 'single';
    const req = createRequest();
    const res = createResponse();
    const next = jest.fn();

    requireSingleFile(fieldname)(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(BAD_REQUEST);
  });

  it('해당 필드의 이름이 아닌 다른 이름으로 파일이 있으면 400 응답', () => {
    const fieldname = 'single';
    const req = createRequest({ file: { fieldname: 'othername' } });
    const res = createResponse();
    const next = jest.fn();

    requireSingleFile(fieldname)(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(BAD_REQUEST);
  });
});
