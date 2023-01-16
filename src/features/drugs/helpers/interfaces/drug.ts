export interface DrugModelAttributes {
  id?: number;
  name: string;
  approved: Boolean;
  min_dose: number;
  max_dose: number;
  available_at: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
