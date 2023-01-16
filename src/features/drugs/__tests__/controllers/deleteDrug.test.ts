import request from 'supertest';

import { app } from '../../../../../server';
import { sequelize } from '../../../../lib/db';
import { createJWT } from '../../../auth/fixtures/createJWT';
import { createDrugFixture } from '../../fixtures/createDrug';

const api = request(app);

afterAll(async () => {
  await sequelize.close();
});

describe('validate deleteDrug method', (): void => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  it('validate correctly deleted', async (): Promise<void> => {
    const { id } = await createDrugFixture({});

    const jwt = await createJWT({});

    const response = await api
      .delete(`/api/v1/drugs/${id}`)
      .type('json')
      .set({ Authorization: jwt });

    expect(response.status).toBe(202);
    expect(response.body).toMatchObject({
      message: 'deleted',
    });
  });

  it('validate not found id', async (): Promise<void> => {
    const { id } = await createDrugFixture({});
    const jwt = await createJWT({});

    const response = await api
      .delete(`/api/v1/drugs/${id}`)
      .type('json')
      .set({ Authorization: jwt });

    expect(response.status).toBe(202);
    expect(response.body).toMatchObject({});
  });
});
