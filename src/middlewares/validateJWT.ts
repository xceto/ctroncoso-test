import { NextFunction, Request, Response } from 'express';
import { JWTService } from '../features/auth/services/jwt';

export const validateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({});
    return;
  }

  const jwtService = new JWTService();
  const { error, message } = await jwtService.verify(String(authorization));

  if (error) {
    res.status(401).json({ message });
    return;
  }

  next();
};
