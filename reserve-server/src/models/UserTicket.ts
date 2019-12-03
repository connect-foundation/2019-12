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
  AutoIncrement,
} from 'sequelize-typescript';
import { TicketType } from './TicketType';
import { User } from './User';

@Table({
  underscored: true,
})
export class UserTicket extends Model<UserTicket> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public id!: number;

  @ForeignKey(() => TicketType)
  @Column(DataType.INTEGER)
  public ticketTypeId!: number;

  @BelongsTo(() => TicketType, 'ticketTypeId')
  public ticketType!: TicketType;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  public userId!: number;

  @BelongsTo(() => User, 'userId')
  public user!: User;

  @Column(DataType.BOOLEAN)
  public isAttendance!: boolean;

  @CreatedAt
  public createdAt!: Date;

  @UpdatedAt
  public updatedAt!: Date;
}
