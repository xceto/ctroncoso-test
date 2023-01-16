import request from 'supertest';

import { app } from '../../../../../server';
import { sequelize } from '../../../../lib/db';
import { createJWT } from '../../../auth/fixtures/createJWT';
import { createDrugFixture } from '../../fixtures/createDrug';

const api = request(app);

afterAll(async () => {
  await sequelize.close();
});

describe('validate getDrugs method', (): void => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  it('validate correctly get', async (): Promise<void> => {
    const createdDrug = [];

    for (let i = 0; i < 2; i++) {
      createdDrug.push(await createDrugFixture({}));
    }

    const jwt = await createJWT({});
    const response = await api.get(`/api/v1/drugs`).type('json').set({ Authorization: jwt });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      count: expect.any(Number),
      rows: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          max_dose: expect.any(Number),
          min_dose: expect.any(Number),
          approved: expect.any(Boolean),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          available_at: expect.any(String),
        }),
      ]),
    });
  });

  it('validate correctly get with pagination', async (): Promise<void> => {
    const createdDrug = [];

    for (let i = 0; i < 2; i++) {
      createdDrug.push(await createDrugFixture({}));
    }

    const jwt = await createJWT({});
    const response = await api
      .get(`/api/v1/drugs?limit=1&offset=0`)
      .type('json')
      .set({ Authorization: jwt });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      count: 2,
      rows: expect.arrayContaining([
        expect.objectContaining({
          ...createdDrug[0],
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          available_at: expect.any(String),
        }),
      ]),
    });
  });

  it('validate correctly empty get', async (): Promise<void> => {
    const jwt = await createJWT({});
    const response = await api
      .get(`/api/v1/drugs?limit=1&offset=0`)
      .type('json')
      .set({ Authorization: jwt });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      count: 0,
      rows: expect.arrayContaining([]),
    });
  });

  it('validate get no jwt', async (): Promise<void> => {
    const response = await api.get(`/api/v1/drugs?limit=1&offset=0`).type('json');
    expect(response.status).toBe(401);
  });
});
