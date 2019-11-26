import { Response } from 'express';

const { CLIENT_URL } = process.env;

export const authCallback = (req: any, res: Response) => {
  try {
    const isUserExist: boolean = req.user ? req.user.exist : false;
    if (isUserExist) {
      const { state } = req.query;
      const { returnTo } = JSON.parse(Buffer.from(state, 'base64').toString());
      res.setHeader(
        'Set-Cookie',
        `token=${req.user.token};Max-Age=21474836;Path=/;HttpOnly`,
      );
      if (typeof returnTo === 'string' && returnTo.startsWith('/')) {
        res.redirect(CLIENT_URL + returnTo);
      } else {
        res.redirect(`${CLIENT_URL}/`);
      }
    } else {
      res.setHeader(
        'Set-Cookie',
        `token=${req.user.token};Max-Age=21474836;Path=/;HttpOnly`,
      );
      res.redirect(`${CLIENT_URL}/signup`);
    }
  } catch {
    res.redirect(`${CLIENT_URL}/`);
  }
};
