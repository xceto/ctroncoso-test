import { faker } from '@faker-js/faker';
import Vaccination from '../../../entities/vaccination';
import { VaccinationModelAttributes } from '../helpers/interfaces/addVaccinationSchema';

export const createVaccinationFixture = async ({
  name,
  drug_id,
  dose,
  date,
}: {
  name?: string;
  drug_id?: number;
  dose?: number;
  date?: Date;
}): Promise<VaccinationModelAttributes> => {
  const data = {};
  data['name'] = name ? name : faker.commerce.product();
  data['drug_id'] = drug_id ? drug_id : faker.datatype.number();
  data['dose'] = dose ? dose : faker.datatype.number();
  data['date'] = date ? date : faker.datatype.number();

  return (await Vaccination.create(data)).get({ plain: true });
};
