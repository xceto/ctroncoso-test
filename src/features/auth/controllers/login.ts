import { Request, Response } from 'express';
import { JWTService } from '../services/jwt';
import { BcryptService } from '../../../helpers/bcrypt';
import { UserService } from '../services/userService';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const bcryptService = new BcryptService();
  const userService = new UserService();
  const user = await userService.getUserFromEmail(email);

  if (!user) {
    res.status(401).json({ errors: [{ message: 'password or user incorrect' }] });
    return;
  }

  const comparedPassword = await bcryptService.comparePassword({
    password,
    passwordEncrypt: user.password,
  });

  if (!comparedPassword) {
    res.status(401).json({ errors: [{ message: 'password or user incorrect' }] });
    return;
  }

  const jwtService = new JWTService();
  const createdJWT = await jwtService.create(email);

  res.json({ token: createdJWT });
};
