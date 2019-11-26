import {
  Table,
  Model,
  PrimaryKey,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  Column,
  BelongsTo,
  HasMany,
  DataType,
} from 'sequelize-typescript';
import { User } from './User';
import { Event } from './Event';
import { OrderTicket } from './OrderTicket';

@Table({
  underscored: true,
})
export class Order extends Model<Order> {
  @PrimaryKey
  @Column
  public id!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  public userId!: number;

  @BelongsTo(() => User, 'userId')
  public user!: User;

  @ForeignKey(() => Event)
  @Column(DataType.INTEGER)
  public eventId!: number;

  @BelongsTo(() => Event, 'eventId')
  public event!: number;

  @CreatedAt
  public readonly createdAt!: Date;

  @UpdatedAt
  public readonly updatedAt!: Date;

  @HasMany(() => OrderTicket, 'orderId')
  public orderTickets!: OrderTicket[];
}
