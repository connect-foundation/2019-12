import {
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './User';
import { TicketType } from './TicketType';

@Table
export class TicketSubscription extends Model<TicketSubscription> {
  @BelongsTo(() => User, 'user_id')
  public user!: User;

  @BelongsTo(() => TicketType, 'ticket_type_id')
  public ticketType!: TicketType;

  @CreatedAt
  public readonly createdAt!: Date;

  @UpdatedAt
  public readonly updatedAt!: Date;
}
