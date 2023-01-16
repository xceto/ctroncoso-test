'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.deleteDrug = void 0;
const drugs_1 = require('../services/drugs');
const deleteDrug = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const drugService = new drugs_1.DrugsServices();
    const deleteDrug = yield drugService.deleteDrug({ id });
    res.status(200).json(deleteDrug);
  });
exports.deleteDrug = deleteDrug;
//# sourceMappingURL=deleteDrug.js.map
