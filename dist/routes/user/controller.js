'use strict';

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _schema_validations = require('../../schema_validations');

var _dbManipulationLayer = require('../../db/dbManipulationLayer');

var _hashPassword = require('./hashPassword');

var _hashPassword2 = _interopRequireDefault(_hashPassword);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require("babel-polyfill");

var controller = {};

controller.registerUser = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, fullname, email, password, inputData, _Joi$validate, error, value, result, hashedPassword;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, fullname = _req$body.fullname, email = _req$body.email, password = _req$body.password;
            inputData = { fullname: fullname, email: email, password: password };
            _Joi$validate = _joi2.default.validate(inputData, _schema_validations.userValidationSchema.registerSchema), error = _Joi$validate.error, value = _Joi$validate.value;

            if (!error) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({ 'Error': error.details[0].message }));

          case 5:
            _context.prev = 5;
            result = void 0;
            _context.next = 9;
            return _dbManipulationLayer.userDbm.getUserByEmail(email);

          case 9:
            result = _context.sent;

            if (!(result && result.email == email)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({ 'Error': 'Email already registered' }));

          case 12:
            _context.next = 14;
            return (0, _hashPassword2.default)(password);

          case 14:
            hashedPassword = _context.sent;
            _context.next = 17;
            return _dbManipulationLayer.userDbm.createUser(fullname, email, hashedPassword);

          case 17:
            result = _context.sent;
            return _context.abrupt('return', res.status(_httpStatusCodes2.default.CREATED).json({
              'data': { 'message': 'User created Successfully',
                'userId': result
              }
            }));

          case 21:
            _context.prev = 21;
            _context.t0 = _context['catch'](5);
            return _context.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json(_context.t0));

          case 24:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[5, 21]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

controller.loginUser = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body2, email, password, inputData, _Joi$validate2, error, value, result, token;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
            inputData = { email: email, password: password };
            _Joi$validate2 = _joi2.default.validate(inputData, _schema_validations.userValidationSchema.loginSchema), error = _Joi$validate2.error, value = _Joi$validate2.value;

            if (!error) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({ 'Error': error.details[0].message }));

          case 5:
            _context2.prev = 5;
            result = void 0;
            _context2.next = 9;
            return _dbManipulationLayer.userDbm.getUserByEmail(email);

          case 9:
            result = _context2.sent;

            if (!(result && result.email == email)) {
              _context2.next = 13;
              break;
            }

            token = _jsonwebtoken2.default.sign({ email: email }, process.env.SECRET_KEY);
            return _context2.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
              'data': {
                'message': 'User logged in Successfully',
                'token': token,
                'advice': 'Use this token for Authentication'
              }
            }));

          case 13:
            return _context2.abrupt('return', res.status(_httpStatusCodes2.default.NOT_FOUND).json({
              'data': {
                'message': 'User not registered',
                'advice': 'Please register before logging in'
              }
            }));

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2['catch'](5);
            return _context2.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json(_context2.t0));

          case 19:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[5, 16]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = controller;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvdXNlci9jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJjb250cm9sbGVyIiwicmVnaXN0ZXJVc2VyIiwicmVxIiwicmVzIiwiYm9keSIsImZ1bGxuYW1lIiwiZW1haWwiLCJwYXNzd29yZCIsImlucHV0RGF0YSIsIkpvaSIsInZhbGlkYXRlIiwidXNlclZhbGlkYXRpb25TY2hlbWEiLCJyZWdpc3RlclNjaGVtYSIsImVycm9yIiwidmFsdWUiLCJzdGF0dXMiLCJIdHRwU3RhdHVzIiwiQkFEX1JFUVVFU1QiLCJqc29uIiwiZGV0YWlscyIsIm1lc3NhZ2UiLCJyZXN1bHQiLCJ1c2VyRGJtIiwiZ2V0VXNlckJ5RW1haWwiLCJoYXNoZWRQYXNzd29yZCIsImNyZWF0ZVVzZXIiLCJDUkVBVEVEIiwiSU5URVJOQUxfU0VSVkVSX0VSUk9SIiwibG9naW5Vc2VyIiwibG9naW5TY2hlbWEiLCJ0b2tlbiIsImp3dCIsInNpZ24iLCJwcm9jZXNzIiwiZW52IiwiU0VDUkVUX0tFWSIsIk9LIiwiTk9UX0ZPVU5EIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFQQUEsUUFBUSxnQkFBUjs7QUFTQSxJQUFNQyxhQUFhLEVBQW5COztBQUVBQSxXQUFXQyxZQUFYO0FBQUEscUVBQTBCLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVo7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdCQUNjRCxJQUFJRSxJQURsQixFQUNoQkMsUUFEZ0IsYUFDaEJBLFFBRGdCLEVBQ05DLEtBRE0sYUFDTkEsS0FETSxFQUNDQyxRQURELGFBQ0NBLFFBREQ7QUFFbEJDLHFCQUZrQixHQUVOLEVBQUVILGtCQUFGLEVBQVlDLFlBQVosRUFBbUJDLGtCQUFuQixFQUZNO0FBQUEsNEJBR0NFLGNBQUlDLFFBQUosQ0FDdkJGLFNBRHVCLEVBRXZC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QUFDTiwyQkFBVyxxQkFETDtBQUVOLDBCQUFVO0FBRko7QUFESixhQUZELENBakNZOztBQUFBO0FBQUE7QUFBQTtBQUFBLDhDQTJDWmYsSUFDSlksTUFESSxDQUNHQywwQkFBV1cscUJBRGQsRUFFSlQsSUFGSSxjQTNDWTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUF2Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFpREFvQixPQUFPQyxPQUFQLEdBQWlCdkMsVUFBakIiLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoXCJiYWJlbC1wb2x5ZmlsbFwiKTtcblxuaW1wb3J0IEpvaSBmcm9tICdqb2knO1xuaW1wb3J0IEh0dHBTdGF0dXMgZnJvbSAnaHR0cC1zdGF0dXMtY29kZXMnO1xuaW1wb3J0IHsgdXNlclZhbGlkYXRpb25TY2hlbWEgfSBmcm9tICcuLi8uLi9zY2hlbWFfdmFsaWRhdGlvbnMnO1xuaW1wb3J0IHsgdXNlckRibSB9IGZyb20gJy4uLy4uL2RiL2RiTWFuaXB1bGF0aW9uTGF5ZXInO1xuaW1wb3J0IGhhc2hQYXNzd29yZCBmcm9tICcuL2hhc2hQYXNzd29yZCc7XG5pbXBvcnQgand0IGZyb20gJ2pzb253ZWJ0b2tlbic7XG5cbmNvbnN0IGNvbnRyb2xsZXIgPSB7fTtcblxuY29udHJvbGxlci5yZWdpc3RlclVzZXIgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgY29uc3QgeyBmdWxsbmFtZSwgZW1haWwsIHBhc3N3b3JkIH0gPSByZXEuYm9keTtcbiAgY29uc3QgaW5wdXREYXRhID0geyBmdWxsbmFtZSwgZW1haWwsIHBhc3N3b3JkIH07XG4gIGNvbnN0IHsgZXJyb3IsIHZhbHVlIH0gPSBKb2kudmFsaWRhdGUoXG4gICAgaW5wdXREYXRhLFxuICAgIHVzZXJWYWxpZGF0aW9uU2NoZW1hLnJlZ2lzdGVyU2NoZW1hXG4gICk7XG5cbiAgaWYoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzXG4gICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QpXG4gICAgICAuanNvbih7ICdFcnJvcic6IGVycm9yLmRldGFpbHNbMF0ubWVzc2FnZSB9KTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgbGV0IHJlc3VsdDtcblxuICAgIHJlc3VsdCA9IGF3YWl0IHVzZXJEYm0uZ2V0VXNlckJ5RW1haWwoZW1haWwpO1xuXG4gICAgaWYocmVzdWx0ICYmIHJlc3VsdC5lbWFpbCA9PSBlbWFpbCkge1xuICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QpXG4gICAgICAgIC5qc29uKHsgJ0Vycm9yJzogJ0VtYWlsIGFscmVhZHkgcmVnaXN0ZXJlZCcgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgaGFzaGVkUGFzc3dvcmQgPSBhd2FpdCBoYXNoUGFzc3dvcmQocGFzc3dvcmQpO1xuXG4gICAgcmVzdWx0ID0gYXdhaXQgdXNlckRibS5jcmVhdGVVc2VyKGZ1bGxuYW1lLCBlbWFpbCwgaGFzaGVkUGFzc3dvcmQpO1xuXG4gICAgcmV0dXJuIHJlc1xuICAgICAgLnN0YXR1cyhIdHRwU3RhdHVzLkNSRUFURUQpXG4gICAgICAuanNvbih7XG4gICAgICAgICdkYXRhJzpcbiAgICAgICAgICB7ICdtZXNzYWdlJzogJ1VzZXIgY3JlYXRlZCBTdWNjZXNzZnVsbHknLFxuICAgICAgICAgICAgJ3VzZXJJZCc6IHJlc3VsdFxuICAgICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlc1xuICAgICAgLnN0YXR1cyhIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUilcbiAgICAgIC5qc29uKGVycm9yKTtcbiAgfVxufVxuXG5jb250cm9sbGVyLmxvZ2luVXNlciA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICBjb25zdCB7IGVtYWlsLCBwYXNzd29yZCB9ID0gcmVxLmJvZHk7XG4gIGNvbnN0IGlucHV0RGF0YSA9IHsgZW1haWwsIHBhc3N3b3JkIH07XG4gIGNvbnN0IHsgZXJyb3IsIHZhbHVlIH0gPSBKb2kudmFsaWRhdGUoXG4gICAgaW5wdXREYXRhLFxuICAgIHVzZXJWYWxpZGF0aW9uU2NoZW1hLmxvZ2luU2NoZW1hXG4gICk7XG5cbiAgaWYoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzXG4gICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QpXG4gICAgICAuanNvbih7ICdFcnJvcic6IGVycm9yLmRldGFpbHNbMF0ubWVzc2FnZSB9KTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgbGV0IHJlc3VsdDtcblxuICAgIHJlc3VsdCA9IGF3YWl0IHVzZXJEYm0uZ2V0VXNlckJ5RW1haWwoZW1haWwpO1xuXG4gICAgaWYocmVzdWx0ICYmIHJlc3VsdC5lbWFpbCA9PSBlbWFpbCkge1xuICAgICAgY29uc3QgdG9rZW4gPSBqd3Quc2lnbih7IGVtYWlsIH0sIHByb2Nlc3MuZW52LlNFQ1JFVF9LRVkpO1xuXG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoSHR0cFN0YXR1cy5PSylcbiAgICAgICAgLmpzb24oe1xuICAgICAgICAgICdkYXRhJzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnVXNlciBsb2dnZWQgaW4gU3VjY2Vzc2Z1bGx5JyxcbiAgICAgICAgICAgICd0b2tlbic6IHRva2VuLFxuICAgICAgICAgICAgJ2FkdmljZSc6ICdVc2UgdGhpcyB0b2tlbiBmb3IgQXV0aGVudGljYXRpb24nXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzXG4gICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuTk9UX0ZPVU5EKVxuICAgICAgLmpzb24oe1xuICAgICAgICAnZGF0YSc6IHtcbiAgICAgICAgICAnbWVzc2FnZSc6ICdVc2VyIG5vdCByZWdpc3RlcmVkJyxcbiAgICAgICAgICAnYWR2aWNlJzogJ1BsZWFzZSByZWdpc3RlciBiZWZvcmUgbG9nZ2luZyBpbidcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cbiAgY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlc1xuICAgICAgLnN0YXR1cyhIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUilcbiAgICAgIC5qc29uKGVycm9yKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnRyb2xsZXI7Il19