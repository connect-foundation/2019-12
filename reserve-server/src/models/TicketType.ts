import {
  Table,
  Model,
  PrimaryKey,
  ForeignKey,
  Column,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  DataType,
  AutoIncrement,
} from 'sequelize-typescript';
import { Event } from './Event';

@Table({
  underscored: true,
})
export class TicketType extends Model<TicketType> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public id!: number;

  @ForeignKey(() => Event)
  @Column(DataType.INTEGER)
  public eventId!: number;

  @BelongsTo(() => Event, 'eventId')
  public event!: Event;

  @Column(DataType.STRING)
  public name!: string;

  @Column(DataType.STRING)
  public desc!: string;

  @Column(DataType.INTEGER.UNSIGNED)
  public price!: number;

  @Column(DataType.INTEGER.UNSIGNED)
  public quantity!: number;

  @Column(DataType.INTEGER.UNSIGNED)
  public leftCnt!: number;

  @Column(DataType.BOOLEAN)
  public isPublicLeftCnt!: boolean;

  @Column(DataType.INTEGER.UNSIGNED)
  public maxCntPerPerson!: number;

  @Column(DataType.DATE)
  public salesStartAt!: Date;

  @Column(DataType.DATE)
  public salesEndAt!: Date;

  @Column(DataType.DATE)
  public refundEndAt!: Date;

  @CreatedAt
  public readonly createdAt!: Date;

  @UpdatedAt
  public readonly updatedAt!: Date;
}
