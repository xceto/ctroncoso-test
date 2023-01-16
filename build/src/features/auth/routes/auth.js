'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthRoutes = void 0;
const baseRoutes_1 = require('../../../routes/baseRoutes');
const index_1 = require('../controllers/index');
class AuthRoutes extends baseRoutes_1.BaseRoutes {
  constructor() {
    super({ mergeParams: true });
    this.routes();
  }
  routes() {
    this.router.post('/signup', [], index_1.signUp);
    this.router.post('/login', [], index_1.login);
  }
}
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=auth.js.map
