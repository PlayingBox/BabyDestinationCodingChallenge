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
            _Joi$validate = _joi2.default.validate(inputData, _schema_validations.userValidationSchema.registerSchema), error = _Joi$validate.error, value = _Joi$validate.value;

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
            return _dbManipulationLayer.userDbm.createUser(fullname, email, hashedPassword);

          case 17:
            result = _context2.sent;
            return _context2.abrupt('return', res.status(_httpStatusCodes2.default.CREATED).json({ 'data': { 'message': 'User Created Successfully', 'userId': result } }));

          case 21:
            _context2.prev = 21;
            _context2.t0 = _context2['catch'](5);
            return _context2.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json(_context2.t0));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvdXNlci9jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJjb250cm9sbGVyIiwiaGFzaFBhc3N3b3JkIiwicGFzc3dvcmQiLCJzYWx0Um91bmRzIiwiYmNyeXB0anMiLCJoYXNoIiwicmVnaXN0ZXJVc2VyIiwicmVxIiwicmVzIiwiYm9keSIsImZ1bGxuYW1lIiwiZW1haWwiLCJpbnB1dERhdGEiLCJKb2kiLCJ2YWxpZGF0ZSIsInVzZXJWYWxpZGF0aW9uU2NoZW1hIiwicmVnaXN0ZXJTY2hlbWEiLCJlcnJvciIsInZhbHVlIiwic3RhdHVzIiwiSHR0cFN0YXR1cyIsIkJBRF9SRVFVRVNUIiwianNvbiIsImRldGFpbHMiLCJtZXNzYWdlIiwicmVzdWx0IiwidXNlckRibSIsImdldFVzZXJCeUVtYWlsIiwiaGFzaGVkUGFzc3dvcmQiLCJjcmVhdGVVc2VyIiwiQ1JFQVRFRCIsIklOVEVSTkFMX1NFUlZFUl9FUlJPUiIsImxvZ2luVXNlciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7OztBQU5BQSxRQUFRLGdCQUFSOztBQVFBLElBQU1DLGFBQWEsRUFBbkI7O0FBRUEsSUFBTUM7QUFBQSxxRUFBZSxpQkFBT0MsUUFBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDYkMsc0JBRGEsR0FDQSxFQURBO0FBQUE7QUFBQSxtQkFFTkMsbUJBQVNDLElBQVQsQ0FBY0gsUUFBZCxFQUF3QkMsVUFBeEIsQ0FGTTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQWY7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUFLQUgsV0FBV00sWUFBWDtBQUFBLHNFQUEwQixrQkFBT0MsR0FBUCxFQUFZQyxHQUFaO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3QkFDY0QsSUFBSUUsSUFEbEIsRUFDaEJDLFFBRGdCLGFBQ2hCQSxRQURnQixFQUNOQyxLQURNLGFBQ05BLEtBRE0sRUFDQ1QsUUFERCxhQUNDQSxRQUREO0FBRWxCVSxxQkFGa0IsR0FFTixFQUFFRixrQkFBRixFQUFZQyxZQUFaLEVBQW1CVCxrQkFBbkIsRUFGTTtBQUFBLDRCQUdDVyxjQUFJQyxRQUFKLENBQ3ZCRixTQUR1QixFQUV2QkcseUNBQXFCQyxjQUZFLENBSEQsRUFHaEJDLEtBSGdCLGlCQUdoQkEsS0FIZ0IsRUFHVEMsS0FIUyxpQkFHVEEsS0FIUzs7QUFBQSxpQkFRckJELEtBUnFCO0FBQUE7QUFBQTtBQUFBOztBQUFBLDhDQVNmVCxJQUNKVyxNQURJLENBQ0dDLDBCQUFXQyxXQURkLEVBRUpDLElBRkksQ0FFQyxFQUFFLFNBQVNMLE1BQU1NLE9BQU4sQ0FBYyxDQUFkLEVBQWlCQyxPQUE1QixFQUZELENBVGU7O0FBQUE7QUFBQTtBQWVsQkMsa0JBZmtCO0FBQUE7QUFBQSxtQkFpQlBDLDZCQUFRQyxjQUFSLENBQXVCaEIsS0FBdkIsQ0FqQk87O0FBQUE7QUFpQnRCYyxrQkFqQnNCOztBQUFBLGtCQW1CbkJBLFVBQVVBLE9BQU9kLEtBQVAsSUFBZ0JBLEtBbkJQO0FBQUE7QUFBQTtBQUFBOztBQUFBLDhDQW9CYkgsSUFDSlcsTUFESSxDQUNHQywwQkFBV0MsV0FEZCxFQUVKQyxJQUZJLENBRUMsRUFBRSxTQUFTLDBCQUFYLEVBRkQsQ0FwQmE7O0FBQUE7QUFBQTtBQUFBLG1CQXlCT3JCLGFBQWFDLFFBQWIsQ0F6QlA7O0FBQUE7QUF5QmhCMEIsMEJBekJnQjtBQUFBO0FBQUEsbUJBMkJQRiw2QkFBUUcsVUFBUixDQUFtQm5CLFFBQW5CLEVBQTZCQyxLQUE3QixFQUFvQ2lCLGNBQXBDLENBM0JPOztBQUFBO0FBMkJ0Qkgsa0JBM0JzQjtBQUFBLDhDQTZCZmpCLElBQ0pXLE1BREksQ0FDR0MsMEJBQVdVLE9BRGQsRUFFSlIsSUFGSSxDQUVDLEVBQUUsUUFBUSxFQUFFLFdBQVcsMkJBQWIsRUFBMEMsVUFBVUcsTUFBcEQsRUFBVixFQUZELENBN0JlOztBQUFBO0FBQUE7QUFBQTtBQUFBLDhDQW1DZmpCLElBQ0pXLE1BREksQ0FDR0MsMEJBQVdXLHFCQURkLEVBRUpULElBRkksY0FuQ2U7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBMUI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBeUNBdEIsV0FBV2dDLFNBQVgsR0FBdUIsVUFBQ3pCLEdBQUQsRUFBTUMsR0FBTixFQUFjLENBRXBDLENBRkQ7O0FBSUF5QixPQUFPQyxPQUFQLEdBQWlCbEMsVUFBakIiLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoXCJiYWJlbC1wb2x5ZmlsbFwiKTtcblxuaW1wb3J0IEpvaSBmcm9tICdqb2knO1xuaW1wb3J0IEh0dHBTdGF0dXMgZnJvbSAnaHR0cC1zdGF0dXMtY29kZXMnO1xuaW1wb3J0IGJjcnlwdGpzIGZyb20gJ2JjcnlwdGpzJztcbmltcG9ydCB7IHVzZXJWYWxpZGF0aW9uU2NoZW1hIH0gZnJvbSAnLi4vLi4vc2NoZW1hX3ZhbGlkYXRpb25zJztcbmltcG9ydCB7IHVzZXJEYm0gfSBmcm9tICcuLi8uLi9kYi9kYk1hbmlwdWxhdGlvbkxheWVyJztcblxuY29uc3QgY29udHJvbGxlciA9IHt9O1xuXG5jb25zdCBoYXNoUGFzc3dvcmQgPSBhc3luYyAocGFzc3dvcmQpID0+IHtcbiAgY29uc3Qgc2FsdFJvdW5kcyA9IDEwO1xuICByZXR1cm4gYXdhaXQgYmNyeXB0anMuaGFzaChwYXNzd29yZCwgc2FsdFJvdW5kcyk7XG59XG5cbmNvbnRyb2xsZXIucmVnaXN0ZXJVc2VyID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIGNvbnN0IHsgZnVsbG5hbWUsIGVtYWlsLCBwYXNzd29yZCB9ID0gcmVxLmJvZHk7XG4gIGNvbnN0IGlucHV0RGF0YSA9IHsgZnVsbG5hbWUsIGVtYWlsLCBwYXNzd29yZCB9O1xuICBjb25zdCB7IGVycm9yLCB2YWx1ZSB9ID0gSm9pLnZhbGlkYXRlKFxuICAgIGlucHV0RGF0YSxcbiAgICB1c2VyVmFsaWRhdGlvblNjaGVtYS5yZWdpc3RlclNjaGVtYVxuICApO1xuXG4gIGlmKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlc1xuICAgICAgLnN0YXR1cyhIdHRwU3RhdHVzLkJBRF9SRVFVRVNUKVxuICAgICAgLmpzb24oeyAnRXJyb3InOiBlcnJvci5kZXRhaWxzWzBdLm1lc3NhZ2UgfSk7XG4gIH1cblxuICB0cnkge1xuICAgIGxldCByZXN1bHQ7XG5cbiAgICByZXN1bHQgPSBhd2FpdCB1c2VyRGJtLmdldFVzZXJCeUVtYWlsKGVtYWlsKTtcblxuICAgIGlmKHJlc3VsdCAmJiByZXN1bHQuZW1haWwgPT0gZW1haWwpIHtcbiAgICAgIHJldHVybiByZXNcbiAgICAgICAgLnN0YXR1cyhIdHRwU3RhdHVzLkJBRF9SRVFVRVNUKVxuICAgICAgICAuanNvbih7ICdFcnJvcic6ICdFbWFpbCBhbHJlYWR5IHJlZ2lzdGVyZWQnIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGhhc2hlZFBhc3N3b3JkID0gYXdhaXQgaGFzaFBhc3N3b3JkKHBhc3N3b3JkKTtcblxuICAgIHJlc3VsdCA9IGF3YWl0IHVzZXJEYm0uY3JlYXRlVXNlcihmdWxsbmFtZSwgZW1haWwsIGhhc2hlZFBhc3N3b3JkKTtcblxuICAgIHJldHVybiByZXNcbiAgICAgIC5zdGF0dXMoSHR0cFN0YXR1cy5DUkVBVEVEKVxuICAgICAgLmpzb24oeyAnZGF0YSc6IHsgJ21lc3NhZ2UnOiAnVXNlciBDcmVhdGVkIFN1Y2Nlc3NmdWxseScsICd1c2VySWQnOiByZXN1bHQgfSB9KTtcbiAgfVxuXG4gIGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiByZXNcbiAgICAgIC5zdGF0dXMoSHR0cFN0YXR1cy5JTlRFUk5BTF9TRVJWRVJfRVJST1IpXG4gICAgICAuanNvbihlcnJvcik7XG4gIH1cbn1cblxuY29udHJvbGxlci5sb2dpblVzZXIgPSAocmVxLCByZXMpID0+IHtcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnRyb2xsZXI7Il19