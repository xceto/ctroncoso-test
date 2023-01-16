import request from 'supertest';
import each from 'jest-each';

import { faker } from '@faker-js/faker';
import { app } from '../../../../../server';
import { sequelize } from '../../../../lib/db';
import { UserService } from '../../services/userService';

const api = request(app);

afterAll(async () => {
  await sequelize.close();
});

describe('validate signup methods', (): void => {
  const createUserMock = jest.spyOn(UserService.prototype, 'create');

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  it('signUp 201', async (): Promise<void> => {
    const body = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.firstName(),
    };

    createUserMock.mockResolvedValueOnce({
      id: 1,
      name: body.name,
      email: body.email,
      password: body.password,
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    });

    const response = await api.post('/api/v1/user/signup').type('json').send(body);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      ...body,
      id: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      password: expect.any(String),
    });
  });
});

each(['name', 'password', 'email']).describe('validate signup method no %s', (paramUse): void => {
  const body = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.name.firstName(),
  };

  it('400', async (): Promise<void> => {
    delete body[paramUse];
    const response = await api.post('/api/v1/user/signup').type('json').send(body);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      status: 400,
      errors: expect.arrayContaining([
        expect.objectContaining({
          type: expect.any(String),
          message: `The '${paramUse}' field is required.`,
          field: `${paramUse}`,
        }),
      ]),
    });
  });
});
