import { Request, Response } from 'express';
import { VaccinationService } from '../services/vaccination';

export const getVaccination = async (req: Request, res: Response): Promise<void> => {
  const { limit, offset } = req.query;

  const vaccinationService = new VaccinationService();
  const getVaccinations = await vaccinationService.getVaccinations({
    limit: limit ? +limit : null,
    offset: offset ? +offset : null,
  });

  res.status(200).json(getVaccinations);
};
