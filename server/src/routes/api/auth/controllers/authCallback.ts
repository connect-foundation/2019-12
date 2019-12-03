import { Response, NextFunction } from 'express';

const { CLIENT_URL } = process.env;

export const authCallback = (req: any, res: Response, next: NextFunction) => {
  try {
    const isUserExist: boolean = req.user ? req.user.exist : false;

    res.cookie('UID', req.user.token, {
      maxAge: 1000 * 60 * 60 * 60,
    });

    if (!isUserExist) return res.redirect(`${CLIENT_URL}/signup`);
    const { state } = req.query;
    const { returnTo } = JSON.parse(Buffer.from(state, 'base64').toString());

    if (!(typeof returnTo === 'string' && returnTo.startsWith('/')))
      return res.redirect(`${CLIENT_URL}/`);
    res.redirect(`${CLIENT_URL}${returnTo}`);
  } catch (err) {
    next(err);
  }
};
