'use strict';

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userValidationSchemas = {};

userValidationSchemas.registerSchema = _joi2.default.object().keys({
  fullname: _joi2.default.string().required(),
  email: _joi2.default.string().email({ minDomainAtoms: 2 }).required(),
  password: _joi2.default.string().required()
});

module.exports = userValidationSchemas;
//# sourceMappingURL=user.js.map