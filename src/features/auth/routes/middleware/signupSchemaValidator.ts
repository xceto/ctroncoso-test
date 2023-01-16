import { Request, Response, NextFunction } from 'express';
import Validator from 'fastest-validator';

const v = new Validator();

const schema = {
  name: { type: 'string', null: false },
  email: { type: 'email', null: false },
  password: { type: 'string', null: false },
  $$strict: true,
};

export const signupValidator = (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const body = req.body;
  const validateData = v.validate(body, schema);

  if (validateData !== true) {
    res.status(400).json({ status: 400, errors: validateData });
    return;
  }

  next();
};
