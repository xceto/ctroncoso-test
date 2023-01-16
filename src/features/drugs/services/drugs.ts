import Drug from '../../../entities/drug';

export class DrugsServices {
  public async saveDrug({
    name,
    approved,
    min_dose,
    max_dose,
    available_at,
  }: {
    name: string;
    approved: boolean;
    min_dose: number;
    max_dose: number;
    available_at: Date;
  }): Promise<any> {
    return (
      await Drug.create({
        name,
        approved,
        min_dose,
        max_dose,
        available_at,
      })
    ).get({ plain: true });
  }

  public async updateDrug({
    id,
    name,
    approved,
    min_dose,
    max_dose,
    available_at,
  }: {
    id: number;
    name?: string;
    approved?: boolean;
    min_dose?: number;
    max_dose?: number;
    available_at?: Date;
  }): Promise<any> {
    return Drug.update({ name, approved, min_dose, max_dose, available_at }, { where: { id } });
  }

  public async getDrugs({
    limit = 10,
    offset = 0,
  }: {
    limit?: number;
    offset?: number;
  }): Promise<any> {
    return Drug.findAndCountAll({ limit, offset });
  }

  public async deleteDrug(id: number): Promise<any> {
    return Drug.destroy({ where: { id } });
  }
}
