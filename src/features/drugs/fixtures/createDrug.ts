import { faker } from '@faker-js/faker';
import { DrugModelAttributes } from '../../drugs/helpers/interfaces/drug';
import Drug from '../../../entities/drug';

export const createDrugFixture = async ({
  name,
  approved,
  min_dose,
  max_dose,
  available_at,
}: {
  name?: string;
  approved?: boolean;
  min_dose?: number;
  max_dose?: number;
  available_at?: Date;
}): Promise<DrugModelAttributes> => {
  const data = {};
  data['name'] = name ? name : faker.commerce.product();
  data['approved'] = approved ? approved : faker.datatype.boolean();
  data['min_dose'] = min_dose ? min_dose : faker.datatype.number();
  data['max_dose'] = max_dose ? max_dose : faker.datatype.number();
  data['available_at'] = available_at ? new Date(available_at) : faker.date.future();

  return (await Drug.create(data)).get({ plain: true });
};
