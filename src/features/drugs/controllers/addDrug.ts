import { Request, Response } from 'express';
import { DrugsServices } from '../services/drugs';

export const addDrug = async (req: Request, res: Response): Promise<void> => {
  const { name, approved, min_dose, max_dose, available_at } = req.body;

  const drugService = new DrugsServices();
  const addDrug = await drugService.saveDrug({ name, approved, min_dose, max_dose, available_at });

  res.status(201).json(addDrug);
};
