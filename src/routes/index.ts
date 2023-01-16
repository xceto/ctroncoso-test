import 'reflect-metadata';
require('dotenv').config();

import { Router } from 'express';
import { AuthRoutes, JWTRoutes } from '../features/auth/routes';
import { DrugsRoutes } from '../features/drugs/routes';
import { validateJWT } from '../middlewares/validateJWT';

const routes = Router();
const BASE = '/api/v1';

// login routes
routes.use(`${BASE}/user`, new AuthRoutes().getRouter());
routes.use(`${BASE}/jwt`, new JWTRoutes().getRouter());

// drugs routes
routes.use(`${BASE}/`, [validateJWT], new DrugsRoutes().getRouter());

export { routes };
