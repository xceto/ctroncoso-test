'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.JWTRoutes = void 0;
const baseRoutes_1 = require('../../../routes/baseRoutes');
const index_1 = require('../controllers/index');
class JWTRoutes extends baseRoutes_1.BaseRoutes {
  constructor() {
    super({ mergeParams: true });
    this.routes();
  }
  routes() {
    this.router.post('/validate', [], index_1.validateToken);
  }
}
exports.JWTRoutes = JWTRoutes;
//# sourceMappingURL=jwt.js.map
