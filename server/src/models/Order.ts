import {
  Table,
  Model,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  Column,
  BelongsTo,
  HasMany,
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

  @BelongsTo(() => User, 'user_id')
  public user!: User;

  @BelongsTo(() => Event, 'event_id')
  public event!: number;

  @CreatedAt
  public readonly createdAt!: Date;

  @UpdatedAt
  public readonly updatedAt!: Date;

  @HasMany(() => OrderTicket, 'order_id')
  public orderTickets!: OrderTicket[];
}
