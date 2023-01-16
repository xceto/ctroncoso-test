import { Request, Response } from 'express';
import { JWTService } from '../services/jwt';

export const validateToken = async (req: Request, res: Response): Promise<void> => {
  const { authorization } = req.headers;

  const jwtService = new JWTService();
  const { error, message } = await jwtService.verify(authorization);

  error ? res.status(400).json(message) : res.status(200).json('valid jwt');
};
