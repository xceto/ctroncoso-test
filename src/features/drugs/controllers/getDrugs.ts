import { Request, Response } from 'express';
import { DrugsServices } from '../services/drugs';

export const getDrugs = async (req: Request, res: Response): Promise<void> => {
  const { limit, offset } = req.query;

  const drugService = new DrugsServices();
  const addDrug = await drugService.getDrugs({
    limit: limit ? +limit : null,
    offset: offset ? +offset : null,
  });

  res.status(200).json(addDrug);
};
