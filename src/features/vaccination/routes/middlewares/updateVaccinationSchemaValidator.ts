import { Request, Response, NextFunction } from 'express';
import Validator from 'fastest-validator';

const v = new Validator();

const schema = {
  name: { type: 'string', null: false, optional: true },
  drug_id: { type: 'number', null: false, positive: true, optional: true },
  dose: { type: 'number', null: false, positive: true, optional: true },
  date: { type: 'date', null: false, convert: true, optional: true },
  $$strict: true,
};

export const updateVaccinationSchemaValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { date } = req.body;

  const body = {
    ...req.body,
    date: date ? new Date(req.body.date) : null,
  };

  const validateData = v.validate(body, schema);

  if (validateData !== true) {
    res.status(400).json({ status: 400, errors: validateData });
    return;
  }

  next();
};
