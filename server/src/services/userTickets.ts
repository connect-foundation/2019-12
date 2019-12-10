import { UserTicket, Event, TicketType } from 'models';
import { WhereOptions, FindAttributeOptions, Includeable } from 'sequelize';

export async function getUserTicketsByUserId(
  userId: number,
): Promise<UserTicket[]> {
  const attributes: FindAttributeOptions = {
    exclude: ['isPublic', 'updatedAt'],
  };
  const where: WhereOptions = { userId };
  const include: Includeable[] = [
    {
      model: TicketType,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: [
        {
          model: Event,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
    },
  ];
  return await UserTicket.findAll({ include, attributes, where });
}
