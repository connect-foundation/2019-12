import {
  Table,
  Model,
  PrimaryKey,
  Column,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { Event } from './Event';

@Table
export class TicketType extends Model<TicketType> {
  @PrimaryKey
  @Column
  public id!: number;

  @BelongsTo(() => Event, 'event_id')
  public event!: Event;

  @Column(DataType.STRING)
  public name!: string;

  @Column(DataType.STRING)
  public desc!: string;

  @Column(DataType.INTEGER.UNSIGNED)
  public quantity!: number;

  @Column(DataType.INTEGER.UNSIGNED)
  public left_cnt!: number;

  @Column(DataType.BOOLEAN)
  public is_public_left_cnt!: boolean;

  @Column(DataType.INTEGER.UNSIGNED)
  public max_cnt_per_person!: number;

  @Column(DataType.DATE)
  public sales_start_date!: Date;

  @Column(DataType.DATE)
  public sales_end_date!: Date;

  @Column(DataType.DATE)
  public refund_end_date!: Date;

  @CreatedAt
  public readonly created_at!: Date;

  @UpdatedAt
  public readonly updated_at!: Date;
}
