import { faker } from '@faker-js/faker';
import { sequelize } from '../../../../lib/db';
import { createUserFixture } from '../../fixtures/createUser';
import { JWTService } from '../../services/jwt';
import { createJWT } from '../../fixtures/createJWT';

afterAll(async () => {
  await sequelize.close();
});

describe('validate jwt service', (): void => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  it('create method', async (): Promise<void> => {
    const email = faker.internet.email();
    const jwtService = new JWTService();

    const response = await jwtService.create(email);
    expect(response).toEqual(expect.any(String));
  });

  it('verify method', async (): Promise<void> => {
    const { email } = await createUserFixture({});
    const createdJWT = await createJWT({ email });

    const jwtService = new JWTService();
    const response = await jwtService.verify(String(createdJWT));

    expect(response).toMatchObject({
      error: false,
      message: expect.objectContaining({
        emailToJWT: expect.any(String),
        iat: expect.any(Number),
        exp: expect.any(Number),
      }),
    });
  });
});
