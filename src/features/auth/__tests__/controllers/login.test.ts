import request from 'supertest';
import each from 'jest-each';

import { faker } from '@faker-js/faker';
import { app } from '../../../../../server';
import { sequelize } from '../../../../lib/db';

import { createUserFixture } from '../../fixtures/createUser';

const api = request(app);

afterAll(async () => {
  await sequelize.close();
});

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('validate login methods', (): void => {
  it('login 200', async (): Promise<void> => {
    const { email, passwordNotEncrypted } = await createUserFixture({});

    const response = await api.post('/api/v1/user/login').type('json').send({
      email,
      password: passwordNotEncrypted,
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      token: expect.any(String),
    });
  });

  it('login incorrect password', async (): Promise<void> => {
    const { email } = await createUserFixture({});

    const body = {
      email,
      password: faker.internet.password(),
    };

    const response = await api.post('/api/v1/user/login').type('json').send(body);
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      errors: expect.arrayContaining([
        expect.objectContaining({
          message: `password or user incorrect`,
        }),
      ]),
    });
  });

  it('login incorrect email', async (): Promise<void> => {
    const { passwordNotEncrypted } = await createUserFixture({});
    const body = {
      email: faker.internet.email(),
      password: passwordNotEncrypted,
    };

    console.log('ENTRA AL BODY', body);

    const response = await api.post('/api/v1/user/login').type('json').send(body);
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      errors: expect.arrayContaining([
        expect.objectContaining({
          message: `password or user incorrect`,
        }),
      ]),
    });
  });
});

each(['email', 'password']).describe('validate login methods %s', (param): void => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  const paramsUsed = {
    email: {
      email: faker.datatype.number(),
      password: faker.internet.password(),
    },
    password: {
      email: faker.internet.email(),
      password: faker.datatype.number(),
    },
  };

  it(`signUp bad format ${param}`, async (): Promise<void> => {
    const body = paramsUsed[param];

    const response = await api.post('/api/v1/user/login').type('json').send(body);
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      status: 400,
      errors: expect.arrayContaining([
        expect.objectContaining({
          type: expect.any(String),
          message: `The '${param}' field must be a string.`,
          field: `${param}`,
          actual: body[param],
        }),
      ]),
    });
  });
});
