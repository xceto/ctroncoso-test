import { injectable } from 'inversify';
import { Router, RouterOptions } from 'express';

@injectable()
export abstract class BaseRoutes {
  protected router: Router;

  constructor(options?: RouterOptions) {
    this.router = Router(options);
  }

  getRouter(): Router {
    return this.router;
  }

  abstract routes(): void;
}
