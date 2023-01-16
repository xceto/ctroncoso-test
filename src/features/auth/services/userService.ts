import Auth from '../../../entities/user';
import { BcryptService } from '../../../helpers/bcrypt';
import { AuthModelAttributes } from '../helpers/interfaces/auth';

export class UserService {
  public async create({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }): Promise<AuthModelAttributes> {
    const bcryptService = new BcryptService();
    const passwordEncrypt = await bcryptService.encriptPassword(password);

    try {
      return (await Auth.create({ email, password: passwordEncrypt, name })).get({ plain: true });
    } catch (e) {
      return e;
    }
  }

  public async getUserFromEmail(email: string): Promise<AuthModelAttributes> {
    try {
      return (await Auth.findOne({ where: { email } }))?.get({ plain: true });
    } catch (e) {
      throw new Error(e);
    }
  }
}
