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
            _context2.next = 11;
            return _dbManipulationLayer.userDbm.getUserByEmail(email);

          case 11:
            result = _context2.sent;

            console.log('result of user email fetch', result);

            if (!(result == email)) {
              _context2.next = 15;
              break;
            }

            return _context2.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({ 'Error': 'Email already registered' }));

          case 15:
            _context2.next = 17;
            return hashPassword(password);

          case 17:
            hashedPassword = _context2.sent;

            console.log('hashed password', hashedPassword);

            _context2.next = 21;
            return _dbManipulationLayer.userDbm.createUser(fullname, email, hashedPassword);

          case 21:
            result = _context2.sent;

            console.log('user created id', result);

            return _context2.abrupt('return', res.status(_httpStatusCodes2.default.CREATED).json({ 'data': { 'userId': result } }));

          case 26:
            _context2.prev = 26;
            _context2.t0 = _context2['catch'](7);

            console.log('catch', _context2.t0);
            return _context2.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({ 'Error': _context2.t0 }));

          case 30:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[7, 26]]);
  }));

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

controller.loginUser = function (req, res) {};

module.exports = controller;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvdXNlci9jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJjb250cm9sbGVyIiwiaGFzaFBhc3N3b3JkIiwicGFzc3dvcmQiLCJzYWx0Um91bmRzIiwiYmNyeXB0anMiLCJoYXNoIiwicmVnaXN0ZXJVc2VyIiwicmVxIiwicmVzIiwiYm9keSIsImZ1bGxuYW1lIiwiZW1haWwiLCJpbnB1dERhdGEiLCJjb25zb2xlIiwibG9nIiwiSm9pIiwidmFsaWRhdGUiLCJ1c2VyVmFsaWRhdGlvblNjaGVtYSIsInJlZ2lzdGVyU2NoZW1hIiwiZXJyb3IiLCJ2YWx1ZSIsInN0YXR1cyIsIkh0dHBTdGF0dXMiLCJCQURfUkVRVUVTVCIsImpzb24iLCJkZXRhaWxzIiwibWVzc2FnZSIsInJlc3VsdCIsInVzZXJEYm0iLCJnZXRVc2VyQnlFbWFpbCIsImhhc2hlZFBhc3N3b3JkIiwiY3JlYXRlVXNlciIsIkNSRUFURUQiLCJJTlRFUk5BTF9TRVJWRVJfRVJST1IiLCJsb2dpblVzZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7QUFOQUEsUUFBUSxnQkFBUjs7QUFRQSxJQUFNQyxhQUFhLEVBQW5COztBQUVBLElBQU1DO0FBQUEscUVBQWUsaUJBQU9DLFFBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ2JDLHNCQURhLEdBQ0EsRUFEQTtBQUFBO0FBQUEsbUJBRU5DLG1CQUFTQyxJQUFULENBQWNILFFBQWQsRUFBd0JDLFVBQXhCLENBRk07O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFmOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBS0FILFdBQVdNLFlBQVg7QUFBQSxzRUFBMEIsa0JBQU9DLEdBQVAsRUFBWUMsR0FBWjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0JBQ2NELElBQUlFLElBRGxCLEVBQ2hCQyxRQURnQixhQUNoQkEsUUFEZ0IsRUFDTkMsS0FETSxhQUNOQSxLQURNLEVBQ0NULFFBREQsYUFDQ0EsUUFERDtBQUVsQlUscUJBRmtCLEdBRU4sRUFBRUYsa0JBQUYsRUFBWUMsWUFBWixFQUFtQlQsa0JBQW5CLEVBRk07O0FBR3hCVyxvQkFBUUMsR0FBUixDQUFZLFdBQVosRUFBeUJGLFNBQXpCO0FBSHdCLDRCQUlDRyxjQUFJQyxRQUFKLENBQ3ZCSixTQUR1QixFQUV2QksseUNBQXFCQyxjQUZFLENBSkQsRUFJaEJDLEtBSmdCLGlCQUloQkEsS0FKZ0IsRUFJVEMsS0FKUyxpQkFJVEEsS0FKUzs7O0FBU3hCUCxvQkFBUUMsR0FBUixDQUFZLGtCQUFaLEVBQWdDSyxLQUFoQzs7QUFUd0IsaUJBV3JCQSxLQVhxQjtBQUFBO0FBQUE7QUFBQTs7QUFBQSw4Q0FZZlgsSUFDSmEsTUFESSxDQUNHQywwQkFBV0MsV0FEZCxFQUVKQyxJQUZJLENBRUMsRUFBRSxTQUFTTCxNQUFNTSxPQUFOLENBQWMsQ0FBZCxFQUFpQkMsT0FBNUIsRUFGRCxDQVplOztBQUFBO0FBQUE7QUFrQmxCQyxrQkFsQmtCLEdBa0JULEVBbEJTO0FBQUE7QUFBQSxtQkFvQlBDLDZCQUFRQyxjQUFSLENBQXVCbEIsS0FBdkIsQ0FwQk87O0FBQUE7QUFvQnRCZ0Isa0JBcEJzQjs7QUFxQnRCZCxvQkFBUUMsR0FBUixDQUFZLDRCQUFaLEVBQTBDYSxNQUExQzs7QUFyQnNCLGtCQXVCbkJBLFVBQVVoQixLQXZCUztBQUFBO0FBQUE7QUFBQTs7QUFBQSw4Q0F3QmJILElBQ0phLE1BREksQ0FDR0MsMEJBQVdDLFdBRGQsRUFFSkMsSUFGSSxDQUVDLEVBQUUsU0FBUywwQkFBWCxFQUZELENBeEJhOztBQUFBO0FBQUE7QUFBQSxtQkE2Qk92QixhQUFhQyxRQUFiLENBN0JQOztBQUFBO0FBNkJoQjRCLDBCQTdCZ0I7O0FBOEJ0QmpCLG9CQUFRQyxHQUFSLENBQVksaUJBQVosRUFBK0JnQixjQUEvQjs7QUE5QnNCO0FBQUEsbUJBZ0NQRiw2QkFBUUcsVUFBUixDQUFtQnJCLFFBQW5CLEVBQTZCQyxLQUE3QixFQUFvQ21CLGNBQXBDLENBaENPOztBQUFBO0FBZ0N0Qkgsa0JBaENzQjs7QUFpQ3RCZCxvQkFBUUMsR0FBUixDQUFZLGlCQUFaLEVBQStCYSxNQUEvQjs7QUFqQ3NCLDhDQW1DZm5CLElBQ0phLE1BREksQ0FDR0MsMEJBQVdVLE9BRGQsRUFFSlIsSUFGSSxDQUVDLEVBQUUsUUFBUSxFQUFFLFVBQVVHLE1BQVosRUFBVixFQUZELENBbkNlOztBQUFBO0FBQUE7QUFBQTs7QUF5Q3RCZCxvQkFBUUMsR0FBUixDQUFZLE9BQVo7QUF6Q3NCLDhDQTBDZk4sSUFDSmEsTUFESSxDQUNHQywwQkFBV1cscUJBRGQsRUFFSlQsSUFGSSxDQUVDLEVBQUUscUJBQUYsRUFGRCxDQTFDZTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUExQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFnREF4QixXQUFXa0MsU0FBWCxHQUF1QixVQUFDM0IsR0FBRCxFQUFNQyxHQUFOLEVBQWMsQ0FFcEMsQ0FGRDs7QUFJQTJCLE9BQU9DLE9BQVAsR0FBaUJwQyxVQUFqQiIsImZpbGUiOiJjb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZShcImJhYmVsLXBvbHlmaWxsXCIpO1xuXG5pbXBvcnQgSm9pIGZyb20gJ2pvaSc7XG5pbXBvcnQgSHR0cFN0YXR1cyBmcm9tICdodHRwLXN0YXR1cy1jb2Rlcyc7XG5pbXBvcnQgYmNyeXB0anMgZnJvbSAnYmNyeXB0anMnO1xuaW1wb3J0IHsgdXNlclZhbGlkYXRpb25TY2hlbWEgfSBmcm9tICcuLi8uLi9zY2hlbWFfdmFsaWRhdGlvbnMnO1xuaW1wb3J0IHsgdXNlckRibSB9IGZyb20gJy4uLy4uL2RiL2RiTWFuaXB1bGF0aW9uTGF5ZXInO1xuXG5jb25zdCBjb250cm9sbGVyID0ge307XG5cbmNvbnN0IGhhc2hQYXNzd29yZCA9IGFzeW5jIChwYXNzd29yZCkgPT4ge1xuICBjb25zdCBzYWx0Um91bmRzID0gMTA7XG4gIHJldHVybiBhd2FpdCBiY3J5cHRqcy5oYXNoKHBhc3N3b3JkLCBzYWx0Um91bmRzKTtcbn1cblxuY29udHJvbGxlci5yZWdpc3RlclVzZXIgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgY29uc3QgeyBmdWxsbmFtZSwgZW1haWwsIHBhc3N3b3JkIH0gPSByZXEuYm9keTtcbiAgY29uc3QgaW5wdXREYXRhID0geyBmdWxsbmFtZSwgZW1haWwsIHBhc3N3b3JkIH07XG4gIGNvbnNvbGUubG9nKCdpbnB1dERhdGEnLCBpbnB1dERhdGEpO1xuICBjb25zdCB7IGVycm9yLCB2YWx1ZSB9ID0gSm9pLnZhbGlkYXRlKFxuICAgIGlucHV0RGF0YSxcbiAgICB1c2VyVmFsaWRhdGlvblNjaGVtYS5yZWdpc3RlclNjaGVtYVxuICApO1xuXG4gIGNvbnNvbGUubG9nKCd2YWxpZGF0aW9uIGVycm9yJywgZXJyb3IpO1xuXG4gIGlmKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlc1xuICAgICAgLnN0YXR1cyhIdHRwU3RhdHVzLkJBRF9SRVFVRVNUKVxuICAgICAgLmpzb24oeyAnRXJyb3InOiBlcnJvci5kZXRhaWxzWzBdLm1lc3NhZ2UgfSk7XG4gIH1cblxuICB0cnkge1xuICAgIGxldCByZXN1bHQgPSAnJztcblxuICAgIHJlc3VsdCA9IGF3YWl0IHVzZXJEYm0uZ2V0VXNlckJ5RW1haWwoZW1haWwpO1xuICAgIGNvbnNvbGUubG9nKCdyZXN1bHQgb2YgdXNlciBlbWFpbCBmZXRjaCcsIHJlc3VsdCk7XG5cbiAgICBpZihyZXN1bHQgPT0gZW1haWwpIHtcbiAgICAgIHJldHVybiByZXNcbiAgICAgICAgLnN0YXR1cyhIdHRwU3RhdHVzLkJBRF9SRVFVRVNUKVxuICAgICAgICAuanNvbih7ICdFcnJvcic6ICdFbWFpbCBhbHJlYWR5IHJlZ2lzdGVyZWQnIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGhhc2hlZFBhc3N3b3JkID0gYXdhaXQgaGFzaFBhc3N3b3JkKHBhc3N3b3JkKTtcbiAgICBjb25zb2xlLmxvZygnaGFzaGVkIHBhc3N3b3JkJywgaGFzaGVkUGFzc3dvcmQpO1xuXG4gICAgcmVzdWx0ID0gYXdhaXQgdXNlckRibS5jcmVhdGVVc2VyKGZ1bGxuYW1lLCBlbWFpbCwgaGFzaGVkUGFzc3dvcmQpO1xuICAgIGNvbnNvbGUubG9nKCd1c2VyIGNyZWF0ZWQgaWQnLCByZXN1bHQpO1xuXG4gICAgcmV0dXJuIHJlc1xuICAgICAgLnN0YXR1cyhIdHRwU3RhdHVzLkNSRUFURUQpXG4gICAgICAuanNvbih7ICdkYXRhJzogeyAndXNlcklkJzogcmVzdWx0IH0gfSk7XG4gIH1cblxuICBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZygnY2F0Y2gnLCBlcnJvcik7XG4gICAgcmV0dXJuIHJlc1xuICAgICAgLnN0YXR1cyhIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUilcbiAgICAgIC5qc29uKHsgJ0Vycm9yJzogZXJyb3IgfSk7XG4gIH1cbn1cblxuY29udHJvbGxlci5sb2dpblVzZXIgPSAocmVxLCByZXMpID0+IHtcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnRyb2xsZXI7Il19