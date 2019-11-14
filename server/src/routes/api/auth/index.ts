import * as express from 'express';
import * as passport from 'passport';

import { CLIENT_URL } from '../../../config/server_url';

const router = express.Router();

router.get(
  '/callback',
  passport.authenticate('google'),
  (req: express.Request, res: express.Response) => {
    // 이곳에서 어디로 갈지 분기를 해줘야함. 아래의 것은 성공시 리다이렉트 코드
    // 서버용 토큰을 발급해주어야 함.
    res.status(200).redirect(CLIENT_URL);
    // 실패, 회원가입 요구시 어떤식으로 할지 생각해야함.
  },
);

router.get('/', passport.authenticate('google', { scope: ['profile'] }));

export default router;
