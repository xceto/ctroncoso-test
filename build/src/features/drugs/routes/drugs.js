'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.DrugsRoutes = void 0;
const baseRoutes_1 = require('../../../routes/baseRoutes');
const controllers_1 = require('../controllers');
class DrugsRoutes extends baseRoutes_1.BaseRoutes {
  constructor() {
    super({ mergeParams: true });
    this.routes();
  }
  routes() {
    this.router.post('/drugs', [], controllers_1.addDrug);
    this.router.put('/drugs/:id', [], controllers_1.updateDrug);
    this.router.get('/drugs', [], controllers_1.getDrugs);
    this.router.delete('/drugs/:ids', [], controllers_1.deleteDrug);
  }
}
exports.DrugsRoutes = DrugsRoutes;
//# sourceMappingURL=drugs.js.map
