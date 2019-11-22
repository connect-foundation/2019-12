import {
  Table,
  Model,
  PrimaryKey,
  ForeignKey,
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

  @ForeignKey(() => TicketType)
  @Column(DataType.INTEGER)
  public ticketTypeId!: number;

  @BelongsTo(() => TicketType, 'ticketTypeId')
  public ticketType!: TicketType;

  @ForeignKey(() => Order)
  @Column(DataType.INTEGER)
  public orderId!: number;

  @BelongsTo(() => Order, 'orderId')
  public order!: Order;

  @Column(DataType.BOOLEAN)
  public isAttendance!: boolean;

  @CreatedAt
  public createdAt!: Date;

  @UpdatedAt
  public updatedAt!: Date;
}
