import { Request, Response } from 'express';
import { VaccinationService } from '../services/vaccination';
import { DrugsServices } from '../../drugs/services/drugs';

export const addVaccination = async (req: Request, res: Response): Promise<void> => {
  const { name, drug_id, dose, date } = req.body;

  const drugsServices = new DrugsServices();
  const vaccinationService = new VaccinationService();

  const findDrug = await drugsServices.getDrug(drug_id);

  if (!findDrug) {
    res.status(404).json({ message: 'drug not found ' });
    return;
  }

  const expiredDrug = new Date(date) > findDrug.available_at;

  if (expiredDrug) {
    res.status(400).json({ message: 'drug expired ' });
    return;
  }

  const addedVaccionation = await vaccinationService.saveVaccination({ name, drug_id, dose, date });

  res.status(201).json(addedVaccionation);
};
