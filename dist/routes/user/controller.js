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
            return _dbManipulationLayer.userDbm.getUserByEmail();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvdXNlci9jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJjb250cm9sbGVyIiwicmVnaXN0ZXJVc2VyIiwicmVxIiwicmVzIiwiYm9keSIsImZ1bGxuYW1lIiwiZW1haWwiLCJwYXNzd29yZCIsImlucHV0RGF0YSIsIkpvaSIsInZhbGlkYXRlIiwidXNlclZhbGlkYXRpb25TY2hlbWEiLCJyZWdpc3RlclNjaGVtYSIsImVycm9yIiwidmFsdWUiLCJzdGF0dXMiLCJIdHRwU3RhdHVzIiwiQkFEX1JFUVVFU1QiLCJqc29uIiwiZGV0YWlscyIsIm1lc3NhZ2UiLCJyZXN1bHQiLCJ1c2VyRGJtIiwiZ2V0VXNlckJ5RW1haWwiLCJoYXNoZWRQYXNzd29yZCIsImNyZWF0ZVVzZXIiLCJDUkVBVEVEIiwiaWQiLCJJTlRFUk5BTF9TRVJWRVJfRVJST1IiLCJsb2dpblVzZXIiLCJsb2dpblNjaGVtYSIsInZhbGlkRW1haWwiLCJ2YWxpZFBhc3N3b3JkIiwiYmNyeXB0IiwiY29tcGFyZSIsInRva2VuIiwiand0Iiwic2lnbiIsInVzZXJJZCIsInByb2Nlc3MiLCJlbnYiLCJTRUNSRVRfS0VZIiwiZXhwaXJlc0luIiwiT0siLCJlZGl0VXNlclByb2ZpbGUiLCJlZGl0U2NoZW1hIiwidXNlckRhdGEiLCJBQ0NFUFRFRCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFSQUEsUUFBUSxnQkFBUjs7QUFVQSxJQUFNQyxhQUFhLEVBQW5COztBQUVBQSxXQUFXQyxZQUFYO0FBQUEscUVBQTBCLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVo7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdCQUNjRCxJQUFJRSxJQURsQixFQUNoQkMsUUFEZ0IsYUFDaEJBLFFBRGdCLEVBQ05DLEtBRE0sYUFDTkEsS0FETSxF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R0FFVCxFQUFFSCxrQkFBRixFQUZTO0FBQUEsNkJBR0ZJLGNBQUlDLFFBQUosQ0FDdkJGLFNBRHVCLEVBRXZCRyx5Q0FBcUJrQyxVQUZFLENBSEUsRUFHbkJoQyxLQUhtQixrQkFHbkJBLEtBSG1CLEVBR1pDLEtBSFksa0JBR1pBLEtBSFk7O0FBQUEsaUJBUXhCRCxLQVJ3QjtBQUFBO0FBQUE7QUFBQTs7QUFBQSw4Q0FTbEJWLElBQ0pZLE1BREksQ0FDR0MsMEJBQVdDLFdBRGQsRUFFSkMsSUFGSSxDQUVDLEVBQUUsU0FBU0wsTUFBTU0sT0FBTixDQUFjLENBQWQsRUFBaUJDLE9BQTVCLEVBRkQsQ0FUa0I7O0FBQUE7QUFjbkJrQixrQkFkbUIsR0FjUnBDLElBQUk0QyxRQWRJLENBY25CUixNQWRtQjtBQUFBO0FBQUE7QUFBQSxtQkFpQkpoQiw2QkFBUXNCLGVBQVIsQ0FBd0J2QyxRQUF4QixFQUFrQ2lDLE1BQWxDLENBakJJOztBQUFBO0FBaUJuQmpCLGtCQWpCbUI7QUFBQSw4Q0FrQmxCbEIsSUFDSlksTUFESSxDQUNHQywwQkFBVytCLFFBRGQsRUFFSjdCLElBRkksQ0FFQztBQUNKLHNCQUFRO0FBQ04sMkJBQVcsa0JBREw7QUFFTix3QkFBUTtBQUZGO0FBREosYUFGRCxDQWxCa0I7O0FBQUE7QUFBQTtBQUFBO0FBQUEsOENBNEJsQmYsSUFDSlksTUFESSxDQUNHQywwQkFBV1kscUJBRGQsRUFFSlYsSUFGSSxjQTVCa0I7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBN0I7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBa0NBOEIsT0FBT0MsT0FBUCxHQUFpQmpELFVBQWpCIiwiZmlsZSI6ImNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKFwiYmFiZWwtcG9seWZpbGxcIik7XG5cbmltcG9ydCBKb2kgZnJvbSAnam9pJztcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0anMnO1xuaW1wb3J0IEh0dHBTdGF0dXMgZnJvbSAnaHR0cC1zdGF0dXMtY29kZXMnO1xuaW1wb3J0IHsgdXNlclZhbGlkYXRpb25TY2hlbWEgfSBmcm9tICcuLi8uLi9zY2hlbWFfdmFsaWRhdGlvbnMnO1xuaW1wb3J0IHsgdXNlckRibSB9IGZyb20gJy4uLy4uL2RiL2RiTWFuaXB1bGF0aW9uTGF5ZXInO1xuaW1wb3J0IGhhc2hQYXNzd29yZCBmcm9tICcuL2hhc2hQYXNzd29yZCc7XG5pbXBvcnQgand0IGZyb20gJ2pzb253ZWJ0b2tlbic7XG5cbmNvbnN0IGNvbnRyb2xsZXIgPSB7fTtcblxuY29udHJvbGxlci5yZWdpc3RlclVzZXIgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgY29uc3QgeyBmdWxsbmFtZSwgZW1haWwsIHBhc3N3b3JkIH0gPSByZXEuYm9keTtcbiAgY29uc3QgaW5wdXREYXRhID0geyBmdWxsbmFtZSwgZW1haWwsIHBhc3N3b3JkIH07XG4gIGNvbnN0IHsgZXJyb3IsIHZhbHVlIH0gPSBKb2kudmFsaWRhdGUoXG4gICAgaW5wdXREYXRhLFxuICAgIHVzZXJWYWxpZGF0aW9uU2NoZW1hLnJlZ2lzdGVyU2NoZW1hXG4gICk7XG5cbiAgaWYoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzXG4gICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QpXG4gICAgICAuanNvbih7XG4gICAgICAgICdFcnJvcic6IGVycm9yLmRldGFpbHNbMF0ubWVzc2FnZVxuICAgICAgfSk7XG4gIH1cblxuICB0cnkge1xuICAgIGxldCByZXN1bHQ7XG5cbiAgICByZXN1bHQgPSBhd2FpdCB1c2VyRGJtLmdldFVzZXJCeUVtYWlsKCk7XG5cbiAgICBpZihyZXN1bHQgJiYgcmVzdWx0LmVtYWlsID09IGVtYWlsKSB7XG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoSHR0cFN0YXR1cy5CQURfUkVRVUVTVClcbiAgICAgICAgLmpzb24oe1xuICAgICAgICAgICdFcnJvcic6ICdFbWFpbCBhbHJlYWR5IHJlZ2lzdGVyZWQnXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGhhc2hlZFBhc3N3b3JkID0gYXdhaXQgaGFzaFBhc3N3b3JkKHBhc3N3b3JkKTtcblxuICAgIHJlc3VsdCA9IGF3YWl0IHVzZXJEYm0uY3JlYXRlVXNlcihmdWxsbmFtZSwgZW1haWwsIGhhc2hlZFBhc3N3b3JkKTtcblxuICAgIHJldHVybiByZXNcbiAgICAgIC5zdGF0dXMoSHR0cFN0YXR1cy5DUkVBVEVEKVxuICAgICAgLmpzb24oe1xuICAgICAgICAnZGF0YSc6XG4gICAgICAgICAgeyAnbWVzc2FnZSc6ICdVc2VyIGNyZWF0ZWQgU3VjY2Vzc2Z1bGx5JyxcbiAgICAgICAgICAgICd1c2VySWQnOiByZXN1bHQuaWQsXG4gICAgICAgICAgICAnaW5mbyc6ICdZb3UgY2FuIGxvZ2luIG5vdydcbiAgICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiByZXNcbiAgICAgIC5zdGF0dXMoSHR0cFN0YXR1cy5JTlRFUk5BTF9TRVJWRVJfRVJST1IpXG4gICAgICAuanNvbihlcnJvcik7XG4gIH1cbn1cblxuY29udHJvbGxlci5sb2dpblVzZXIgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQgfSA9IHJlcS5ib2R5O1xuICBjb25zdCBpbnB1dERhdGEgPSB7IGVtYWlsLCBwYXNzd29yZCB9O1xuICBjb25zdCB7IGVycm9yLCB2YWx1ZSB9ID0gSm9pLnZhbGlkYXRlKFxuICAgIGlucHV0RGF0YSxcbiAgICB1c2VyVmFsaWRhdGlvblNjaGVtYS5sb2dpblNjaGVtYVxuICApO1xuXG4gIGlmKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlc1xuICAgICAgLnN0YXR1cyhIdHRwU3RhdHVzLkJBRF9SRVFVRVNUKVxuICAgICAgLmpzb24oe1xuICAgICAgICAnRXJyb3InOiBlcnJvci5kZXRhaWxzWzBdLm1lc3NhZ2VcbiAgICAgIH0pO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBsZXQgcmVzdWx0LCB2YWxpZEVtYWlsID0gZmFsc2UsIHZhbGlkUGFzc3dvcmQgPSBmYWxzZTtcblxuICAgIHJlc3VsdCA9IGF3YWl0IHVzZXJEYm0uZ2V0VXNlckJ5RW1haWwoZW1haWwpO1xuXG4gICAgaWYocmVzdWx0ICYmIHJlc3VsdC5lbWFpbCA9PSBlbWFpbCkge1xuICAgICAgdmFsaWRFbWFpbCA9IHRydWU7XG4gICAgICBpZihhd2FpdCBiY3J5cHQuY29tcGFyZShwYXNzd29yZCwgcmVzdWx0LnBhc3N3b3JkKSkge1xuICAgICAgICB2YWxpZFBhc3N3b3JkID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBqd3Quc2lnbihcbiAgICAgICAgICB7IHVzZXJJZDogcmVzdWx0LmlkIH0sXG4gICAgICAgICAgcHJvY2Vzcy5lbnYuU0VDUkVUX0tFWSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBleHBpcmVzSW46ICcxaCdcbiAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgICAgLnN0YXR1cyhIdHRwU3RhdHVzLk9LKVxuICAgICAgICAgIC5qc29uKHtcbiAgICAgICAgICAgICdkYXRhJzoge1xuICAgICAgICAgICAgICAnbWVzc2FnZSc6ICdVc2VyIGxvZ2dlZCBpbiBTdWNjZXNzZnVsbHknLFxuICAgICAgICAgICAgICAndG9rZW4nOiB0b2tlbixcbiAgICAgICAgICAgICAgJ2luZm8nOiAnVXNlIHRoaXMgdG9rZW4gZm9yIEF1dGhlbnRpY2F0aW9uJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKCF2YWxpZEVtYWlsKSB7XG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoSHR0cFN0YXR1cy5CQURfUkVRVUVTVClcbiAgICAgICAgLmpzb24oe1xuICAgICAgICAgICdkYXRhJzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnSW52YWxpZCBlbWFpbCcsXG4gICAgICAgICAgICAnaW5mbyc6ICdXcm9uZyBlbWFpbCB0cnkgYWdhaW4hJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYoIXZhbGlkUGFzc3dvcmQpIHtcbiAgICAgIHJldHVybiByZXNcbiAgICAgICAgLnN0YXR1cyhIdHRwU3RhdHVzLkJBRF9SRVFVRVNUKVxuICAgICAgICAuanNvbih7XG4gICAgICAgICAgJ2RhdGEnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdJbnZhbGlkIHBhc3N3b3JkJyxcbiAgICAgICAgICAgICdpbmZvJzogJ1dyb25nIHBhc3N3b3JkIHRyeSBhZ2FpbiEnXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gIH1cbiAgY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlc1xuICAgICAgLnN0YXR1cyhIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUilcbiAgICAgIC5qc29uKGVycm9yKTtcbiAgfVxufVxuXG5jb250cm9sbGVyLmVkaXRVc2VyUHJvZmlsZSA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICBjb25zdCB7IGZ1bGxuYW1lIH0gPSByZXEuYm9keTtcbiAgY29uc3QgaW5wdXREYXRhID0geyBmdWxsbmFtZSB9O1xuICBjb25zdCB7IGVycm9yLCB2YWx1ZSB9ID0gSm9pLnZhbGlkYXRlKFxuICAgIGlucHV0RGF0YSxcbiAgICB1c2VyVmFsaWRhdGlvblNjaGVtYS5lZGl0U2NoZW1hXG4gICk7XG5cbiAgaWYoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzXG4gICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QpXG4gICAgICAuanNvbih7ICdFcnJvcic6IGVycm9yLmRldGFpbHNbMF0ubWVzc2FnZSB9KTtcbiAgfVxuXG4gIGNvbnN0IHsgdXNlcklkIH0gPSByZXEudXNlckRhdGE7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB1c2VyRGJtLmVkaXRVc2VyUHJvZmlsZShmdWxsbmFtZSwgdXNlcklkKTtcbiAgICByZXR1cm4gcmVzXG4gICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuQUNDRVBURUQpXG4gICAgICAuanNvbih7XG4gICAgICAgICdkYXRhJzoge1xuICAgICAgICAgICdtZXNzYWdlJzogJ0Z1bGxuYW1lIGNoYW5nZWQnLFxuICAgICAgICAgICdpbmZvJzogJ1Byb2ZpbGUgbW9kaWZpZWQnXG4gICAgICAgIH1cbiAgICAgIH0pXG4gIH1cbiAgY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlc1xuICAgICAgLnN0YXR1cyhIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUilcbiAgICAgIC5qc29uKGVycm9yKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnRyb2xsZXI7Il19