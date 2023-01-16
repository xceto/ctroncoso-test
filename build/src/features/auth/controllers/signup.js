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
exports.signUp = void 0;
const signUp = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // se logea el usuario.-
    const { email, password } = req.body;
    const registerdUser = yield registerUser({ email, password });
    res.json(registerdUser);
  });
exports.signUp = signUp;
const registerUser = ({ email, password }) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return {
      id: 0,
      name: 'ceto',
      email: 'ceto@gmail.com',
      password: 'encripted password',
    };
  });
//# sourceMappingURL=signup.js.map
