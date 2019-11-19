import {
  Table,
  Model,
  PrimaryKey,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { Order } from './Order';
import { Event } from './Event';

@Table({
  underscored: true,
})
export class User extends Model<User> {
  @PrimaryKey
  @Column
  public id!: number;

  @Column(DataType.STRING)
  public firstName!: string;

  @Column(DataType.STRING)
  public lastName!: string;

  @Column(DataType.STRING)
  public phoneNumber!: string;

  @Column(DataType.STRING)
  public email!: string;

  @Column(DataType.STRING)
  public googleOAuthToken!: string;

  @Column(DataType.STRING)
  public deviceToken!: string;

  @CreatedAt
  public readonly createdAt!: Date;

  @UpdatedAt
  public readonly updatedAt!: Date;

  @HasMany(() => Order, 'user_id')
  public orders!: Order[];

  @HasMany(() => Event, 'user_id')
  public events!: Event[];
}
