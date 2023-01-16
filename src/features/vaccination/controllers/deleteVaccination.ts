import { Request, Response } from 'express';
import { VaccinationService } from '../services/vaccination';

export const deleteVaccination = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const vaccinationService = new VaccinationService();
  const deletedVaccination = await vaccinationService.deleteVaccination(+id);

  const responseData = {
    0: {
      status: 400,
      message: 'not deleted',
    },

    1: {
      status: 202,
      message: 'deleted',
    },
  };

  res
    .status(responseData[deletedVaccination].status)
    .json({ message: responseData[deletedVaccination].message });
};
