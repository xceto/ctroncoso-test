import request from 'supertest';

import { faker } from '@faker-js/faker';
import { app } from '../../../../../server';
import { sequelize } from '../../../../lib/db';
import { createJWT } from '../../fixtures/createJWT';

const api = request(app);

afterAll(async () => {
  await sequelize.close();
});

describe('validate validateToken methods', (): void => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  it('validate correct token', async (): Promise<void> => {
    const jwt = await createJWT({});

    const response = await api
      .post('/api/v1/jwt/validate')
      .set({ Authorization: jwt })
      .type('json');

    expect(response.status).toBe(200);
  });

  it('validate expired token', async (): Promise<void> => {
    const jwt = await createJWT({ expired: '0' });

    const response = await api
      .post('/api/v1/jwt/validate')
      .set({ Authorization: jwt })
      .type('json');

    expect(response.status).toBe(400);
    expect(response.body).toMatch('jwt expired');
  });

  it('validate incorrect token', async (): Promise<void> => {
    const jwt = await createJWT({ secret: faker.random.alphaNumeric() });

    const response = await api
      .post('/api/v1/jwt/validate')
      .set({ Authorization: jwt })
      .type('json');

    expect(response.status).toBe(400);
    expect(response.body).toMatch('invalid signature');
  });

  it('validate incorrect token', async (): Promise<void> => {
    const jwt = await createJWT({ secret: faker.random.alphaNumeric() });

    const response = await api
      .post('/api/v1/jwt/validate')
      .set({ Authorization: null })
      .type('json');

    expect(response.status).toBe(400);
    expect(response.body).toMatch('jwt malformed');
  });

  it('validate not send token', async (): Promise<void> => {
    const response = await api.post('/api/v1/jwt/validate').type('json');

    expect(response.status).toBe(400);
    expect(response.body).toMatch('jwt must be provided');
  });
});
