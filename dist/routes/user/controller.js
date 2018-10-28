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

            if (result) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt('return', res.status(_httpStatusCodes2.default.NOT_FOUND).json({
              'data': {
                'message': 'Email not found!',
                'info': 'Register an Account'
              }
            }));

          case 12:
            if (!(result.email == email)) {
              _context2.next = 20;
              break;
            }

            validEmail = true;
            _context2.next = 16;
            return _bcryptjs2.default.compare(password, result.password);

          case 16:
            if (!_context2.sent) {
              _context2.next = 20;
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

          case 20:
            if (validEmail) {
              _context2.next = 22;
              break;
            }

            return _context2.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
              'data': {
                'message': 'Invalid email',
                'info': 'Please try again'
              }
            }));

          case 22:
            if (validPassword) {
              _context2.next = 24;
              break;
            }

            return _context2.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
              'data': {
                'message': 'Invalid password',
                'info': 'Wrong password try again!'
              }
            }));

          case 24:
            _context2.next = 29;
            break;

          case 26:
            _context2.prev = 26;
            _context2.t0 = _context2['catch'](5);
            return _context2.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json(_context2.t0));

          case 29:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[5, 26]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = controller;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvdXNlci9jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJjb250cm9sbGVyIiwicmVnaXN0ZXJVc2VyIiwicmVxIiwicmVzIiwiYm9keSIsImZ1bGxuYW1lIiwiZW1haWwiLCJwYXNzd29yZCIsImlucHV0RGF0YSIsIkpvaSIsInZhbGlkYXRlIiwidXNlclZhbGlkYXRpb25TY2hlbWEiLCJyZWdpc3RlclNjaGVtYSIsImVycm9yIiwidmFsdWUiLCJzdGF0dXMiLCJIdHRwU3RhdHVzIiwiQkFEX1JFUVVFU1QiLCJqc29uIiwiZGV0YWlscyIsIm1lc3NhZ2UiLCJyZXN1bHQiLCJ1c2VyRGJtIiwiZ2V0VXNlckJ5RW1haWwiLCJoYXNoZWRQYXNzd29yZCIsImNyZWF0ZVVzZXIiLCJDUkVBVEVEIiwiSU5URVJOQUxfU0VSVkVSX0VSUk9SIiwibG9naW5Vc2VyIiwibG9naW5TY2hlbWEiLCJ2YWxpZEVtYWlsIiwidmFsaWRQYXNzd29yZCIsIk5PVF9GT1VORCIsImJjcnlwdCIsImNvbXBhcmUiLCJ0b2tlbiIsImp3dCIsInNpZ24iLCJwcm9jZXNzIiwiZW52IiwiU0VDUkVUX0tFWSIsIk9LIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQVJBQSxRQUFRLGdCQUFSOztBQVVBLElBQU1DLGFBQWEsRUFBbkI7O0FBRUFBLFdBQVdDLFlBQVg7QUFBQSxxRUFBMEIsaUJBQU9DLEdBQVAsRUFBWUMsR0FBWjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0JBQ2NELElBQUlFLElBRGxCLEVBQ2hCQyxRQURnQixhQUNoQkEsUUFEZ0IsRUFDTkMsS0FETSxhQUNOQSxLQURNLEVBQ0NDLFFBREQsYUFDQ0EsUUFERDtBQUVsQkMscUJBRmtCLEdBRU4sRUFBRUgsa0JBQUYsRUFBWUMsWUFBWixFQUFt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QWUzQixRQUFmLEVBQXlCYyxPQUFPZCxRQUFoQyxDQWhDUTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQWlDZndCLDRCQUFnQixJQUFoQjtBQUNNSSxpQkFsQ1MsR0FrQ0RDLHVCQUFJQyxJQUFKLENBQVMsRUFBRS9CLFlBQUYsRUFBVCxFQUFvQmdDLFFBQVFDLEdBQVIsQ0FBWUMsVUFBaEMsQ0FsQ0M7QUFBQSw4Q0FvQ1JyQyxJQUNKWSxNQURJLENBQ0dDLDBCQUFXeUIsRUFEZCxFQUVKdkIsSUFGSSxDQUVDO0FBQ0osc0JBQVE7QUFDTiwyQkFBVyw2QkFETDtBQUVOLHlCQUFTaUIsS0FGSDtBQUdOLHdCQUFRO0FBSEY7QUFESixhQUZELENBcENROztBQUFBO0FBQUEsZ0JBZ0RmTCxVQWhEZTtBQUFBO0FBQUE7QUFBQTs7QUFBQSw4Q0FpRFYzQixJQUNKWSxNQURJLENBQ0dDLDBCQUFXQyxXQURkLEVBRUpDLElBRkksQ0FFQztBQUNKLHNCQUFRO0FBQ04sMkJBQVcsZUFETDtBQUVOLHdCQUFRO0FBRkY7QUFESixhQUZELENBakRVOztBQUFBO0FBQUEsZ0JBMkRmYSxhQTNEZTtBQUFBO0FBQUE7QUFBQTs7QUFBQSw4Q0E0RFY1QixJQUNKWSxNQURJLENBQ0dDLDBCQUFXQyxXQURkLEVBRUpDLElBRkksQ0FFQztBQUNKLHNCQUFRO0FBQ04sMkJBQVcsa0JBREw7QUFFTix3QkFBUTtBQUZGO0FBREosYUFGRCxDQTVEVTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUEsOENBdUVaZixJQUNKWSxNQURJLENBQ0dDLDBCQUFXVyxxQkFEZCxFQUVKVCxJQUZJLGNBdkVZOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQXZCOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQTZFQXdCLE9BQU9DLE9BQVAsR0FBaUIzQyxVQUFqQiIsImZpbGUiOiJjb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZShcImJhYmVsLXBvbHlmaWxsXCIpO1xuXG5pbXBvcnQgSm9pIGZyb20gJ2pvaSc7XG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdGpzJztcbmltcG9ydCBIdHRwU3RhdHVzIGZyb20gJ2h0dHAtc3RhdHVzLWNvZGVzJztcbmltcG9ydCB7IHVzZXJWYWxpZGF0aW9uU2NoZW1hIH0gZnJvbSAnLi4vLi4vc2NoZW1hX3ZhbGlkYXRpb25zJztcbmltcG9ydCB7IHVzZXJEYm0gfSBmcm9tICcuLi8uLi9kYi9kYk1hbmlwdWxhdGlvbkxheWVyJztcbmltcG9ydCBoYXNoUGFzc3dvcmQgZnJvbSAnLi9oYXNoUGFzc3dvcmQnO1xuaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nO1xuXG5jb25zdCBjb250cm9sbGVyID0ge307XG5cbmNvbnRyb2xsZXIucmVnaXN0ZXJVc2VyID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIGNvbnN0IHsgZnVsbG5hbWUsIGVtYWlsLCBwYXNzd29yZCB9ID0gcmVxLmJvZHk7XG4gIGNvbnN0IGlucHV0RGF0YSA9IHsgZnVsbG5hbWUsIGVtYWlsLCBwYXNzd29yZCB9O1xuICBjb25zdCB7IGVycm9yLCB2YWx1ZSB9ID0gSm9pLnZhbGlkYXRlKFxuICAgIGlucHV0RGF0YSxcbiAgICB1c2VyVmFsaWRhdGlvblNjaGVtYS5yZWdpc3RlclNjaGVtYVxuICApO1xuXG4gIGlmKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlc1xuICAgICAgLnN0YXR1cyhIdHRwU3RhdHVzLkJBRF9SRVFVRVNUKVxuICAgICAgLmpzb24oeyAnRXJyb3InOiBlcnJvci5kZXRhaWxzWzBdLm1lc3NhZ2UgfSk7XG4gIH1cblxuICB0cnkge1xuICAgIGxldCByZXN1bHQ7XG5cbiAgICByZXN1bHQgPSBhd2FpdCB1c2VyRGJtLmdldFVzZXJCeUVtYWlsKGVtYWlsKTtcblxuICAgIGlmKHJlc3VsdCAmJiByZXN1bHQuZW1haWwgPT0gZW1haWwpIHtcbiAgICAgIHJldHVybiByZXNcbiAgICAgICAgLnN0YXR1cyhIdHRwU3RhdHVzLkJBRF9SRVFVRVNUKVxuICAgICAgICAuanNvbih7ICdFcnJvcic6ICdFbWFpbCBhbHJlYWR5IHJlZ2lzdGVyZWQnIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGhhc2hlZFBhc3N3b3JkID0gYXdhaXQgaGFzaFBhc3N3b3JkKHBhc3N3b3JkKTtcblxuICAgIHJlc3VsdCA9IGF3YWl0IHVzZXJEYm0uY3JlYXRlVXNlcihmdWxsbmFtZSwgZW1haWwsIGhhc2hlZFBhc3N3b3JkKTtcblxuICAgIHJldHVybiByZXNcbiAgICAgIC5zdGF0dXMoSHR0cFN0YXR1cy5DUkVBVEVEKVxuICAgICAgLmpzb24oe1xuICAgICAgICAnZGF0YSc6XG4gICAgICAgICAgeyAnbWVzc2FnZSc6ICdVc2VyIGNyZWF0ZWQgU3VjY2Vzc2Z1bGx5JyxcbiAgICAgICAgICAgICd1c2VySWQnOiByZXN1bHRcbiAgICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiByZXNcbiAgICAgIC5zdGF0dXMoSHR0cFN0YXR1cy5JTlRFUk5BTF9TRVJWRVJfRVJST1IpXG4gICAgICAuanNvbihlcnJvcik7XG4gIH1cbn1cblxuY29udHJvbGxlci5sb2dpblVzZXIgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQgfSA9IHJlcS5ib2R5O1xuICBjb25zdCBpbnB1dERhdGEgPSB7IGVtYWlsLCBwYXNzd29yZCB9O1xuICBjb25zdCB7IGVycm9yLCB2YWx1ZSB9ID0gSm9pLnZhbGlkYXRlKFxuICAgIGlucHV0RGF0YSxcbiAgICB1c2VyVmFsaWRhdGlvblNjaGVtYS5sb2dpblNjaGVtYVxuICApO1xuXG4gIGlmKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlc1xuICAgICAgLnN0YXR1cyhIdHRwU3RhdHVzLkJBRF9SRVFVRVNUKVxuICAgICAgLmpzb24oeyAnRXJyb3InOiBlcnJvci5kZXRhaWxzWzBdLm1lc3NhZ2UgfSk7XG4gIH1cblxuICB0cnkge1xuICAgIGxldCByZXN1bHQsIHZhbGlkRW1haWwgPSBmYWxzZSwgdmFsaWRQYXNzd29yZCA9IGZhbHNlO1xuXG4gICAgcmVzdWx0ID0gYXdhaXQgdXNlckRibS5nZXRVc2VyQnlFbWFpbChlbWFpbCk7XG5cbiAgICBpZighcmVzdWx0KSB7XG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoSHR0cFN0YXR1cy5OT1RfRk9VTkQpXG4gICAgICAgIC5qc29uKHtcbiAgICAgICAgICAnZGF0YSc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ0VtYWlsIG5vdCBmb3VuZCEnLFxuICAgICAgICAgICAgJ2luZm8nOiAnUmVnaXN0ZXIgYW4gQWNjb3VudCdcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmKHJlc3VsdC5lbWFpbCA9PSBlbWFpbCkge1xuICAgICAgdmFsaWRFbWFpbCA9IHRydWU7XG4gICAgICBpZihhd2FpdCBiY3J5cHQuY29tcGFyZShwYXNzd29yZCwgcmVzdWx0LnBhc3N3b3JkKSkge1xuICAgICAgICB2YWxpZFBhc3N3b3JkID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBqd3Quc2lnbih7IGVtYWlsIH0sIHByb2Nlc3MuZW52LlNFQ1JFVF9LRVkpO1xuXG4gICAgICAgIHJldHVybiByZXNcbiAgICAgICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuT0spXG4gICAgICAgICAgLmpzb24oe1xuICAgICAgICAgICAgJ2RhdGEnOiB7XG4gICAgICAgICAgICAgICdtZXNzYWdlJzogJ1VzZXIgbG9nZ2VkIGluIFN1Y2Nlc3NmdWxseScsXG4gICAgICAgICAgICAgICd0b2tlbic6IHRva2VuLFxuICAgICAgICAgICAgICAnaW5mbyc6ICdVc2UgdGhpcyB0b2tlbiBmb3IgQXV0aGVudGljYXRpb24nXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoIXZhbGlkRW1haWwpIHtcbiAgICAgIHJldHVybiByZXNcbiAgICAgICAgLnN0YXR1cyhIdHRwU3RhdHVzLkJBRF9SRVFVRVNUKVxuICAgICAgICAuanNvbih7XG4gICAgICAgICAgJ2RhdGEnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdJbnZhbGlkIGVtYWlsJyxcbiAgICAgICAgICAgICdpbmZvJzogJ1BsZWFzZSB0cnkgYWdhaW4nXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZighdmFsaWRQYXNzd29yZCkge1xuICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QpXG4gICAgICAgIC5qc29uKHtcbiAgICAgICAgICAnZGF0YSc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ0ludmFsaWQgcGFzc3dvcmQnLFxuICAgICAgICAgICAgJ2luZm8nOiAnV3JvbmcgcGFzc3dvcmQgdHJ5IGFnYWluISdcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzXG4gICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SKVxuICAgICAgLmpzb24oZXJyb3IpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29udHJvbGxlcjsiXX0=