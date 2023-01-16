'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.routes = void 0;
require('reflect-metadata');
const express_1 = require('express');
require('dotenv').config();
const routes_1 = require('../features/auth/routes');
const routes_2 = require('../features/drugs/routes');
const routes = (0, express_1.Router)();
exports.routes = routes;
const BASE = '/api/v1';
// login routes
routes.use(`${BASE}/user`, new routes_1.AuthRoutes().getRouter());
routes.use(`${BASE}/jwt`, new routes_1.JWTRoutes().getRouter());
// drugs routes
routes.use(`${BASE}/`, new routes_2.DrugsRoutes().getRouter());
//# sourceMappingURL=index.js.map
