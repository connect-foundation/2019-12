import { Request, Response, NextFunction } from 'express';
import { createEventAndTicket } from '../../../../services/events';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { ticket, ...event } = req.body;
  // TODO : 메인 이미지 업로드 처리

  try {
    // TODO : event 에 로그인한 사용자의 userId 추가해야함
    const result = await createEventAndTicket(event, ticket);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
