import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import Drug from './drug';

@Table
export default class Vaccination extends Model<Vaccination> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @ForeignKey(() => Drug)
  @Column
  drug_id: number;

  @Column
  dose: number;

  @Column
  date: Date;
}
