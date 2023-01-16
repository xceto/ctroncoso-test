import { Request, Response, NextFunction } from 'express';
import Validator from 'fastest-validator';

const v = new Validator();

const schema = {
  name: { type: 'string', null: false, optional: true },
  approved: { type: 'boolean', null: false, optional: true },
  min_dose: { type: 'number', null: false, positive: true, optional: true },
  max_dose: { type: 'number', null: false, positive: true, optional: true },
  available_at: { type: 'date', null: false, convert: true, optional: true },
  $$strict: true,
};

export const putSchemaValidator = (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { available_at } = req.body;

  const body = {
    ...req.body,
    available_at: available_at ? new Date(req.body.available_at) : null,
  };

  const validateData = v.validate(body, schema);

  if (validateData !== true) {
    res.status(400).json({ status: 400, errors: validateData });
    return;
  }

  next();
};
