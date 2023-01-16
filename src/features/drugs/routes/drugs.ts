import { BaseRoutes } from '../../../routes/baseRoutes';

import { addDrug, updateDrug, getDrugs, deleteDrug } from '../controllers';
import { postSchemaValidator } from './middleware/postSchemaValidator';
import { putSchemaValidator } from './middleware/putSchemaValidator';

class DrugsRoutes extends BaseRoutes {
  public constructor() {
    super({ mergeParams: true });
    this.routes();
  }

  public routes(): void {
    this.router.post('/drugs', [postSchemaValidator], addDrug);
    this.router.put('/drugs/:id', [putSchemaValidator], updateDrug);
    this.router.get('/drugs', [], getDrugs);
    this.router.delete('/drugs/:id', [], deleteDrug);
  }
}

export { DrugsRoutes };
