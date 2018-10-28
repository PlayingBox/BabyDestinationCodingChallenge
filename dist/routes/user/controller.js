'use strict';

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _schema_validations = require('../../schema_validations');

var _dbManipulationLayer = require('../../db/dbManipulationLayer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require("babel-polyfill");

var controller = {};

var hashPassword = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(password) {
    var saltRounds;
    return regeneratorRuntime.wrap(function _callee$(_context) {
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
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, fullname, email, password, inputData, _Joi$validate, error, value, result, hashedPassword;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, fullname = _req$body.fullname, email = _req$body.email, password = _req$body.password;
            inputData = { fullname: fullname, email: email, password: password };

            console.log('inputData', inputData);
            _Joi$validate = _joi2.default.validate(inputData, _schema_validations.userValidationSchema.registerSchema), error = _Joi$validate.error, value = _Joi$validate.value;


            console.log('validation error', error);

            if (!error) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({ 'Error': error.details[0].message }));

          case 7:
            _context2.prev = 7;
            result = '';


            console.log('email before db call', email);

            _context2.next = 12;
            return _dbManipulationLayer.userDbm.getUserByEmail(email);

          case 12:
            result = _context2.sent;

            console.log('result of user email fetch', result);

            if (!(result == email)) {
              _context2.next = 16;
              break;
            }

            return _context2.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({ 'Error': 'Email already registered' }));

          case 16:
            _context2.next = 18;
            return hashPassword(password);

          case 18:
            hashedPassword = _context2.sent;

            console.log('hashed password', hashedPassword);

            _context2.next = 22;
            return _dbManipulationLayer.userDbm.createUser(fullname, email, hashedPassword);

          case 22:
            result = _context2.sent;

            console.log('user created id', result);

            return _context2.abrupt('return', res.status(_httpStatusCodes2.default.CREATED).json({ 'data': { 'userId': result } }));

          case 27:
            _context2.prev = 27;
            _context2.t0 = _context2['catch'](7);

            console.log('catch', _context2.t0);
            return _context2.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({ 'Error': _context2.t0 }));

          case 31:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[7, 27]]);
  }));

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

controller.loginUser = function (req, res) {};

module.exports = controller;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvdXNlci9jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJjb250cm9sbGVyIiwiaGFzaFBhc3N3b3JkIiwicGFzc3dvcmQiLCJzYWx0Um91bmRzIiwiYmNyeXB0anMiLCJoYXNoIiwicmVnaXN0ZXJVc2VyIiwicmVxIiwicmVzIiwiYm9keSIsImZ1bGxuYW1lIiwiZW1haWwiLCJpbnB1dERhdGEiLCJjb25zb2xlIiwibG9nIiwiSm9pIiwidmFsaWRhdGUiLCJ1c2VyVmFsaWRhdGlvblNjaGVtYSIsInJlZ2lzdGVyU2NoZW1hIiwiZXJyb3IiLCJ2YWx1ZSIsInN0YXR1cyIsIkh0dHBTdGF0dXMiLCJCQURfUkVRVUVTVCIsImpzb24iLCJkZXRhaWxzIiwibWVzc2FnZSIsInJlc3VsdCIsInVzZXJEYm0iLCJnZXRVc2VyQnlFbWFpbCIsImhhc2hlZFBhc3N3b3JkIiwiY3JlYXRlVXNlciIsIkNSRUFURUQiLCJJTlRFUk5BTF9TRVJWRVJfRVJST1IiLCJsb2dpblVzZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7QUFOQUEsUUFBUSxnQkFBUjs7QUFRQSxJQUFNQyxhQUFhLEVBQW5COztBQUVBLElBQU1DO0FBQUEscUVBQWUsaUJBQU9DLFFBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ2JDLHNCQURhLEdBQ0EsRUFEQTtBQUFBO0FBQUEsbUJBRU5DLG1CQUFTQyxJQUFULENBQWNILFFBQWQsRUFBd0JDLFVBQXhCLENBRk07O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFmOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBS0FILFdBQVdNLFlBQVg7QUFBQSxzRUFBMEIsa0JBQU9DLEdBQVAsRUFBWUMsR0FBWjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0JBQ2NELElBQUlFLElBRGxCLEVBQ2hCQyxRQURnQixhQUNoQkEsUUFEZ0IsRUFDTkMsS0FETSxhQUNOQSxLQURNLEVBQ0NULFFBREQsYUFDQ0EsUUFERDtBQUVsQlUscUJBRmtCLEdBRU4sRUFBRUYsa0JBQUYsRUFBWUMsWUFBWixFQUFtQlQsa0JBQW5CLEVBRk07O0FBR3hCVyxvQkFBUUMsR0FBUixDQUFZLFdBQVosRUFBeUJGLFNBQXpCO0FBSHdCLDRCQUlDRyxjQUFJQyxRQUFKLENBQ3ZCSixTQUR1QixFQUV2QksseUNBQXFCQyxjQUZFLENBSkQsRUFJaEJDLEtBSmdCLGlCQUloQkEsS0FKZ0IsRUFJVEMsS0FKUyxpQkFJVEEsS0FKUzs7O0FBU3hCUCxvQkFBUUMsR0FBUixDQUFZLGtCQUFaLEVBQWdDSyxLQUFoQzs7QUFUd0IsaUJBV3JCQSxLQVhxQjtBQUFBO0FBQUE7QUFBQTs7QUFBQSw4Q0FZZlgsSUFDSmEsTUFESSxDQUNHQywwQkFBV0MsV0FEZCxFQUVKQyxJQUZJLENBRUMsRUFBRSxTQUFTTCxNQUFNTSxPQUFOLENBQWMsQ0FBZCxFQUFpQkMsT0FBNUIsRUFGRCxDQVplOztBQUFBO0FBQUE7QUFrQmxCQyxrQkFsQmtCLEdBa0JULEVBbEJTOzs7QUFvQnRCZCxvQkFBUUMsR0FBUixDQUFZLHNCQUFaLEVBQW9DSCxLQUFwQzs7QUFwQnNCO0FBQUEsbUJBc0JQaUIsNkJBQVFDLGNBQVIsQ0FBdUJsQixLQUF2QixDQXRCTzs7QUFBQTtBQXNCdEJnQixrQkF0QnNCOztBQXVCdEJkLG9CQUFRQyxHQUFSLENBQVksNEJBQVosRUFBMENhLE1BQTFDOztBQXZCc0Isa0JBeUJuQkEsVUFBVWhCLEtBekJTO0FBQUE7QUFBQTtBQUFBOztBQUFBLDhDQTBCYkgsSUFDSmEsTUFESSxDQUNHQywwQkFBV0MsV0FEZCxFQUVKQyxJQUZJLENBRUMsRUFBRSxTQUFTLDBCQUFYLEVBRkQsQ0ExQmE7O0FBQUE7QUFBQTtBQUFBLG1CQStCT3ZCLGFBQWFDLFFBQWIsQ0EvQlA7O0FBQUE7QUErQmhCNEIsMEJBL0JnQjs7QUFnQ3RCakIsb0JBQVFDLEdBQVIsQ0FBWSxpQkFBWixFQUErQmdCLGNBQS9COztBQWhDc0I7QUFBQSxtQkFrQ1BGLDZCQUFRRyxVQUFSLENBQW1CckIsUUFBbkIsRUFBNkJDLEtBQTdCLEVBQW9DbUIsY0FBcEMsQ0FsQ087O0FBQUE7QUFrQ3RCSCxrQkFsQ3NCOztBQW1DdEJkLG9CQUFRQyxHQUFSLENBQVksaUJBQVosRUFBK0JhLE1BQS9COztBQW5Dc0IsOENBcUNmbkIsSUFDSmEsTUFESSxDQUNHQywwQkFBV1UsT0FEZCxFQUVKUixJQUZJLENBRUMsRUFBRSxRQUFRLEVBQUUsVUFBVUcsTUFBWixFQUFWLEVBRkQsQ0FyQ2U7O0FBQUE7QUFBQTtBQUFBOztBQTJDdEJkLG9CQUFRQyxHQUFSLENBQVksT0FBWjtBQTNDc0IsOENBNENmTixJQUNKYSxNQURJLENBQ0dDLDBCQUFXVyxxQkFEZCxFQUVKVCxJQUZJLENBRUMsRUFBRSxxQkFBRixFQUZELENBNUNlOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQTFCOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQWtEQXhCLFdBQVdrQyxTQUFYLEdBQXVCLFVBQUMzQixHQUFELEVBQU1DLEdBQU4sRUFBYyxDQUVwQyxDQUZEOztBQUlBMkIsT0FBT0MsT0FBUCxHQUFpQnBDLFVBQWpCIiwiZmlsZSI6ImNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKFwiYmFiZWwtcG9seWZpbGxcIik7XG5cbmltcG9ydCBKb2kgZnJvbSAnam9pJztcbmltcG9ydCBIdHRwU3RhdHVzIGZyb20gJ2h0dHAtc3RhdHVzLWNvZGVzJztcbmltcG9ydCBiY3J5cHRqcyBmcm9tICdiY3J5cHRqcyc7XG5pbXBvcnQgeyB1c2VyVmFsaWRhdGlvblNjaGVtYSB9IGZyb20gJy4uLy4uL3NjaGVtYV92YWxpZGF0aW9ucyc7XG5pbXBvcnQgeyB1c2VyRGJtIH0gZnJvbSAnLi4vLi4vZGIvZGJNYW5pcHVsYXRpb25MYXllcic7XG5cbmNvbnN0IGNvbnRyb2xsZXIgPSB7fTtcblxuY29uc3QgaGFzaFBhc3N3b3JkID0gYXN5bmMgKHBhc3N3b3JkKSA9PiB7XG4gIGNvbnN0IHNhbHRSb3VuZHMgPSAxMDtcbiAgcmV0dXJuIGF3YWl0IGJjcnlwdGpzLmhhc2gocGFzc3dvcmQsIHNhbHRSb3VuZHMpO1xufVxuXG5jb250cm9sbGVyLnJlZ2lzdGVyVXNlciA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICBjb25zdCB7IGZ1bGxuYW1lLCBlbWFpbCwgcGFzc3dvcmQgfSA9IHJlcS5ib2R5O1xuICBjb25zdCBpbnB1dERhdGEgPSB7IGZ1bGxuYW1lLCBlbWFpbCwgcGFzc3dvcmQgfTtcbiAgY29uc29sZS5sb2coJ2lucHV0RGF0YScsIGlucHV0RGF0YSk7XG4gIGNvbnN0IHsgZXJyb3IsIHZhbHVlIH0gPSBKb2kudmFsaWRhdGUoXG4gICAgaW5wdXREYXRhLFxuICAgIHVzZXJWYWxpZGF0aW9uU2NoZW1hLnJlZ2lzdGVyU2NoZW1hXG4gICk7XG5cbiAgY29uc29sZS5sb2coJ3ZhbGlkYXRpb24gZXJyb3InLCBlcnJvcik7XG5cbiAgaWYoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzXG4gICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QpXG4gICAgICAuanNvbih7ICdFcnJvcic6IGVycm9yLmRldGFpbHNbMF0ubWVzc2FnZSB9KTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgbGV0IHJlc3VsdCA9ICcnO1xuXG4gICAgY29uc29sZS5sb2coJ2VtYWlsIGJlZm9yZSBkYiBjYWxsJywgZW1haWwpO1xuXG4gICAgcmVzdWx0ID0gYXdhaXQgdXNlckRibS5nZXRVc2VyQnlFbWFpbChlbWFpbCk7XG4gICAgY29uc29sZS5sb2coJ3Jlc3VsdCBvZiB1c2VyIGVtYWlsIGZldGNoJywgcmVzdWx0KTtcblxuICAgIGlmKHJlc3VsdCA9PSBlbWFpbCkge1xuICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QpXG4gICAgICAgIC5qc29uKHsgJ0Vycm9yJzogJ0VtYWlsIGFscmVhZHkgcmVnaXN0ZXJlZCcgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgaGFzaGVkUGFzc3dvcmQgPSBhd2FpdCBoYXNoUGFzc3dvcmQocGFzc3dvcmQpO1xuICAgIGNvbnNvbGUubG9nKCdoYXNoZWQgcGFzc3dvcmQnLCBoYXNoZWRQYXNzd29yZCk7XG5cbiAgICByZXN1bHQgPSBhd2FpdCB1c2VyRGJtLmNyZWF0ZVVzZXIoZnVsbG5hbWUsIGVtYWlsLCBoYXNoZWRQYXNzd29yZCk7XG4gICAgY29uc29sZS5sb2coJ3VzZXIgY3JlYXRlZCBpZCcsIHJlc3VsdCk7XG5cbiAgICByZXR1cm4gcmVzXG4gICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuQ1JFQVRFRClcbiAgICAgIC5qc29uKHsgJ2RhdGEnOiB7ICd1c2VySWQnOiByZXN1bHQgfSB9KTtcbiAgfVxuXG4gIGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKCdjYXRjaCcsIGVycm9yKTtcbiAgICByZXR1cm4gcmVzXG4gICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SKVxuICAgICAgLmpzb24oeyAnRXJyb3InOiBlcnJvciB9KTtcbiAgfVxufVxuXG5jb250cm9sbGVyLmxvZ2luVXNlciA9IChyZXEsIHJlcykgPT4ge1xuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29udHJvbGxlcjsiXX0=