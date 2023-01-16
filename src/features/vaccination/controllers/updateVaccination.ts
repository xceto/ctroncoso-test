import { Request, Response } from 'express';
import { VaccinationService } from '../services/vaccination';

export const updateVaccination = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, drug_id, dose, date } = req.body;

  const vaccinationService = new VaccinationService();
  const updatedVaccination = await vaccinationService.updateVaccination({
    id: +id,
    name,
    drug_id,
    dose,
    date,
  });

  if (updatedVaccination === 1) {
    res.status(200).json({ message: 'updated' });
    return;
  }

  res.status(204).json({ message: 'cannot update' });
};
