import request from 'supertest';

import { faker } from '@faker-js/faker';
import { app } from '../../../../../server';
import { sequelize } from '../../../../lib/db';
import { createJWT } from '../../../auth/fixtures/createJWT';
import { createDrugFixture } from '../../../drugs/fixtures/createDrug';

const api = request(app);

afterAll(async () => {
  await sequelize.close();
});

describe('validate Add controller Vaccination', (): void => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  it('validate corretly save', async (): Promise<void> => {
    const { id: createDrugId } = await createDrugFixture({});
    const jwt = await createJWT({});

    const body = {
      name: faker.commerce.product(),
      drug_id: createDrugId,
      dose: faker.datatype.number(),
      date: faker.date.recent(),
    };

    const response = await api
      .post('/api/v1/vaccinations')
      .type('json')
      .set({ Authorization: jwt })
      .send(body);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      ...body,
      date: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it('validate expired drug', async (): Promise<void> => {
    const { id: createDrugId, available_at } = await createDrugFixture({});
    const jwt = await createJWT({});

    const expiredDate = new Date(available_at);
    expiredDate.setDate(available_at.getDate() + 1);

    const body = {
      name: faker.commerce.product(),
      drug_id: createDrugId,
      dose: faker.datatype.number(),
      date: expiredDate,
    };

    const response = await api
      .post('/api/v1/vaccinations')
      .type('json')
      .set({ Authorization: jwt })
      .send(body);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: 'drug expired',
    });
  });

  it('validate drug not found', async (): Promise<void> => {
    const jwt = await createJWT({});

    const body = {
      name: faker.commerce.product(),
      drug_id: faker.datatype.number(),
      dose: faker.datatype.number(),
      date: faker.date.recent(),
    };

    const response = await api
      .post('/api/v1/vaccinations')
      .type('json')
      .set({ Authorization: jwt })
      .send(body);

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      message: 'drug not found',
    });
  });
});
