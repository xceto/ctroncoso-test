import Vaccination from '../../../entities/vaccination';
import { VaccinationModelAttributes } from '../helpers/interfaces/addVaccinationSchema';

export class VaccinationService {
  public async saveVaccination({
    name,
    drug_id,
    dose,
    date,
  }: {
    id?: number;
    name: string;
    drug_id: number;
    dose: number;
    date: Date;
  }): Promise<VaccinationModelAttributes | { error: string }> {
    return (
      await Vaccination.create({
        name,
        drug_id,
        dose,
        date,
      })
    ).get({ plain: true });
  }

  public async getVaccinations({
    limit = 10,
    offset = 0,
  }: {
    limit: number;
    offset: number;
  }): Promise<{ count: number; rows: VaccinationModelAttributes[] }> {
    return Vaccination.findAndCountAll({ limit, offset });
  }

  public async getVaccination(id: number): Promise<VaccinationModelAttributes> {
    return (await Vaccination.findOne({ where: { id } })).get({ plain: true });
  }

  public async updateVaccination({
    id,
    name,
    drug_id,
    dose,
    date,
  }: {
    id: number;
    name?: string;
    drug_id?: number;
    dose?: number;
    date?: Date;
  }): Promise<any> {
    return Vaccination.update(
      {
        name,
        drug_id,
        dose,
        date,
      },
      { where: { id } }
    );
  }

  public async deleteVaccination(id: number): Promise<any> {
    return Vaccination.destroy({ where: { id } });
  }
}
