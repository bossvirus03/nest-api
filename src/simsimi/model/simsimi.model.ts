import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Simsimi extends Model<Simsimi> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  CauHoi?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  TraLoi?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  TheLoai?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  ThoiGian?: string;
}
