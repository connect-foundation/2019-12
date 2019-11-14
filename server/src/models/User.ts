import {
  Table,
  Model,
  PrimaryKey,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
} from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @Column
  public id!: number;

  @Column(DataType.STRING)
  public first_name!: string;

  @Column(DataType.STRING)
  public last_name!: string;

  @Column(DataType.STRING)
  public phone_number!: string;

  @Column(DataType.STRING)
  public email!: string;

  @Column(DataType.STRING)
  public google_oauth_token!: string;

  @Column(DataType.STRING)
  public device_token!: string;

  @CreatedAt
  public readonly created_at!: Date;

  @UpdatedAt
  public readonly updated_at!: Date;
}
