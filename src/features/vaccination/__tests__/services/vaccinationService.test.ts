import request from 'supertest';

import { faker } from '@faker-js/faker';
import { app } from '../../../../../server';
import { sequelize } from '../../../../lib/db';
import { VaccinationService } from '../../services/vaccination';
import { createVaccinationFixture } from '../../fixtures/createVaccination';

const api = request(app);

afterAll(async () => {
  await sequelize.close();
});

describe('validate vaccinationService', (): void => {
  const vaccinationService = new VaccinationService();

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  it('validate saveVaccination', async (): Promise<void> => {
    const body = {
      name: faker.commerce.product(),
      drug_id: faker.datatype.number(),
      dose: faker.datatype.number(),
      date: faker.date.recent(),
    };

    const savedVacciation = await vaccinationService.saveVaccination(body);

    expect(savedVacciation).toMatchObject({
      id: expect.any(Number),
      ...body,
      updatedAt: expect.any(Date),
      createdAt: expect.any(Date),
    });
  });

  it('validate getVaccinations', async (): Promise<void> => {
    let responseCotain = [];

    for (let i = 0; i < 2; i++) {
      responseCotain.push(await createVaccinationFixture({}));
    }

    const responseExpected = responseCotain.map((data) => {
      return {
        ...data,
        date: expect.any(Date),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      };
    });

    const getVaccinations = await vaccinationService.getVaccinations({});
    expect(getVaccinations).toMatchObject({
      count: 2,
      rows: expect.arrayContaining(responseExpected),
    });
  });

  it('validate getVaccination', async (): Promise<void> => {
    const expectedVaccination = await createVaccinationFixture({});

    const getVaccination = await vaccinationService.getVaccination(expectedVaccination.id);
    expect(getVaccination).toMatchObject({
      ...expectedVaccination,
    });
  });

  it('validate updateVaccination', async (): Promise<void> => {
    const expectedVaccination = await createVaccinationFixture({});
    const expectedName = faker.commerce.productName();

    const [updatedVaccination] = await vaccinationService.updateVaccination({
      id: expectedVaccination.id,
      name: expectedName,
    });

    const getVaccination = await vaccinationService.getVaccination(expectedVaccination.id);

    expect(updatedVaccination).toBe(1);
    expect(getVaccination).toMatchObject({
      ...getVaccination,
      name: expectedName,
    });
  });

  it('validate deleteVaccination', async (): Promise<void> => {
    const expectedVaccination = await createVaccinationFixture({});
    const expectedName = faker.commerce.productName();

    const deletedVaccination = await vaccinationService.deleteVaccination(expectedVaccination.id);
    const getVaccination = await vaccinationService.getVaccination(expectedVaccination.id);

    expect(deletedVaccination).toBe(1);
    expect(getVaccination).toBe(null);
  });
});
