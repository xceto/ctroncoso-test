import { BaseRoutes } from '../../../routes/baseRoutes';

import {
  updateVaccination,
  deleteVaccination,
  addVaccination,
  getVaccination,
} from '../controllers/index';

import { addVaccinationValidation } from './middlewares/addVaccinationSchemaValidator';
import { updateVaccinationSchemaValidation } from './middlewares/updateVaccinationSchemaValidator';

class VaccinationRoutes extends BaseRoutes {
  public constructor() {
    super({ mergeParams: true });
    this.routes();
  }

  public routes(): void {
    this.router.post('/vaccination', [addVaccinationValidation], addVaccination);
    this.router.get('/vaccination', [], getVaccination);
    this.router.put('/vaccination/:id', [updateVaccinationSchemaValidation], updateVaccination);
    this.router.delete('/vaccination/:id', [], deleteVaccination);
  }
}

export { VaccinationRoutes };
