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
    this.router.post('/vaccinations', [addVaccinationValidation], addVaccination);
    this.router.get('/vaccinations', [], getVaccination);
    this.router.put('/vaccinations/:id', [updateVaccinationSchemaValidation], updateVaccination);
    this.router.delete('/vaccinations/:id', [], deleteVaccination);
  }
}

export { VaccinationRoutes };
