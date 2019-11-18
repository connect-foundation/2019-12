import {
  Table,
  Model,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  Column,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { TicketType } from './TicketType';
import { Order } from './Order';

@Table({
  underscored: true,
})
export class OrderTicket extends Model<OrderTicket> {
  @PrimaryKey
  @Column
  public id!: number;

  @BelongsTo(() => TicketType, 'ticket_type_id')
  public ticketType!: TicketType;

  @BelongsTo(() => Order, 'order_id')
  public order!: Order;

  @Column(DataType.BOOLEAN)
  public isAttendance!: boolean;

  @CreatedAt
  public creratedAt!: Date;

  @UpdatedAt
  public updatedAt!: Date;
}
