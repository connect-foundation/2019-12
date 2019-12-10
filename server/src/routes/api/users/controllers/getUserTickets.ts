import { Request, Response } from 'express';
import { getUserTicketsByUserId } from 'services';

export async function getUserTicket(req: Request, res: Response) {
  try {
    const result = await getUserTicketsByUserId(+req.query.id);
    if (!result) return res.status(400).send({ message: 'Cannot get data' });

    const data1 = result.reduce<Array<any>>((acc, cur) => {
      const current: any = cur.get({ plain: true });
      const { ticketType, ...userTickets } = current;
      const { event, ...ticketTypes } = ticketType;
      const { desc, latitude, longitude, isPublic, ...events } = event;
      const obj = {
        ...events,
        ticket: ticketTypes,
        userTickets: [],
      };
      if (!acc.includes(obj)) acc.push(obj);
      acc.find(cur => cur.id === obj.id).userTickets.push(userTickets);
      return acc;
    }, []);
    res.send(data1);
  } catch (err) {
    res.sendStatus(400);
  }
}
