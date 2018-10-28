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

            return _context.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
              'Error': error.details[0].message
            }));

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

            return _context.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
              'Error': 'Email already registered'
            }));

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
                'userId': result.id,
                'info': 'You can login now'
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

            return _context2.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
              'Error': error.details[0].message
            }));

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
            token = _jsonwebtoken2.default.sign({ userId: result.id }, process.env.SECRET_KEY, {
              expiresIn: '1h'
            });
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
                'info': 'Wrong email try again!'
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

controller.editUserProfile = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var fullname, inputData, _Joi$validate3, error, value, userId, result;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            fullname = req.body.fullname;
            inputData = { fullname: fullname };
            _Joi$validate3 = _joi2.default.validate(inputData, _schema_validations.userValidationSchema.editSchema), error = _Joi$validate3.error, value = _Joi$validate3.value;

            if (!error) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({ 'Error': error.details[0].message }));

          case 5:
            userId = req.userData.userId;
            _context3.prev = 6;
            _context3.next = 9;
            return _dbManipulationLayer.userDbm.editUserProfile(fullname, userId);

          case 9:
            result = _context3.sent;
            return _context3.abrupt('return', res.status(_httpStatusCodes2.default.ACCEPTED).json({
              'data': {
                'message': 'Fullname changed',
                'info': 'Profile modified'
              }
            }));

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3['catch'](6);
            return _context3.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json(_context3.t0));

          case 16:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[6, 13]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

module.exports = controller;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvdXNlci9jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJjb250cm9sbGVyIiwicmVnaXN0ZXJVc2VyIiwicmVxIiwicmVzIiwiYm9keSIsImZ1bGxuYW1lIiwiZW1haWwiLCJwYXNzd29yZCIsImlucHV0RGF0YSIsIkpvaSIsInZhbGlkYXRlIiwidXNlclZhbGlkYXRpb25TY2hlbWEiLCJyZWdpc3RlclNjaGVtYSIsImVycm9yIiwidmFsdWUiLCJzdGF0dXMiLCJIdHRwU3RhdHVzIiwiQkFEX1JFUVVFU1QiLCJqc29uIiwiZGV0YWlscyIsIm1lc3NhZ2UiLCJyZXN1bHQiLCJ1c2VyRGJtIiwiZ2V0VXNlckJ5RW1haWwiLCJoYXNoZWRQYXNzd29yZCIsImNyZWF0ZVVzZXIiLCJDUkVBVEVEIiwiaWQiLCJJTlRFUk5BTF9TRVJWRVJfRVJST1IiLCJsb2dpblVzZXIiLCJsb2dpblNjaGVtYSIsInZhbGlkRW1haWwiLCJ2YWxpZFBhc3N3b3JkIiwiYmNyeXB0IiwiY29tcGFyZSIsInRva2VuIiwiand0Iiwic2lnbiIsInVzZXJJZCIsInByb2Nlc3MiLCJlbnYiLCJTRUNSRVRfS0VZIiwiZXhwaXJlc0luIiwiT0siLCJlZGl0VXNlclByb2ZpbGUiLCJlZGl0U2NoZW1hIiwidXNlckRhdGEiLCJBQ0NFUFRFRCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFSQUEsUUFBUSxnQkFBUjs7QUFVQSxJQUFNQyxhQUFhLEVBQW5COztBQUVBQSxXQUFXQyxZQUFYO0FBQUEscUVBQTBCLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVo7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdCQUNjRCxJQUFJRSxJQURsQixFQUNoQkMsUUFEZ0IsYUFDaEJBLFFBRGdCLEVBQ05DLEtBRE0sYUFDTkEsS0FETSxF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QUFFckJHLHFCQUZxQixHQUVULEVBQUVILGtCQUFGLEVBRlM7QUFBQSw2QkFHRkksY0FBSUMsUUFBSixDQUN2QkYsU0FEdUIsRUFFdkJHLHlDQUFxQmtDLFVBRkUsQ0FIRSxFQUduQmhDLEtBSG1CLGtCQUduQkEsS0FIbUIsRUFHWkMsS0FIWSxrQkFHWkEsS0FIWTs7QUFBQSxpQkFReEJELEtBUndCO0FBQUE7QUFBQTtBQUFBOztBQUFBLDhDQVNsQlYsSUFDSlksTUFESSxDQUNHQywwQkFBV0MsV0FEZCxFQUVKQyxJQUZJLENBRUMsRUFBRSxTQUFTTCxNQUFNTSxPQUFOLENBQWMsQ0FBZCxFQUFpQkMsT0FBNUIsRUFGRCxDQVRrQjs7QUFBQTtBQWNuQmtCLGtCQWRtQixHQWNScEMsSUFBSTRDLFFBZEksQ0FjbkJSLE1BZG1CO0FBQUE7QUFBQTtBQUFBLG1CQWlCSmhCLDZCQUFRc0IsZUFBUixDQUF3QnZDLFFBQXhCLEVBQWtDaUMsTUFBbEMsQ0FqQkk7O0FBQUE7QUFpQm5CakIsa0JBakJtQjtBQUFBLDhDQWtCbEJsQixJQUNKWSxNQURJLENBQ0dDLDBCQUFXK0IsUUFEZCxFQUVKN0IsSUFGSSxDQUVDO0FBQ0osc0JBQVE7QUFDTiwyQkFBVyxrQkFETDtBQUVOLHdCQUFRO0FBRkY7QUFESixhQUZELENBbEJrQjs7QUFBQTtBQUFBO0FBQUE7QUFBQSw4Q0E0QmxCZixJQUNKWSxNQURJLENBQ0dDLDBCQUFXWSxxQkFEZCxFQUVKVixJQUZJLGNBNUJrQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUE3Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFrQ0E4QixPQUFPQyxPQUFQLEdBQWlCakQsVUFBakIiLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoXCJiYWJlbC1wb2x5ZmlsbFwiKTtcblxuaW1wb3J0IEpvaSBmcm9tICdqb2knO1xuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHRqcyc7XG5pbXBvcnQgSHR0cFN0YXR1cyBmcm9tICdodHRwLXN0YXR1cy1jb2Rlcyc7XG5pbXBvcnQgeyB1c2VyVmFsaWRhdGlvblNjaGVtYSB9IGZyb20gJy4uLy4uL3NjaGVtYV92YWxpZGF0aW9ucyc7XG5pbXBvcnQgeyB1c2VyRGJtIH0gZnJvbSAnLi4vLi4vZGIvZGJNYW5pcHVsYXRpb25MYXllcic7XG5pbXBvcnQgaGFzaFBhc3N3b3JkIGZyb20gJy4vaGFzaFBhc3N3b3JkJztcbmltcG9ydCBqd3QgZnJvbSAnanNvbndlYnRva2VuJztcblxuY29uc3QgY29udHJvbGxlciA9IHt9O1xuXG5jb250cm9sbGVyLnJlZ2lzdGVyVXNlciA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICBjb25zdCB7IGZ1bGxuYW1lLCBlbWFpbCwgcGFzc3dvcmQgfSA9IHJlcS5ib2R5O1xuICBjb25zdCBpbnB1dERhdGEgPSB7IGZ1bGxuYW1lLCBlbWFpbCwgcGFzc3dvcmQgfTtcbiAgY29uc3QgeyBlcnJvciwgdmFsdWUgfSA9IEpvaS52YWxpZGF0ZShcbiAgICBpbnB1dERhdGEsXG4gICAgdXNlclZhbGlkYXRpb25TY2hlbWEucmVnaXN0ZXJTY2hlbWFcbiAgKTtcblxuICBpZihlcnJvcikge1xuICAgIHJldHVybiByZXNcbiAgICAgIC5zdGF0dXMoSHR0cFN0YXR1cy5CQURfUkVRVUVTVClcbiAgICAgIC5qc29uKHtcbiAgICAgICAgJ0Vycm9yJzogZXJyb3IuZGV0YWlsc1swXS5tZXNzYWdlXG4gICAgICB9KTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgbGV0IHJlc3VsdDtcblxuICAgIHJlc3VsdCA9IGF3YWl0IHVzZXJEYm0uZ2V0VXNlckJ5RW1haWwoZW1haWwpO1xuXG4gICAgaWYocmVzdWx0ICYmIHJlc3VsdC5lbWFpbCA9PSBlbWFpbCkge1xuICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QpXG4gICAgICAgIC5qc29uKHtcbiAgICAgICAgICAnRXJyb3InOiAnRW1haWwgYWxyZWFkeSByZWdpc3RlcmVkJ1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBoYXNoZWRQYXNzd29yZCA9IGF3YWl0IGhhc2hQYXNzd29yZChwYXNzd29yZCk7XG5cbiAgICByZXN1bHQgPSBhd2FpdCB1c2VyRGJtLmNyZWF0ZVVzZXIoZnVsbG5hbWUsIGVtYWlsLCBoYXNoZWRQYXNzd29yZCk7XG5cbiAgICByZXR1cm4gcmVzXG4gICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuQ1JFQVRFRClcbiAgICAgIC5qc29uKHtcbiAgICAgICAgJ2RhdGEnOlxuICAgICAgICAgIHsgJ21lc3NhZ2UnOiAnVXNlciBjcmVhdGVkIFN1Y2Nlc3NmdWxseScsXG4gICAgICAgICAgICAndXNlcklkJzogcmVzdWx0LmlkLFxuICAgICAgICAgICAgJ2luZm8nOiAnWW91IGNhbiBsb2dpbiBub3cnXG4gICAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzXG4gICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SKVxuICAgICAgLmpzb24oZXJyb3IpO1xuICB9XG59XG5cbmNvbnRyb2xsZXIubG9naW5Vc2VyID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkIH0gPSByZXEuYm9keTtcbiAgY29uc3QgaW5wdXREYXRhID0geyBlbWFpbCwgcGFzc3dvcmQgfTtcbiAgY29uc3QgeyBlcnJvciwgdmFsdWUgfSA9IEpvaS52YWxpZGF0ZShcbiAgICBpbnB1dERhdGEsXG4gICAgdXNlclZhbGlkYXRpb25TY2hlbWEubG9naW5TY2hlbWFcbiAgKTtcblxuICBpZihlcnJvcikge1xuICAgIHJldHVybiByZXNcbiAgICAgIC5zdGF0dXMoSHR0cFN0YXR1cy5CQURfUkVRVUVTVClcbiAgICAgIC5qc29uKHtcbiAgICAgICAgJ0Vycm9yJzogZXJyb3IuZGV0YWlsc1swXS5tZXNzYWdlXG4gICAgICB9KTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgbGV0IHJlc3VsdCwgdmFsaWRFbWFpbCA9IGZhbHNlLCB2YWxpZFBhc3N3b3JkID0gZmFsc2U7XG5cbiAgICByZXN1bHQgPSBhd2FpdCB1c2VyRGJtLmdldFVzZXJCeUVtYWlsKGVtYWlsKTtcblxuICAgIGlmKHJlc3VsdCAmJiByZXN1bHQuZW1haWwgPT0gZW1haWwpIHtcbiAgICAgIHZhbGlkRW1haWwgPSB0cnVlO1xuICAgICAgaWYoYXdhaXQgYmNyeXB0LmNvbXBhcmUocGFzc3dvcmQsIHJlc3VsdC5wYXNzd29yZCkpIHtcbiAgICAgICAgdmFsaWRQYXNzd29yZCA9IHRydWU7XG4gICAgICAgIGNvbnN0IHRva2VuID0gand0LnNpZ24oXG4gICAgICAgICAgeyB1c2VySWQ6IHJlc3VsdC5pZCB9LFxuICAgICAgICAgIHByb2Nlc3MuZW52LlNFQ1JFVF9LRVksXG4gICAgICAgICAge1xuICAgICAgICAgICAgZXhwaXJlc0luOiAnMWgnXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgIC5zdGF0dXMoSHR0cFN0YXR1cy5PSylcbiAgICAgICAgICAuanNvbih7XG4gICAgICAgICAgICAnZGF0YSc6IHtcbiAgICAgICAgICAgICAgJ21lc3NhZ2UnOiAnVXNlciBsb2dnZWQgaW4gU3VjY2Vzc2Z1bGx5JyxcbiAgICAgICAgICAgICAgJ3Rva2VuJzogdG9rZW4sXG4gICAgICAgICAgICAgICdpbmZvJzogJ1VzZSB0aGlzIHRva2VuIGZvciBBdXRoZW50aWNhdGlvbidcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZighdmFsaWRFbWFpbCkge1xuICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QpXG4gICAgICAgIC5qc29uKHtcbiAgICAgICAgICAnZGF0YSc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ0ludmFsaWQgZW1haWwnLFxuICAgICAgICAgICAgJ2luZm8nOiAnV3JvbmcgZW1haWwgdHJ5IGFnYWluISdcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmKCF2YWxpZFBhc3N3b3JkKSB7XG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoSHR0cFN0YXR1cy5CQURfUkVRVUVTVClcbiAgICAgICAgLmpzb24oe1xuICAgICAgICAgICdkYXRhJzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnSW52YWxpZCBwYXNzd29yZCcsXG4gICAgICAgICAgICAnaW5mbyc6ICdXcm9uZyBwYXNzd29yZCB0cnkgYWdhaW4hJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG4gIGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiByZXNcbiAgICAgIC5zdGF0dXMoSHR0cFN0YXR1cy5JTlRFUk5BTF9TRVJWRVJfRVJST1IpXG4gICAgICAuanNvbihlcnJvcik7XG4gIH1cbn1cblxuY29udHJvbGxlci5lZGl0VXNlclByb2ZpbGUgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgY29uc3QgeyBmdWxsbmFtZSB9ID0gcmVxLmJvZHk7XG4gIGNvbnN0IGlucHV0RGF0YSA9IHsgZnVsbG5hbWUgfTtcbiAgY29uc3QgeyBlcnJvciwgdmFsdWUgfSA9IEpvaS52YWxpZGF0ZShcbiAgICBpbnB1dERhdGEsXG4gICAgdXNlclZhbGlkYXRpb25TY2hlbWEuZWRpdFNjaGVtYVxuICApO1xuXG4gIGlmKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlc1xuICAgICAgLnN0YXR1cyhIdHRwU3RhdHVzLkJBRF9SRVFVRVNUKVxuICAgICAgLmpzb24oeyAnRXJyb3InOiBlcnJvci5kZXRhaWxzWzBdLm1lc3NhZ2UgfSk7XG4gIH1cblxuICBjb25zdCB7IHVzZXJJZCB9ID0gcmVxLnVzZXJEYXRhO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdXNlckRibS5lZGl0VXNlclByb2ZpbGUoZnVsbG5hbWUsIHVzZXJJZCk7XG4gICAgcmV0dXJuIHJlc1xuICAgICAgLnN0YXR1cyhIdHRwU3RhdHVzLkFDQ0VQVEVEKVxuICAgICAgLmpzb24oe1xuICAgICAgICAnZGF0YSc6IHtcbiAgICAgICAgICAnbWVzc2FnZSc6ICdGdWxsbmFtZSBjaGFuZ2VkJyxcbiAgICAgICAgICAnaW5mbyc6ICdQcm9maWxlIG1vZGlmaWVkJ1xuICAgICAgICB9XG4gICAgICB9KVxuICB9XG4gIGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiByZXNcbiAgICAgIC5zdGF0dXMoSHR0cFN0YXR1cy5JTlRFUk5BTF9TRVJWRVJfRVJST1IpXG4gICAgICAuanNvbihlcnJvcik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb250cm9sbGVyOyJdfQ==