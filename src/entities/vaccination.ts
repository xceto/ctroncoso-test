import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table
export default class Vaccination extends Model<Vaccination> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column
  drug_id: number;

  @Column
  dose: number;

  @Column
  date: Date;
}
