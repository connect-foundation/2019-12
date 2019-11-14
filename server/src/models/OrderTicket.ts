import {
  Table,
  Model,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  Column,
  BelongsTo,
} from 'sequelize-typescript';
import { TicketType } from './TicketType';
import { Order } from './Order';

@Table
export class OrderTicket extends Model<OrderTicket> {
  @PrimaryKey
  @Column
  public id!: number;

  @BelongsTo(() => TicketType, 'ticket_type_id')
  public ticketType!: TicketType;

  @BelongsTo(() => Order, 'order_id')
  public order!: Order;

  @Column
  public isAttendance!: boolean;

  @CreatedAt
  public creratedAt!: Date;

  @UpdatedAt
  public updatedAt!: Date;
}
