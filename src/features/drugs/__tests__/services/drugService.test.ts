import request from 'supertest';

import { faker } from '@faker-js/faker';
import { app } from '../../../../../server';
import { sequelize } from '../../../../lib/db';
import { DrugsServices } from '../../services/drugs';
import { createDrugFixture } from '../../fixtures/createDrug';

const api = request(app);

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('validate DrugService', (): void => {
  const drugsServices = new DrugsServices();

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  it('saveDrug correctly', async (): Promise<void> => {
    const drugData = {
      name: faker.commerce.product(),
      approved: faker.datatype.boolean(),
      min_dose: faker.datatype.number(),
      max_dose: faker.datatype.number(),
      available_at: faker.date.future(),
    };

    const savedDrug = await drugsServices.saveDrug(drugData);

    expect(savedDrug).toMatchObject({
      ...drugData,
      id: expect.any(Number),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      available_at: expect.any(Date),
    });
  });

  it('updateDrug correctly', async (): Promise<void> => {
    const { id } = await createDrugFixture({});
    const name = faker.commerce.productName();

    const [savedDrug] = await drugsServices.updateDrug({ id, name });

    expect(savedDrug).toBe(1);
  });

  it('getDrugs correctly', async (): Promise<void> => {
    const expectedDrug = await createDrugFixture({});
    const getDrugs = await drugsServices.getDrugs({});

    expect(getDrugs).toMatchObject({
      count: 1,
      rows: expect.arrayContaining([
        expect.objectContaining({
          ...expectedDrug,
          id: expect.any(Number),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          available_at: expect.any(Date),
        }),
      ]),
    });
  });

  it('delete correctly', async (): Promise<void> => {
    const { id } = await createDrugFixture({});
    const deleteDrug = await drugsServices.deleteDrug(id);

    expect(deleteDrug).toBe(1);
  });
});
