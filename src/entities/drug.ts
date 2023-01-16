import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table
export default class Drug extends Model<Drug> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column
  approved: Boolean;

  @Column
  min_dose: number;

  @Column
  max_dose: number;

  @Column
  available_at: Date;
}
