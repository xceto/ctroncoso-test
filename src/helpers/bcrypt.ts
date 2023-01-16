import bcrypt from 'bcrypt';

const { BCRYPT_SALT_ROUNDS } = process.env;

export class BcryptService {
  public async encriptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, +BCRYPT_SALT_ROUNDS);
  }

  public async comparePassword({
    password,
    passwordEncrypt,
  }: {
    password: string;
    passwordEncrypt: string;
  }): Promise<boolean> {
    return bcrypt.compare(password, passwordEncrypt);
  }
}
