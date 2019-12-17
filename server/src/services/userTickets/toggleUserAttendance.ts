import { UserTicket } from 'models';
import { WhereOptions } from 'sequelize';

export default async (
  id: number,
  ticketTypeId: number,
  attendance: boolean,
): Promise<[number, UserTicket[]]> => {
  const where: WhereOptions = { id, ticketTypeId };
  return await UserTicket.update({ isAttendance: attendance }, { where });
};
