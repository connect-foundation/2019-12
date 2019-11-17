import {
  Table,
  Model,
  PrimaryKey,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './User';

@Table
export class Event extends Model<Event> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  public id!: number;

  @BelongsTo(() => User, 'user_id')
  public user!: User;

  @Column(DataType.BOOLEAN)
  public isPublic!: boolean;

  @Column(DataType.STRING)
  public title!: string;

  @Column(DataType.DATE)
  public startAt!: Date;

  @Column(DataType.DATE)
  public endAt!: Date;

  @Column(DataType.STRING)
  public place!: string;

  @Column(DataType.STRING)
  public address!: string;

  @Column(DataType.STRING)
  public placeDesc!: string;

  @Column(DataType.STRING)
  public mainImg!: string;

  @Column(DataType.TEXT)
  public desc!: string;

  @CreatedAt
  public readonly createdAt!: Date;

  @UpdatedAt
  public readonly updatedAt!: Date;
}
