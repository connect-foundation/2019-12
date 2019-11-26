import {
  Table,
  Model,
  PrimaryKey,
  ForeignKey,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
  BelongsTo,
  HasMany,
  AutoIncrement,
} from 'sequelize-typescript';
import { User } from './User';
import { TicketType } from './TicketType';

@Table({
  underscored: true,
})
export class Event extends Model<Event> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  public id!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  public userId!: number;

  @BelongsTo(() => User, 'userId')
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

  @HasMany(() => TicketType, 'eventId')
  public ticketTypes!: TicketType[];
}
