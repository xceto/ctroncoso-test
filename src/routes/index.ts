import 'reflect-metadata';
require('dotenv').config();

import { Router } from 'express';
import { AuthRoutes, JWTRoutes } from '../features/auth/routes';
import { DrugsRoutes } from '../features/drugs/routes';
import { validateJWT } from '../middlewares/validateJWT';
import { VaccinationRoutes } from '../features/vaccination/routes';

const routes = Router();
const BASE = '/api/v1';

// login routes
routes.use(`${BASE}/user`, new AuthRoutes().getRouter());
routes.use(`${BASE}/jwt`, new JWTRoutes().getRouter());

// drugs routes
routes.use(`${BASE}/`, [validateJWT], new DrugsRoutes().getRouter());

// vaccination routes
routes.use(`${BASE}/`, [validateJWT], new VaccinationRoutes().getRouter());

export { routes };
