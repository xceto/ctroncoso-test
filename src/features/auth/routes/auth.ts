import { BaseRoutes } from '../../../routes/baseRoutes';

import { signUp, login } from '../controllers/index';
import { loginValidator } from './middleware/loginSchemaValidator';
import { signupValidator } from './middleware/signupSchemaValidator';

class AuthRoutes extends BaseRoutes {
  public constructor() {
    super({ mergeParams: true });
    this.routes();
  }

  public routes(): void {
    this.router.post('/signup', [signupValidator], signUp);
    this.router.post('/login', [loginValidator], login);
  }
}

export { AuthRoutes };
