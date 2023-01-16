import { Request, Response } from 'express';
import { DrugsServices } from '../services/drugs';

export const deleteDrug = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const drugService = new DrugsServices();
  const deleteDrug = await drugService.deleteDrug(+id);

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

  res.status(responseData[deleteDrug].status).json({ message: responseData[deleteDrug].message });
};
