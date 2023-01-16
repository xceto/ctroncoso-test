import { BaseRoutes } from '../../../routes/baseRoutes';

import { validateToken } from '../controllers/index';

class JWTRoutes extends BaseRoutes {
  public constructor() {
    super({ mergeParams: true });
    this.routes();
  }

  public routes(): void {
    this.router.post('/validate', [], validateToken);
  }
}

export { JWTRoutes };
