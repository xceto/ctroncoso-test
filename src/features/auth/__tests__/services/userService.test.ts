import { faker } from '@faker-js/faker';
import { sequelize } from '../../../../lib/db';
import { createUserFixture } from '../../fixtures/createUser';
import { UserService } from '../../services/userService';

afterAll(async () => {
  await sequelize.close();
});

describe('validate UserService', (): void => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  it('UserService.create', async (): Promise<void> => {
    const userService = new UserService();

    const data = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.firstName(),
    };

    const response = await userService.create({ ...data });

    expect(response).toMatchObject({
      id: expect.any(Number),
      email: data.email,
      password: expect.any(String),
      name: data.name,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('UserService.getUserFromEmail', async (): Promise<void> => {
    const expectedUser = await createUserFixture({});
    delete expectedUser.passwordNotEncrypted;

    const userService = new UserService();
    const response = await userService.getUserFromEmail(expectedUser.email);

    expect(response).toMatchObject({
      ...expectedUser,
    });
  });
});
