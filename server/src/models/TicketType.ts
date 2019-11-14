import {
  Table,
  Model,
  PrimaryKey,
  Column,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
} from 'sequelize-typescript';
import { Event } from './Event';

@Table
export class TicketType extends Model<TicketType> {
  @PrimaryKey
  @Column
  public id!: number;

  @BelongsTo(() => Event, 'event_id')
  public event!: Event;

  @Column
  public name!: string;

  @Column
  public desc!: string;

  @Column
  public quantity!: number;

  @Column
  public left_cnt!: number;

  @Column
  public is_public_left_cnt!: boolean;

  @Column
  public max_cnt_per_person!: number;

  @Column
  public sales_start_date!: Date;

  @Column
  public sales_end_date!: Date;

  @Column
  public refund_end_date!: Date;

  @CreatedAt
  public readonly created_at!: Date;

  @UpdatedAt
  public readonly updated_at!: Date;
}
