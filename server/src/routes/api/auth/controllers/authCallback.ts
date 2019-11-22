import { Request, Response } from 'express';
import CLIENT_URL from '../index';

export const authCallback = (req: Request, res: Response) => {
  try {
    const { state } = req.query;
    const { returnTo } = JSON.parse(Buffer.from(state, 'base64').toString());
    if (typeof returnTo === 'string' && returnTo.startsWith('/')) {
      return res.redirect(CLIENT_URL + returnTo);
    } else {
      res.redirect(`${CLIENT_URL}/`);
    }
  } catch {
    res.redirect(`${CLIENT_URL}/`);
  }
};
