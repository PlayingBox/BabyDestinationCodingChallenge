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
            return _context.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json(_context.t0));

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
            return _context2.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json(_context2.t0));

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

            console.log('error', _context3.t0);
            return _context3.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json(_context3.t0));

          case 17:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvdXNlci9jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJjb250cm9sbGVyIiwicmVnaXN0ZXJVc2VyIiwicmVxIiwicmVzIiwiYm9keSIsImZ1bGxuYW1lIiwiZW1haWwiLCJwYXNzd29yZCIsImlucHV0RGF0YSIsIkpvaSIsInZhbGlkYXRlIiwidXNlclZhbGlkYXRpb25TY2hlbWEiLCJyZWdpc3RlclNjaGVtYSIsImVycm9yIiwidmFsdWUiLCJzdGF0dXMiLCJIdHRwU3RhdHVzIiwiQkFEX1JFUVVFU1QiLCJqc29uIiwiZGV0YWlscyIsIm1lc3NhZ2UiLCJyZXN1bHQiLCJ1c2VyRGJtIiwiZ2V0VXNlckJ5RW1haWwiLCJoYXNoZWRQYXNzd29yZCIsImNyZWF0ZVVzZXIiLCJDUkVBVEVEIiwiaWQiLCJsb2dpblVzZXIiLCJsb2dpblNjaGVtYSIsInZhbGlkRW1haWwiLCJ2YWxpZFBhc3N3b3JkIiwiYmNyeXB0IiwiY29tcGFyZSIsInRva2VuIiwiand0Iiwic2lnbiIsInVzZXJJZCIsInByb2Nlc3MiLCJlbnYiLCJTRUNSRVRfS0VZIiwiZXhwaXJlc0luIiwiT0siLCJlZGl0VXNlclByb2ZpbGUiLCJlZGl0U2NoZW1hIiwidXNlckRhdGEiLCJBQ0NFUFRFRCIsImNvbnNvbGUiLCJsb2ciLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBUkFBLFFBQVEsZ0JBQVI7O0FBVUEsSUFBTUMsYUFBYSxFQUFuQjs7QUFFQUEsV0FBV0MsWUFBWDtBQUFBLHFFQUEwQixpQkFBT0MsR0FBUCxFQUFZQyxHQUFaO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3QkFDY0QsSUFBSUUsSUFEbEIsRUFDaEJDLFFBRGdCLGFBQ2hCQSxRQURnQixFQUNOQyxLQURNLGFBQ05BLEtBRE0sRUFDQ0MsUUFERCxhQUNDQSxRQUREO0FBRWxCQyxxQkFGa0IsR0FFTixFQUFFSCxrQkFBRixFQUFZQyxZQUFaLEVBQW1CQyxrQkFBbkIsRUFGTTtBQUFBLDRCQUdDRSxjQUFJQyxRQUFKLENBQ3ZCRixTQUR1QixFQUV2QkcseUNBQXFCQyxjQUZFLENBSEQsRUFHaEJDLEtBSGdCLGlCQUdoQkEsS0FIZ0IsRUFHVEMsS0FIUyxpQkFHVEEsS0FIUzs7QUFBQSxpQkFRckJELEtBUnFCO0FBQUE7QUFBQTtBQUFBOztBQUFBLDZDQVNmVixJQUNKWSxNQURJLENBQ0dDLDBCQUFXQyxXQURkLEVBRUpDLElBRkksQ0FFQztBQUNKLHVCQUFTTCxNQUFNTSxPQUFOLENBQWMsQ0FBZCxFQUFpQkM7QUFEdEIsYUFGRCxDQVRlOztBQUFBO0FBQUE7QUFpQmxCQyxrQkFqQmtCO0FBQUE7QUFBQSxtQkFtQlBDLDZCQUFRQyxjQUFSLENBQXVCakIsS0FBdkIsQ0FuQk87O0FBQUE7QUFtQnRCZSxrQkFuQnNCOztBQUFBLGtCQXFCbkJBLFVBQVVBLE9BQU9mLEtBQVAsSUFBZ0JBLEtBckJQO0FBQUE7QUFBQTtBQUFBOztBQUFBLDZDQXNCYkgsSUFDSlksTUFESSxDQUNHQywwQkFBV0MsV0FEZCxFQUVKQyxJQUZJLENBRUM7QUFDSix1QkFBUztBQURMLGFBRkQsQ0F0QmE7O0FBQUE7QUFBQTtBQUFBLG1CQTZCTyw0QkFBYVgsUUFBYixDQTdCUDs7QUFBQTtBQTZCaEJpQiwwQkE3QmdCO0FBQUE7QUFBQSxtQkErQlBGLDZCQUFRRyxVQUFSLENBQW1CcEIsUUFBbkIsRUFBNkJDLEtBQTdCLEVBQW9Da0IsY0FBcEMsQ0EvQk87O0FBQUE7QUErQnRCSCxrQkEvQnNCO0FBQUEsNkNBaUNmbEIsSUFDSlksTUFESSxDQUNHQywwQkFBV1UsT0FEZCxFQUVKUixJQUZJLENBRUM7QUFDSixzQkFDRSxFQUFFLFdBQVcsMkJBQWI7QUFDRSwwQkFBVUcsT0FBT00sRUFEbkI7QUFFRSx3QkFBUTtBQUZWO0FBRkUsYUFGRCxDQWpDZTs7QUFBQTtBQUFBO0FBQUE7QUFBQSw2Q0E2Q2Z4QixJQUNKWSxNQURJLENBQ0dDLDBCQUFXQyxXQURkLEVBRUpDLElBRkksYUE3Q2U7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBMUI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBbURBbEIsV0FBVzRCLFNBQVg7QUFBQSxzRUFBdUIsa0JBQU8xQixHQUFQLEVBQVlDLEdBQVo7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUNPRCxJQUFJRSxJQURYLEVBQ2JFLEtBRGEsY0FDYkEsS0FEYSxFQUNOQyxRQURNLGNBQ05BLFFBRE07QUFFZkMscUJBRmUsR0FFSCxFQUFFRixZQUFGLEVBQVNDLGtCQUFULEVBRkc7QUFBQSw2QkFHSUUsY0FBSUMsUUFBSixDQUN2QkYsU0FEdUIsRUFFdkJHLHlDQUFxQmtCLFdBRkUsQ0FISixFQUdiaEIsS0FIYSxrQkFHYkEsS0FIYSxFQUdOQyxLQUhNLGtCQUdOQSxLQUhNOztBQUFBLGlCQVFsQkQsS0FSa0I7QUFBQTtBQUFBO0FBQUE7O0FBQUEsOENBU1pWLElBQ0pZLE1BREksQ0FDR0MsMEJBQVdDLFdBRGQsRUFFSkMsSUFGSSxDQUVDO0FBQ0osdUJBQVNMLE1BQU1NLE9BQU4sQ0FBYyxDQUFkLEVBQWlCQztBQUR0QixhQUZELENBVFk7O0FBQUE7QUFBQTtBQWlCZkMsa0JBakJlLFdBaUJQUyxVQWpCTyxHQWlCTSxLQWpCTixFQWlCYUMsYUFqQmIsR0FpQjZCLEtBakI3QjtBQUFBO0FBQUEsbUJBbUJKVCw2QkFBUUMsY0FBUixDQUF1QmpCLEtBQXZCLENBbkJJOztBQUFBO0FBbUJuQmUsa0JBbkJtQjs7QUFBQSxrQkFxQmhCQSxVQUFVQSxPQUFPZixLQUFQLElBQWdCQSxLQXJCVjtBQUFBO0FBQUE7QUFBQTs7QUFzQmpCd0IseUJBQWEsSUFBYjtBQXRCaUI7QUFBQSxtQkF1QlJFLG1CQUFPQyxPQUFQLENBQWUxQixRQUFmLEVBQXlCYyxPQUFPZCxRQUFoQyxDQXZCUTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQXdCZndCLDRCQUFnQixJQUFoQjtBQUNNRyxpQkF6QlMsR0F5QkRDLHVCQUFJQyxJQUFKLENBQ1osRUFBRUMsUUFBUWhCLE9BQU9NLEVBQWpCLEVBRFksRUFFWlcsUUFBUUMsR0FBUixDQUFZQyxVQUZBLEVBR1o7QUFDRUMseUJBQVc7QUFEYixhQUhZLENBekJDO0FBQUEsOENBZ0NSdEMsSUFDSlksTUFESSxDQUNHQywwQkFBVzBCLEVBRGQsRUFFSnhCLElBRkksQ0FFQztBQUNKLHNCQUFRO0FBQ04sMkJBQVcsNkJBREw7QUFFTix5QkFBU2dCLEtBRkg7QUFHTix3QkFBUTtBQUhGO0FBREosYUFGRCxDQWhDUTs7QUFBQTtBQUFBLGdCQTRDZkosVUE1Q2U7QUFBQTtBQUFBO0FBQUE7O0FBQUEsOENBNkNWM0IsSUFDSlksTUFESSxDQUNHQywwQkFBV0MsV0FEZCxFQUVKQyxJQUZJLENBRUM7QUFDSixzQkFBUTtBQUNOLDJCQUFXLGVBREw7QUFFTix3QkFBUTtBQUZGO0FBREosYUFGRCxDQTdDVTs7QUFBQTtBQUFBLGdCQXVEZmEsYUF2RGU7QUFBQTtBQUFBO0FBQUE7O0FBQUEsOENBd0RWNUIsSUFDSlksTUFESSxDQUNHQywwQkFBV0MsV0FEZCxFQUVKQyxJQUZJLENBRUM7QUFDSixzQkFBUTtBQUNOLDJCQUFXLGtCQURMO0FBRU4sd0JBQVE7QUFGRjtBQURKLGFBRkQsQ0F4RFU7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBLDhDQW1FWmYsSUFDSlksTUFESSxDQUNHQywwQkFBV0MsV0FEZCxFQUVKQyxJQUZJLGNBbkVZOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQXZCOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQXlFQWxCLFdBQVcyQyxlQUFYO0FBQUEsc0VBQTZCLGtCQUFPekMsR0FBUCxFQUFZQyxHQUFaO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDbkJFLG9CQURtQixHQUNOSCxJQUFJRSxJQURFLENBQ25CQyxRQURtQjtBQUVyQkcscUJBRnFCLEdBRVQsRUFBRUgsa0JBQUYsRUFGUztBQUFBLDZCQUdGSSxjQUFJQyxRQUFKLENBQ3ZCRixTQUR1QixFQUV2QkcseUNBQXFCaUMsVUFGRSxDQUhFLEVBR25CL0IsS0FIbUIsa0JBR25CQSxLQUhtQixFQUdaQyxLQUhZLGtCQUdaQSxLQUhZOztBQUFBLGlCQVF4QkQsS0FSd0I7QUFBQTtBQUFBO0FBQUE7O0FBQUEsOENBU2xCVixJQUNKWSxNQURJLENBQ0dDLDBCQUFXQyxXQURkLEVBRUpDLElBRkksQ0FFQyxFQUFFLFNBQVNMLE1BQU1NLE9BQU4sQ0FBYyxDQUFkLEVBQWlCQyxPQUE1QixFQUZELENBVGtCOztBQUFBO0FBY25CaUIsa0JBZG1CLEdBY1JuQyxJQUFJMkMsUUFkSSxDQWNuQlIsTUFkbUI7QUFBQTtBQUFBO0FBQUEsbUJBaUJKZiw2QkFBUXFCLGVBQVIsQ0FBd0J0QyxRQUF4QixFQUFrQ2dDLE1BQWxDLENBakJJOztBQUFBO0FBaUJuQmhCLGtCQWpCbUI7QUFBQSw4Q0FrQmxCbEIsSUFDSlksTUFESSxDQUNHQywwQkFBVzhCLFFBRGQsRUFFSjVCLElBRkksQ0FFQztBQUNKLHNCQUFRO0FBQ04sMkJBQVcsa0JBREw7QUFFTix3QkFBUTtBQUZGO0FBREosYUFGRCxDQWxCa0I7O0FBQUE7QUFBQTtBQUFBOztBQTRCekI2QixvQkFBUUMsR0FBUixDQUFZLE9BQVo7QUE1QnlCLDhDQTZCbEI3QyxJQUNKWSxNQURJLENBQ0dDLDBCQUFXQyxXQURkLEVBRUpDLElBRkksY0E3QmtCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQTdCOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQW1DQStCLE9BQU9DLE9BQVAsR0FBaUJsRCxVQUFqQiIsImZpbGUiOiJjb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZShcImJhYmVsLXBvbHlmaWxsXCIpO1xuXG5pbXBvcnQgSm9pIGZyb20gJ2pvaSc7XG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdGpzJztcbmltcG9ydCBIdHRwU3RhdHVzIGZyb20gJ2h0dHAtc3RhdHVzLWNvZGVzJztcbmltcG9ydCB7IHVzZXJWYWxpZGF0aW9uU2NoZW1hIH0gZnJvbSAnLi4vLi4vc2NoZW1hX3ZhbGlkYXRpb25zJztcbmltcG9ydCB7IHVzZXJEYm0gfSBmcm9tICcuLi8uLi9kYi9kYk1hbmlwdWxhdGlvbkxheWVyJztcbmltcG9ydCBoYXNoUGFzc3dvcmQgZnJvbSAnLi9oYXNoUGFzc3dvcmQnO1xuaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nO1xuXG5jb25zdCBjb250cm9sbGVyID0ge307XG5cbmNvbnRyb2xsZXIucmVnaXN0ZXJVc2VyID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIGNvbnN0IHsgZnVsbG5hbWUsIGVtYWlsLCBwYXNzd29yZCB9ID0gcmVxLmJvZHk7XG4gIGNvbnN0IGlucHV0RGF0YSA9IHsgZnVsbG5hbWUsIGVtYWlsLCBwYXNzd29yZCB9O1xuICBjb25zdCB7IGVycm9yLCB2YWx1ZSB9ID0gSm9pLnZhbGlkYXRlKFxuICAgIGlucHV0RGF0YSxcbiAgICB1c2VyVmFsaWRhdGlvblNjaGVtYS5yZWdpc3RlclNjaGVtYVxuICApO1xuXG4gIGlmKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlc1xuICAgICAgLnN0YXR1cyhIdHRwU3RhdHVzLkJBRF9SRVFVRVNUKVxuICAgICAgLmpzb24oe1xuICAgICAgICAnRXJyb3InOiBlcnJvci5kZXRhaWxzWzBdLm1lc3NhZ2VcbiAgICAgIH0pO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBsZXQgcmVzdWx0O1xuXG4gICAgcmVzdWx0ID0gYXdhaXQgdXNlckRibS5nZXRVc2VyQnlFbWFpbChlbWFpbCk7XG5cbiAgICBpZihyZXN1bHQgJiYgcmVzdWx0LmVtYWlsID09IGVtYWlsKSB7XG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoSHR0cFN0YXR1cy5CQURfUkVRVUVTVClcbiAgICAgICAgLmpzb24oe1xuICAgICAgICAgICdFcnJvcic6ICdFbWFpbCBhbHJlYWR5IHJlZ2lzdGVyZWQnXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGhhc2hlZFBhc3N3b3JkID0gYXdhaXQgaGFzaFBhc3N3b3JkKHBhc3N3b3JkKTtcblxuICAgIHJlc3VsdCA9IGF3YWl0IHVzZXJEYm0uY3JlYXRlVXNlcihmdWxsbmFtZSwgZW1haWwsIGhhc2hlZFBhc3N3b3JkKTtcblxuICAgIHJldHVybiByZXNcbiAgICAgIC5zdGF0dXMoSHR0cFN0YXR1cy5DUkVBVEVEKVxuICAgICAgLmpzb24oe1xuICAgICAgICAnZGF0YSc6XG4gICAgICAgICAgeyAnbWVzc2FnZSc6ICdVc2VyIGNyZWF0ZWQgU3VjY2Vzc2Z1bGx5JyxcbiAgICAgICAgICAgICd1c2VySWQnOiByZXN1bHQuaWQsXG4gICAgICAgICAgICAnaW5mbyc6ICdZb3UgY2FuIGxvZ2luIG5vdydcbiAgICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiByZXNcbiAgICAgIC5zdGF0dXMoSHR0cFN0YXR1cy5CQURfUkVRVUVTVClcbiAgICAgIC5qc29uKGVycm9yKTtcbiAgfVxufVxuXG5jb250cm9sbGVyLmxvZ2luVXNlciA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICBjb25zdCB7IGVtYWlsLCBwYXNzd29yZCB9ID0gcmVxLmJvZHk7XG4gIGNvbnN0IGlucHV0RGF0YSA9IHsgZW1haWwsIHBhc3N3b3JkIH07XG4gIGNvbnN0IHsgZXJyb3IsIHZhbHVlIH0gPSBKb2kudmFsaWRhdGUoXG4gICAgaW5wdXREYXRhLFxuICAgIHVzZXJWYWxpZGF0aW9uU2NoZW1hLmxvZ2luU2NoZW1hXG4gICk7XG5cbiAgaWYoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzXG4gICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QpXG4gICAgICAuanNvbih7XG4gICAgICAgICdFcnJvcic6IGVycm9yLmRldGFpbHNbMF0ubWVzc2FnZVxuICAgICAgfSk7XG4gIH1cblxuICB0cnkge1xuICAgIGxldCByZXN1bHQsIHZhbGlkRW1haWwgPSBmYWxzZSwgdmFsaWRQYXNzd29yZCA9IGZhbHNlO1xuXG4gICAgcmVzdWx0ID0gYXdhaXQgdXNlckRibS5nZXRVc2VyQnlFbWFpbChlbWFpbCk7XG5cbiAgICBpZihyZXN1bHQgJiYgcmVzdWx0LmVtYWlsID09IGVtYWlsKSB7XG4gICAgICB2YWxpZEVtYWlsID0gdHJ1ZTtcbiAgICAgIGlmKGF3YWl0IGJjcnlwdC5jb21wYXJlKHBhc3N3b3JkLCByZXN1bHQucGFzc3dvcmQpKSB7XG4gICAgICAgIHZhbGlkUGFzc3dvcmQgPSB0cnVlO1xuICAgICAgICBjb25zdCB0b2tlbiA9IGp3dC5zaWduKFxuICAgICAgICAgIHsgdXNlcklkOiByZXN1bHQuaWQgfSxcbiAgICAgICAgICBwcm9jZXNzLmVudi5TRUNSRVRfS0VZLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGV4cGlyZXNJbjogJzFoJ1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXNcbiAgICAgICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuT0spXG4gICAgICAgICAgLmpzb24oe1xuICAgICAgICAgICAgJ2RhdGEnOiB7XG4gICAgICAgICAgICAgICdtZXNzYWdlJzogJ1VzZXIgbG9nZ2VkIGluIFN1Y2Nlc3NmdWxseScsXG4gICAgICAgICAgICAgICd0b2tlbic6IHRva2VuLFxuICAgICAgICAgICAgICAnaW5mbyc6ICdVc2UgdGhpcyB0b2tlbiBmb3IgQXV0aGVudGljYXRpb24nXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoIXZhbGlkRW1haWwpIHtcbiAgICAgIHJldHVybiByZXNcbiAgICAgICAgLnN0YXR1cyhIdHRwU3RhdHVzLkJBRF9SRVFVRVNUKVxuICAgICAgICAuanNvbih7XG4gICAgICAgICAgJ2RhdGEnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdJbnZhbGlkIGVtYWlsJyxcbiAgICAgICAgICAgICdpbmZvJzogJ1dyb25nIGVtYWlsIHRyeSBhZ2FpbiEnXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZighdmFsaWRQYXNzd29yZCkge1xuICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QpXG4gICAgICAgIC5qc29uKHtcbiAgICAgICAgICAnZGF0YSc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ0ludmFsaWQgcGFzc3dvcmQnLFxuICAgICAgICAgICAgJ2luZm8nOiAnV3JvbmcgcGFzc3dvcmQgdHJ5IGFnYWluISdcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzXG4gICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QpXG4gICAgICAuanNvbihlcnJvcik7XG4gIH1cbn1cblxuY29udHJvbGxlci5lZGl0VXNlclByb2ZpbGUgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgY29uc3QgeyBmdWxsbmFtZSB9ID0gcmVxLmJvZHk7XG4gIGNvbnN0IGlucHV0RGF0YSA9IHsgZnVsbG5hbWUgfTtcbiAgY29uc3QgeyBlcnJvciwgdmFsdWUgfSA9IEpvaS52YWxpZGF0ZShcbiAgICBpbnB1dERhdGEsXG4gICAgdXNlclZhbGlkYXRpb25TY2hlbWEuZWRpdFNjaGVtYVxuICApO1xuXG4gIGlmKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlc1xuICAgICAgLnN0YXR1cyhIdHRwU3RhdHVzLkJBRF9SRVFVRVNUKVxuICAgICAgLmpzb24oeyAnRXJyb3InOiBlcnJvci5kZXRhaWxzWzBdLm1lc3NhZ2UgfSk7XG4gIH1cblxuICBjb25zdCB7IHVzZXJJZCB9ID0gcmVxLnVzZXJEYXRhO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdXNlckRibS5lZGl0VXNlclByb2ZpbGUoZnVsbG5hbWUsIHVzZXJJZCk7XG4gICAgcmV0dXJuIHJlc1xuICAgICAgLnN0YXR1cyhIdHRwU3RhdHVzLkFDQ0VQVEVEKVxuICAgICAgLmpzb24oe1xuICAgICAgICAnZGF0YSc6IHtcbiAgICAgICAgICAnbWVzc2FnZSc6ICdGdWxsbmFtZSBjaGFuZ2VkJyxcbiAgICAgICAgICAnaW5mbyc6ICdQcm9maWxlIG1vZGlmaWVkJ1xuICAgICAgICB9XG4gICAgICB9KVxuICB9XG4gIGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKCdlcnJvcicsIGVycm9yKTtcbiAgICByZXR1cm4gcmVzXG4gICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QpXG4gICAgICAuanNvbihlcnJvcik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb250cm9sbGVyOyJdfQ==