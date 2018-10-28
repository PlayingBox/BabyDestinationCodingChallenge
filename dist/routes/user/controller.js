'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _schema_validations = require('../../schema_validations');

var _dbManipulationLayer = require('../../db/dbManipulationLayer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = {};

var hashPassword = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(password) {
    var saltRounds;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            saltRounds = 10;
            _context.next = 3;
            return _bcryptjs2.default.hash(password, saltRounds);

          case 3:
            return _context.abrupt('return', _context.sent);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function hashPassword(_x) {
    return _ref.apply(this, arguments);
  };
}();

controller.registerUser = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var _req$body, fullname, email, password, inputData, _Joi$validate, error, value, result, hashedPassword;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, fullname = _req$body.fullname, email = _req$body.email, password = _req$body.password;
            inputData = { fullname: fullname, email: email, password: password };
            _Joi$validate = _joi2.default.validate(inputData, _schema_validations.userValidationSchema.registerSchema), error = _Joi$validate.error, value = _Joi$validate.value;

            if (!error) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({ 'Error': error.details[0].message }));

          case 5:
            _context2.prev = 5;
            result = '';
            _context2.next = 9;
            return _dbManipulationLayer.userDbm.getUserByEmail(email);

          case 9:
            result = _context2.sent;

            if (!(result == email)) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({ 'Error': 'Email already registered' }));

          case 12:
            _context2.next = 14;
            return hashPassword(password);

          case 14:
            hashedPassword = _context2.sent;
            _context2.next = 17;
            return _dbManipulationLayer.userDbm.createUser(fullname, email, hashPassword);

          case 17:
            result = _context2.sent;
            return _context2.abrupt('return', res.status(_httpStatusCodes2.default.CREATED).json({ 'data': { 'userId': result } }));

          case 21:
            _context2.prev = 21;
            _context2.t0 = _context2['catch'](5);
            return _context2.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({ 'Error': _context2.t0 }));

          case 24:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[5, 21]]);
  }));

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

controller.loginUser = function (req, res) {};

module.exports = controller;
//# sourceMappingURL=controller.js.map