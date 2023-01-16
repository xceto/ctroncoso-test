import { Request, Response } from 'express';
import { DrugsServices } from '../services/drugs';

export const updateDrug = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, approved, min_dose, max_dose, available_at } = req.body;

  const drugService = new DrugsServices();
  const [updateDrug] = await drugService.updateDrug({
    id: +id,
    name,
    approved,
    min_dose,
    max_dose,
    available_at,
  });

  if (updateDrug === 1) {
    res.status(200).json({ message: 'updated' });
    return;
  }

  res.status(204).json({ message: 'cannot update' });
};
