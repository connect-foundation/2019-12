import {
  Table,
  Model,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  Column,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './User';
import { Event } from './Event';

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
}
