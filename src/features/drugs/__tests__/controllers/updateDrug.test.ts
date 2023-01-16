import request from 'supertest';

import { app } from '../../../../../server';
import { sequelize } from '../../../../lib/db';
import { createJWT } from '../../../auth/fixtures/createJWT';
import { createDrugFixture } from '../../fixtures/createDrug';
import { faker } from '@faker-js/faker';

const api = request(app);

afterAll(async () => {
  await sequelize.close();
});

describe('validate updateDrug', (): void => {
  it('updateDrug', async (): Promise<void> => {
    const jwt = await createJWT({});
    const { id } = await createDrugFixture({});

    const dataUpdate = {
      name: faker.commerce.productName(),
    };

    const response = await api
      .put(`/api/v1/drugs/${id}`)
      .type('json')
      .send(dataUpdate)
      .set({ Authorization: jwt });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      message: 'updated',
    });
  });

  it('updateDrug invalid id', async (): Promise<void> => {
    const jwt = await createJWT({});
    const { id } = await createDrugFixture({});

    const dataUpdate = {
      name: faker.commerce.productName(),
    };

    const response = await api
      .put(`/api/v1/drugs/${faker.datatype.number()}`)
      .type('json')
      .send(dataUpdate)
      .set({ Authorization: jwt });

    expect(response.status).toBe(204);
  });

  it('updateDrug worng format name', async (): Promise<void> => {
    const jwt = await createJWT({});
    const { id } = await createDrugFixture({});

    const dataUpdate = {
      name: faker.datatype.number(),
    };

    const response = await api
      .put(`/api/v1/drugs/${id}`)
      .type('json')
      .send(dataUpdate)
      .set({ Authorization: jwt });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      status: 400,
      errors: expect.arrayContaining([
        expect.objectContaining({
          type: expect.any(String),
          message: `The 'name' field must be a string.`,
          field: expect.any(String),
          actual: dataUpdate.name,
        }),
      ]),
    });
  });
});
