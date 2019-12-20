import { Request, Response, NextFunction } from 'express';
import { createEventAndTicket, getEventById } from 'services/events';
import { putObject } from 'utils/awsS3';
import { Event, TicketType } from 'models';
import { v1 as uuid } from 'uuid';
import { CREATED } from 'http-status';
interface Body extends Partial<Event> {
  ticket: Partial<TicketType>;
}

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const {
    isPublic,
    title,
    startAt,
    endAt,
    place,
    address,
    placeDesc,
    desc,
    latitude,
    longitude,
    ticket: {
      name,
      desc: ticketDesc,
      quantity,
      isPublicLeftCnt,
      maxCntPerPerson,
      price,
      salesStartAt,
      salesEndAt,
      refundEndAt,
    },
  } = req.body as Body;

  const event: Partial<Event> = {
    isPublic,
    title,
    startAt,
    endAt,
    place,
    address,
    placeDesc,
    desc,
    latitude,
    longitude,
  };

  const ticketType: Partial<TicketType> = {
    name,
    desc: ticketDesc,
    quantity,
    isPublicLeftCnt,
    maxCntPerPerson,
    price,
    salesStartAt,
    salesEndAt,
    refundEndAt,
  };
  const ext = req.fileType?.ext;
  const mainImageKey = ext ? `${uuid()}.${ext}` : uuid();

  try {
    await putObject(mainImageKey, req.file.buffer);
  } catch (error) {
    next(error);
  }

  try {
    event.userId = req.user?.id;
    event.mainImg = mainImageKey;
    const { eventId } = await createEventAndTicket(event, ticketType);
    const data = await getEventById(eventId);
    res.status(CREATED).json(data);
  } catch (error) {
    next(error);
  }
};
