'use strict';

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

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
    var _req$body2, email, password, inputData, _Joi$validate2, error, value, result, validEmail, validPassword, token;

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
            result = void 0, validEmail = false, validPassword = false;
            _context2.next = 9;
            return _dbManipulationLayer.userDbm.getUserByEmail(email);

          case 9:
            result = _context2.sent;

            if (!(result && result.email == email)) {
              _context2.next = 18;
              break;
            }

            validEmail = true;
            _context2.next = 14;
            return _bcryptjs2.default.compare(password, result.password);

          case 14:
            if (!_context2.sent) {
              _context2.next = 18;
              break;
            }

            validPassword = true;
            token = _jsonwebtoken2.default.sign({ email: email }, process.env.SECRET_KEY);
            return _context2.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
              'data': {
                'message': 'User logged in Successfully',
                'token': token,
                'info': 'Use this token for Authentication'
              }
            }));

          case 18:
            if (validEmail) {
              _context2.next = 20;
              break;
            }

            return _context2.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
              'data': {
                'message': 'Invalid email or user not registered',
                'info': 'Please try again or register an account'
              }
            }));

          case 20:
            if (validPassword) {
              _context2.next = 22;
              break;
            }

            return _context2.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
              'data': {
                'message': 'Invalid password',
                'info': 'Wrong password try again!'
              }
            }));

          case 22:
            _context2.next = 27;
            break;

          case 24:
            _context2.prev = 24;
            _context2.t0 = _context2['catch'](5);
            return _context2.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json(_context2.t0));

          case 27:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[5, 24]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = controller;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvdXNlci9jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJjb250cm9sbGVyIiwicmVnaXN0ZXJVc2VyIiwicmVxIiwicmVzIiwiYm9keSIsImZ1bGxuYW1lIiwiZW1haWwiLCJwYXNzd29yZCIsImlucHV0RGF0YSIsIkpvaSIsInZhbGlkYXRlIiwidXNlclZhbGlkYXRpb25TY2hlbWEiLCJyZWdpc3RlclNjaGVtYSIsImVycm9yIiwidmFsdWUiLCJzdGF0dXMiLCJIdHRwU3RhdHVzIiwiQkFEX1JFUVVFU1QiLCJqc29uIiwiZGV0YWlscyIsIm1lc3NhZ2UiLCJyZXN1bHQiLCJ1c2VyRGJtIiwiZ2V0VXNlckJ5RW1haWwiLCJoYXNoZWRQYXNzd29yZCIsImNyZWF0ZVVzZXIiLCJDUkVBVEVEIiwiSU5URVJOQUxfU0VSVkVSX0VSUk9SIiwibG9naW5Vc2VyIiwibG9naW5TY2hlbWEiLCJ2YWxpZEVtYWlsIiwidmFsaWRQYXNzd29yZCIsImJjcnlwdCIsImNvbXBhcmUiLCJ0b2tlbiIsImp3dCIsInNpZ24iLCJwcm9jZXNzIiwiZW52IiwiU0VDUkVUX0tFWSIsIk9LIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQVJBQSxRQUFRLGdCQUFSOztBQVVBLElBQU1DLGFBQWEsRUFBbkI7O0FBRUFBLFdBQVdDLFlBQVg7QUFBQSxxRUFBMEIsaUJBQU9DLEdBQVAsRUFBWUMsR0FBWjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0JBQ2NELElBQUlFLElBRGxCLEVBQ2hCQyxRQURnQixhQUNoQkEsUUFEZ0IsRUFDTkMsS0FETSxhQUNOQSxLQURNLEVBQ0NDLFFBREQsYUFDQ0EsUUFERDtBQUVsQkMscUJBRmtCLEdBRU4sRUFBRUgsa0JBQUYsRUFBWUMsWUFBWixFQUFtQkMsa0JBQW5CLEVB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LENBdkJDO0FBQUEsOENBeUJScEMsSUFDSlksTUFESSxDQUNHQywwQkFBV3dCLEVBRGQsRUFFSnRCLElBRkksQ0FFQztBQUNKLHNCQUFRO0FBQ04sMkJBQVcsNkJBREw7QUFFTix5QkFBU2dCLEtBRkg7QUFHTix3QkFBUTtBQUhGO0FBREosYUFGRCxDQXpCUTs7QUFBQTtBQUFBLGdCQXFDZkosVUFyQ2U7QUFBQTtBQUFBO0FBQUE7O0FBQUEsOENBc0NWM0IsSUFDSlksTUFESSxDQUNHQywwQkFBV0MsV0FEZCxFQUVKQyxJQUZJLENBRUM7QUFDSixzQkFBUTtBQUNOLDJCQUFXLHNDQURMO0FBRU4sd0JBQVE7QUFGRjtBQURKLGFBRkQsQ0F0Q1U7O0FBQUE7QUFBQSxnQkFnRGZhLGFBaERlO0FBQUE7QUFBQTtBQUFBOztBQUFBLDhDQWlEVjVCLElBQ0pZLE1BREksQ0FDR0MsMEJBQVdDLFdBRGQsRUFFSkMsSUFGSSxDQUVDO0FBQ0osc0JBQVE7QUFDTiwyQkFBVyxrQkFETDtBQUVOLHdCQUFRO0FBRkY7QUFESixhQUZELENBakRVOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQSw4Q0E0RFpmLElBQ0pZLE1BREksQ0FDR0MsMEJBQVdXLHFCQURkLEVBRUpULElBRkksY0E1RFk7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBdkI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBa0VBdUIsT0FBT0MsT0FBUCxHQUFpQjFDLFVBQWpCIiwiZmlsZSI6ImNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKFwiYmFiZWwtcG9seWZpbGxcIik7XG5cbmltcG9ydCBKb2kgZnJvbSAnam9pJztcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0anMnO1xuaW1wb3J0IEh0dHBTdGF0dXMgZnJvbSAnaHR0cC1zdGF0dXMtY29kZXMnO1xuaW1wb3J0IHsgdXNlclZhbGlkYXRpb25TY2hlbWEgfSBmcm9tICcuLi8uLi9zY2hlbWFfdmFsaWRhdGlvbnMnO1xuaW1wb3J0IHsgdXNlckRibSB9IGZyb20gJy4uLy4uL2RiL2RiTWFuaXB1bGF0aW9uTGF5ZXInO1xuaW1wb3J0IGhhc2hQYXNzd29yZCBmcm9tICcuL2hhc2hQYXNzd29yZCc7XG5pbXBvcnQgand0IGZyb20gJ2pzb253ZWJ0b2tlbic7XG5cbmNvbnN0IGNvbnRyb2xsZXIgPSB7fTtcblxuY29udHJvbGxlci5yZWdpc3RlclVzZXIgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgY29uc3QgeyBmdWxsbmFtZSwgZW1haWwsIHBhc3N3b3JkIH0gPSByZXEuYm9keTtcbiAgY29uc3QgaW5wdXREYXRhID0geyBmdWxsbmFtZSwgZW1haWwsIHBhc3N3b3JkIH07XG4gIGNvbnN0IHsgZXJyb3IsIHZhbHVlIH0gPSBKb2kudmFsaWRhdGUoXG4gICAgaW5wdXREYXRhLFxuICAgIHVzZXJWYWxpZGF0aW9uU2NoZW1hLnJlZ2lzdGVyU2NoZW1hXG4gICk7XG5cbiAgaWYoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzXG4gICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QpXG4gICAgICAuanNvbih7ICdFcnJvcic6IGVycm9yLmRldGFpbHNbMF0ubWVzc2FnZSB9KTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgbGV0IHJlc3VsdDtcblxuICAgIHJlc3VsdCA9IGF3YWl0IHVzZXJEYm0uZ2V0VXNlckJ5RW1haWwoZW1haWwpO1xuXG4gICAgaWYocmVzdWx0ICYmIHJlc3VsdC5lbWFpbCA9PSBlbWFpbCkge1xuICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QpXG4gICAgICAgIC5qc29uKHsgJ0Vycm9yJzogJ0VtYWlsIGFscmVhZHkgcmVnaXN0ZXJlZCcgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgaGFzaGVkUGFzc3dvcmQgPSBhd2FpdCBoYXNoUGFzc3dvcmQocGFzc3dvcmQpO1xuXG4gICAgcmVzdWx0ID0gYXdhaXQgdXNlckRibS5jcmVhdGVVc2VyKGZ1bGxuYW1lLCBlbWFpbCwgaGFzaGVkUGFzc3dvcmQpO1xuXG4gICAgcmV0dXJuIHJlc1xuICAgICAgLnN0YXR1cyhIdHRwU3RhdHVzLkNSRUFURUQpXG4gICAgICAuanNvbih7XG4gICAgICAgICdkYXRhJzpcbiAgICAgICAgICB7ICdtZXNzYWdlJzogJ1VzZXIgY3JlYXRlZCBTdWNjZXNzZnVsbHknLFxuICAgICAgICAgICAgJ3VzZXJJZCc6IHJlc3VsdFxuICAgICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlc1xuICAgICAgLnN0YXR1cyhIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUilcbiAgICAgIC5qc29uKGVycm9yKTtcbiAgfVxufVxuXG5jb250cm9sbGVyLmxvZ2luVXNlciA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICBjb25zdCB7IGVtYWlsLCBwYXNzd29yZCB9ID0gcmVxLmJvZHk7XG4gIGNvbnN0IGlucHV0RGF0YSA9IHsgZW1haWwsIHBhc3N3b3JkIH07XG4gIGNvbnN0IHsgZXJyb3IsIHZhbHVlIH0gPSBKb2kudmFsaWRhdGUoXG4gICAgaW5wdXREYXRhLFxuICAgIHVzZXJWYWxpZGF0aW9uU2NoZW1hLmxvZ2luU2NoZW1hXG4gICk7XG5cbiAgaWYoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzXG4gICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QpXG4gICAgICAuanNvbih7ICdFcnJvcic6IGVycm9yLmRldGFpbHNbMF0ubWVzc2FnZSB9KTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgbGV0IHJlc3VsdCwgdmFsaWRFbWFpbCA9IGZhbHNlLCB2YWxpZFBhc3N3b3JkID0gZmFsc2U7XG5cbiAgICByZXN1bHQgPSBhd2FpdCB1c2VyRGJtLmdldFVzZXJCeUVtYWlsKGVtYWlsKTtcblxuICAgIGlmKHJlc3VsdCAmJiByZXN1bHQuZW1haWwgPT0gZW1haWwpIHtcbiAgICAgIHZhbGlkRW1haWwgPSB0cnVlO1xuICAgICAgaWYoYXdhaXQgYmNyeXB0LmNvbXBhcmUocGFzc3dvcmQsIHJlc3VsdC5wYXNzd29yZCkpIHtcbiAgICAgICAgdmFsaWRQYXNzd29yZCA9IHRydWU7XG4gICAgICAgIGNvbnN0IHRva2VuID0gand0LnNpZ24oeyBlbWFpbCB9LCBwcm9jZXNzLmVudi5TRUNSRVRfS0VZKTtcblxuICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgICAgLnN0YXR1cyhIdHRwU3RhdHVzLk9LKVxuICAgICAgICAgIC5qc29uKHtcbiAgICAgICAgICAgICdkYXRhJzoge1xuICAgICAgICAgICAgICAnbWVzc2FnZSc6ICdVc2VyIGxvZ2dlZCBpbiBTdWNjZXNzZnVsbHknLFxuICAgICAgICAgICAgICAndG9rZW4nOiB0b2tlbixcbiAgICAgICAgICAgICAgJ2luZm8nOiAnVXNlIHRoaXMgdG9rZW4gZm9yIEF1dGhlbnRpY2F0aW9uJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKCF2YWxpZEVtYWlsKSB7XG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoSHR0cFN0YXR1cy5CQURfUkVRVUVTVClcbiAgICAgICAgLmpzb24oe1xuICAgICAgICAgICdkYXRhJzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnSW52YWxpZCBlbWFpbCBvciB1c2VyIG5vdCByZWdpc3RlcmVkJyxcbiAgICAgICAgICAgICdpbmZvJzogJ1BsZWFzZSB0cnkgYWdhaW4gb3IgcmVnaXN0ZXIgYW4gYWNjb3VudCdcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmKCF2YWxpZFBhc3N3b3JkKSB7XG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoSHR0cFN0YXR1cy5CQURfUkVRVUVTVClcbiAgICAgICAgLmpzb24oe1xuICAgICAgICAgICdkYXRhJzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnSW52YWxpZCBwYXNzd29yZCcsXG4gICAgICAgICAgICAnaW5mbyc6ICdXcm9uZyBwYXNzd29yZCB0cnkgYWdhaW4hJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG4gIGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiByZXNcbiAgICAgIC5zdGF0dXMoSHR0cFN0YXR1cy5JTlRFUk5BTF9TRVJWRVJfRVJST1IpXG4gICAgICAuanNvbihlcnJvcik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb250cm9sbGVyOyJdfQ==