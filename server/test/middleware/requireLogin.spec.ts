import '../../src/env';
import requireLogin from '../../src/routes/middlewares/requireLogin';
import { generateJWT } from '../../src/utils/jwt';
import { createRequest, createResponse } from 'node-mocks-http';
import { UNAUTHORIZED } from 'http-status';

describe('LoginCheck Middleware', () => {
  it('로그인이 되어있을 경우', async () => {
    const token = await generateJWT(true, 1, 1, 'jdd04026@gmail.com');
    const request = createRequest({
      cookies: { UID: token.toString() },
    });
    const response = createResponse();
    const nextFunc = jest.fn();

    await requireLogin(request, response, nextFunc);
    expect(nextFunc).toHaveBeenCalled();
  });
  it('회원 정보는 있지만 회원가입이 안되어있을 경우', async () => {
    const token = await generateJWT(false, 1, 1, 'jdd04026@gmail.com');
    const request = createRequest({
      cookies: { UID: token.toString() },
    });
    const response = createResponse();
    const nextFunc = jest.fn();

    await requireLogin(request, response, nextFunc);
    expect(response.statusCode).toBe(UNAUTHORIZED);
  });
  it('로그인이 안되어있을 경우', async () => {
    const request = createRequest();
    const response = createResponse();
    const nextFunc = jest.fn();

    await requireLogin(request, response, nextFunc);
    expect(response.statusCode).toBe(UNAUTHORIZED);
  });
});
