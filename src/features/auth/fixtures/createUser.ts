import User from '../../../entities/user';
import { BcryptService } from '../../../helpers/bcrypt';
import { AuthModelAttributes } from '../helpers/interfaces/auth';
import { faker } from '@faker-js/faker';

export const createUserFixture = async ({
  name,
  email,
  password,
}: {
  name?: string;
  email?: string;
  password?: string;
}): Promise<AuthModelAttributes & { passwordNotEncrypted: string }> => {
  const paramsToCreateUser = {};
  paramsToCreateUser['name'] = name ? name : faker.name.firstName();
  paramsToCreateUser['email'] = email ? email : faker.internet.email();
  const passwordNotEncrypted = password ? password : faker.internet.password();

  const bcrypService = new BcryptService();
  const passwordEncript = await bcrypService.encriptPassword(passwordNotEncrypted);

  paramsToCreateUser['password'] = passwordEncript;

  const userCreated = await (await User.create(paramsToCreateUser)).get({ plain: true });

  return { ...userCreated, passwordNotEncrypted };
};
