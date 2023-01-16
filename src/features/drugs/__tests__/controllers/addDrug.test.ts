import request from 'supertest';

import { faker } from '@faker-js/faker';
import { app } from '../../../../../server';
import { sequelize } from '../../../../lib/db';
import { createJWT } from '../../../auth/fixtures/createJWT';

const api = request(app);

afterAll(async () => {
  await sequelize.close();
});

describe('test addDrug', (): void => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  it('validate correctly insert', async (): Promise<void> => {
    const expectedDrug = {
      name: faker.commerce.product(),
      approved: faker.datatype.boolean(),
      min_dose: faker.datatype.number(),
      max_dose: faker.datatype.number(),
      available_at: faker.date.future(),
    };

    const jwt = await createJWT({});

    const response = await api
      .post('/api/v1/drugs')
      .type('json')
      .set({ Authorization: jwt })
      .send(expectedDrug);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      ...expectedDrug,
      available_at: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it('validate bad name', async (): Promise<void> => {
    const expectedDrug = {
      name: faker.datatype.number(),
      approved: faker.datatype.boolean(),
      min_dose: faker.datatype.number(),
      max_dose: faker.datatype.number(),
      available_at: faker.date.future(),
    };

    const jwt = await createJWT({});

    const response = await api
      .post('/api/v1/drugs')
      .type('json')
      .set({ Authorization: jwt })
      .send(expectedDrug);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      status: 400,
      errors: expect.arrayContaining([
        expect.objectContaining({
          type: expect.any(String),
          message: `The 'name' field must be a string.`,
          field: 'name',
          actual: expectedDrug.name,
        }),
      ]),
    });
  });

  it('validate negative min_dose', async (): Promise<void> => {
    const expectedDrug = {
      name: faker.commerce.product(),
      approved: faker.datatype.boolean(),
      min_dose: -faker.datatype.number(),
      max_dose: faker.datatype.number(),
      available_at: faker.date.future(),
    };

    const jwt = await createJWT({});

    const response = await api
      .post('/api/v1/drugs')
      .type('json')
      .set({ Authorization: jwt })
      .send(expectedDrug);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      status: 400,
      errors: expect.arrayContaining([
        expect.objectContaining({
          type: expect.any(String),
          message: `The 'min_dose' field must be a positive number.`,
          field: 'min_dose',
          actual: expectedDrug.min_dose,
        }),
      ]),
    });
  });

  it('validate negative max_dose', async (): Promise<void> => {
    const expectedDrug = {
      name: faker.commerce.product(),
      approved: faker.datatype.boolean(),
      min_dose: faker.datatype.number(),
      max_dose: -faker.datatype.number(),
      available_at: faker.date.future(),
    };

    const jwt = await createJWT({});

    const response = await api
      .post('/api/v1/drugs')
      .type('json')
      .set({ Authorization: jwt })
      .send(expectedDrug);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      status: 400,
      errors: expect.arrayContaining([
        expect.objectContaining({
          type: expect.any(String),
          message: `The 'max_dose' field must be a positive number.`,
          field: expect.any(String),
          actual: expectedDrug.max_dose,
        }),
      ]),
    });
  });

  it('validate bad date', async (): Promise<void> => {
    const expectedDrug = {
      name: faker.commerce.product(),
      approved: faker.datatype.boolean(),
      min_dose: faker.datatype.number(),
      max_dose: faker.datatype.number(),
      available_at: faker.internet.userName(),
    };

    const jwt = await createJWT({});

    const response = await api
      .post('/api/v1/drugs')
      .type('json')
      .set({ Authorization: jwt })
      .send(expectedDrug);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      status: 400,
      errors: expect.arrayContaining([
        expect.objectContaining({
          type: expect.any(String),
          message: `The 'available_at' field must be a Date.`,
          field: expect.any(String),
          actual: null,
        }),
      ]),
    });
  });

  it('validate no jwt', async (): Promise<void> => {
    const response = await api.post('/api/v1/drugs').type('json');
    expect(response.status).toBe(401);
  });
});
