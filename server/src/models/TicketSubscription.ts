import {
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  ForeignKey,
  Column,
  DataType,
} from 'sequelize-typescript';
import { User } from './User';
import { TicketType } from './TicketType';

@Table({
  underscored: true,
})
export class TicketSubscription extends Model<TicketSubscription> {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  public userId!: number;

  @BelongsTo(() => User, 'userId')
  public user!: User;

  @ForeignKey(() => TicketType)
  @Column(DataType.INTEGER)
  public ticketTypeId!: number;

  @BelongsTo(() => TicketType, 'ticketTypeId')
  public ticketType!: TicketType;

  @CreatedAt
  public readonly createdAt!: Date;

  @UpdatedAt
  public readonly updatedAt!: Date;
}
