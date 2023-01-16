import { faker } from '@faker-js/faker';
import * as jwt from 'jsonwebtoken';

const { JWT_SECRET, JWT_EXPIRED } = process.env;

export const createJWT = async ({
  email,
  secret = JWT_SECRET,
  expired = JWT_EXPIRED,
}: {
  email?: string;
  secret?: string;
  expired?: string;
}): Promise<string> => {
  const emailToJWT = email ? email : faker.internet.email();
  return jwt.sign({ emailToJWT }, secret, { expiresIn: expired });
};
