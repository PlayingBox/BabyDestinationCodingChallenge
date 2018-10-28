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
                'message': 'Invalid email',
                'info': 'Please try again'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvdXNlci9jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJjb250cm9sbGVyIiwicmVnaXN0ZXJVc2VyIiwicmVxIiwicmVzIiwiYm9keSIsImZ1bGxuYW1lIiwiZW1haWwiLCJwYXNzd29yZCIsImlucHV0RGF0YSIsIkpvaSIsInZhbGlkYXRlIiwidXNlclZhbGlkYXRpb25TY2hlbWEiLCJyZWdpc3RlclNjaGVtYSIsImVycm9yIiwidmFsdWUiLCJzdGF0dXMiLCJIdHRwU3RhdHVzIiwiQkFEX1JFUVVFU1QiLCJqc29uIiwiZGV0YWlscyIsIm1lc3NhZ2UiLCJyZXN1bHQiLCJ1c2VyRGJtIiwiZ2V0VXNlckJ5RW1haWwiLCJoYXNoZWRQYXNzd29yZCIsImNyZWF0ZVVzZXIiLCJDUkVBVEVEIiwiSU5URVJOQUxfU0VSVkVSX0VSUk9SIiwibG9naW5Vc2VyIiwibG9naW5TY2hlbWEiLCJ2YWxpZEVtYWlsIiwidmFsaWRQYXNzd29yZCIsImJjcnlwdCIsImNvbXBhcmUiLCJ0b2tlbiIsImp3dCIsInNpZ24iLCJwcm9jZXNzIiwiZW52IiwiU0VDUkVUX0tFWSIsIk9LIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQVJBQSxRQUFRLGdCQUFSOztBQVVBLElBQU1DLGFBQWEsRUFBbkI7O0FBRUFBLFdBQVdDLFlBQVg7QUFBQSxxRUFBMEIsaUJBQU9DLEdBQVAsRUFBWUMsR0FBWjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0JBQ2NELElBQUlFLElBRGxCLEVBQ2hCQyxRQURnQixhQUNoQkEsUUFEZ0IsRUFDTkMsS0FETSxhQUNOQSxLQURNLEVBQ0NDLFFBREQsYUFDQ0EsUUFERDtBQUVsQkMscUJBRmtCLEdBRU4sRUFBRUgsa0JBQUYsRUFBWUMsWUFBWixFQUFtQkMsa0JBQW5CLEVB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LENBdkJDO0FBQUEsOENBeUJScEMsSUFDSlksTUFESSxDQUNHQywwQkFBV3dCLEVBRGQsRUFFSnRCLElBRkksQ0FFQztBQUNKLHNCQUFRO0FBQ04sMkJBQVcsNkJBREw7QUFFTix5QkFBU2dCLEtBRkg7QUFHTix3QkFBUTtBQUhGO0FBREosYUFGRCxDQXpCUTs7QUFBQTtBQUFBLGdCQXFDZkosVUFyQ2U7QUFBQTtBQUFBO0FBQUE7O0FBQUEsOENBc0NWM0IsSUFDSlksTUFESSxDQUNHQywwQkFBV0MsV0FEZCxFQUVKQyxJQUZJLENBRUM7QUFDSixzQkFBUTtBQUNOLDJCQUFXLGVBREw7QUFFTix3QkFBUTtBQUZGO0FBREosYUFGRCxDQXRDVTs7QUFBQTtBQUFBLGdCQWdEZmEsYUFoRGU7QUFBQTtBQUFBO0FBQUE7O0FBQUEsOENBaURWNUIsSUFDSlksTUFESSxDQUNHQywwQkFBV0MsV0FEZCxFQUVKQyxJQUZJLENBRUM7QUFDSixzQkFBUTtBQUNOLDJCQUFXLGtCQURMO0FBRU4sd0JBQVE7QUFGRjtBQURKLGFBRkQsQ0FqRFU7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBLDhDQTREWmYsSUFDSlksTUFESSxDQUNHQywwQkFBV1cscUJBRGQsRUFFSlQsSUFGSSxjQTVEWTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUF2Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFrRUF1QixPQUFPQyxPQUFQLEdBQWlCMUMsVUFBakIiLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoXCJiYWJlbC1wb2x5ZmlsbFwiKTtcblxuaW1wb3J0IEpvaSBmcm9tICdqb2knO1xuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHRqcyc7XG5pbXBvcnQgSHR0cFN0YXR1cyBmcm9tICdodHRwLXN0YXR1cy1jb2Rlcyc7XG5pbXBvcnQgeyB1c2VyVmFsaWRhdGlvblNjaGVtYSB9IGZyb20gJy4uLy4uL3NjaGVtYV92YWxpZGF0aW9ucyc7XG5pbXBvcnQgeyB1c2VyRGJtIH0gZnJvbSAnLi4vLi4vZGIvZGJNYW5pcHVsYXRpb25MYXllcic7XG5pbXBvcnQgaGFzaFBhc3N3b3JkIGZyb20gJy4vaGFzaFBhc3N3b3JkJztcbmltcG9ydCBqd3QgZnJvbSAnanNvbndlYnRva2VuJztcblxuY29uc3QgY29udHJvbGxlciA9IHt9O1xuXG5jb250cm9sbGVyLnJlZ2lzdGVyVXNlciA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICBjb25zdCB7IGZ1bGxuYW1lLCBlbWFpbCwgcGFzc3dvcmQgfSA9IHJlcS5ib2R5O1xuICBjb25zdCBpbnB1dERhdGEgPSB7IGZ1bGxuYW1lLCBlbWFpbCwgcGFzc3dvcmQgfTtcbiAgY29uc3QgeyBlcnJvciwgdmFsdWUgfSA9IEpvaS52YWxpZGF0ZShcbiAgICBpbnB1dERhdGEsXG4gICAgdXNlclZhbGlkYXRpb25TY2hlbWEucmVnaXN0ZXJTY2hlbWFcbiAgKTtcblxuICBpZihlcnJvcikge1xuICAgIHJldHVybiByZXNcbiAgICAgIC5zdGF0dXMoSHR0cFN0YXR1cy5CQURfUkVRVUVTVClcbiAgICAgIC5qc29uKHsgJ0Vycm9yJzogZXJyb3IuZGV0YWlsc1swXS5tZXNzYWdlIH0pO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBsZXQgcmVzdWx0O1xuXG4gICAgcmVzdWx0ID0gYXdhaXQgdXNlckRibS5nZXRVc2VyQnlFbWFpbChlbWFpbCk7XG5cbiAgICBpZihyZXN1bHQgJiYgcmVzdWx0LmVtYWlsID09IGVtYWlsKSB7XG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoSHR0cFN0YXR1cy5CQURfUkVRVUVTVClcbiAgICAgICAgLmpzb24oeyAnRXJyb3InOiAnRW1haWwgYWxyZWFkeSByZWdpc3RlcmVkJyB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBoYXNoZWRQYXNzd29yZCA9IGF3YWl0IGhhc2hQYXNzd29yZChwYXNzd29yZCk7XG5cbiAgICByZXN1bHQgPSBhd2FpdCB1c2VyRGJtLmNyZWF0ZVVzZXIoZnVsbG5hbWUsIGVtYWlsLCBoYXNoZWRQYXNzd29yZCk7XG5cbiAgICByZXR1cm4gcmVzXG4gICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuQ1JFQVRFRClcbiAgICAgIC5qc29uKHtcbiAgICAgICAgJ2RhdGEnOlxuICAgICAgICAgIHsgJ21lc3NhZ2UnOiAnVXNlciBjcmVhdGVkIFN1Y2Nlc3NmdWxseScsXG4gICAgICAgICAgICAndXNlcklkJzogcmVzdWx0XG4gICAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzXG4gICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SKVxuICAgICAgLmpzb24oZXJyb3IpO1xuICB9XG59XG5cbmNvbnRyb2xsZXIubG9naW5Vc2VyID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkIH0gPSByZXEuYm9keTtcbiAgY29uc3QgaW5wdXREYXRhID0geyBlbWFpbCwgcGFzc3dvcmQgfTtcbiAgY29uc3QgeyBlcnJvciwgdmFsdWUgfSA9IEpvaS52YWxpZGF0ZShcbiAgICBpbnB1dERhdGEsXG4gICAgdXNlclZhbGlkYXRpb25TY2hlbWEubG9naW5TY2hlbWFcbiAgKTtcblxuICBpZihlcnJvcikge1xuICAgIHJldHVybiByZXNcbiAgICAgIC5zdGF0dXMoSHR0cFN0YXR1cy5CQURfUkVRVUVTVClcbiAgICAgIC5qc29uKHsgJ0Vycm9yJzogZXJyb3IuZGV0YWlsc1swXS5tZXNzYWdlIH0pO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBsZXQgcmVzdWx0LCB2YWxpZEVtYWlsID0gZmFsc2UsIHZhbGlkUGFzc3dvcmQgPSBmYWxzZTtcblxuICAgIHJlc3VsdCA9IGF3YWl0IHVzZXJEYm0uZ2V0VXNlckJ5RW1haWwoZW1haWwpO1xuXG4gICAgaWYocmVzdWx0ICYmIHJlc3VsdC5lbWFpbCA9PSBlbWFpbCkge1xuICAgICAgdmFsaWRFbWFpbCA9IHRydWU7XG4gICAgICBpZihhd2FpdCBiY3J5cHQuY29tcGFyZShwYXNzd29yZCwgcmVzdWx0LnBhc3N3b3JkKSkge1xuICAgICAgICB2YWxpZFBhc3N3b3JkID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBqd3Quc2lnbih7IGVtYWlsIH0sIHByb2Nlc3MuZW52LlNFQ1JFVF9LRVkpO1xuXG4gICAgICAgIHJldHVybiByZXNcbiAgICAgICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuT0spXG4gICAgICAgICAgLmpzb24oe1xuICAgICAgICAgICAgJ2RhdGEnOiB7XG4gICAgICAgICAgICAgICdtZXNzYWdlJzogJ1VzZXIgbG9nZ2VkIGluIFN1Y2Nlc3NmdWxseScsXG4gICAgICAgICAgICAgICd0b2tlbic6IHRva2VuLFxuICAgICAgICAgICAgICAnaW5mbyc6ICdVc2UgdGhpcyB0b2tlbiBmb3IgQXV0aGVudGljYXRpb24nXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoIXZhbGlkRW1haWwpIHtcbiAgICAgIHJldHVybiByZXNcbiAgICAgICAgLnN0YXR1cyhIdHRwU3RhdHVzLkJBRF9SRVFVRVNUKVxuICAgICAgICAuanNvbih7XG4gICAgICAgICAgJ2RhdGEnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdJbnZhbGlkIGVtYWlsJyxcbiAgICAgICAgICAgICdpbmZvJzogJ1BsZWFzZSB0cnkgYWdhaW4nXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZighdmFsaWRQYXNzd29yZCkge1xuICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QpXG4gICAgICAgIC5qc29uKHtcbiAgICAgICAgICAnZGF0YSc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ0ludmFsaWQgcGFzc3dvcmQnLFxuICAgICAgICAgICAgJ2luZm8nOiAnV3JvbmcgcGFzc3dvcmQgdHJ5IGFnYWluISdcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzXG4gICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SKVxuICAgICAgLmpzb24oZXJyb3IpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29udHJvbGxlcjsiXX0=