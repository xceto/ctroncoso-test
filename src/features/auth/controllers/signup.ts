import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name } = req.body;

  const userService = new UserService();

  try {
    const createdUser = await userService.create({
      email,
      password,
      name,
    });

    res.status(201).json(createdUser);
    return;
  } catch (error) {
    res.status(400).json(error);
  }
};
