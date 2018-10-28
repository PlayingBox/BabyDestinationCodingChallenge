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
            result = '';
            _context2.next = 9;
            return _dbManipulationLayer.userDbm.getUserByEmail(email);

          case 9:
            result = _context2.sent;

            if (!(result == email)) {
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
            return _dbManipulationLayer.userDbm.createUser(fullname, email, hashPassword);

          case 17:
            result = _context2.sent;
            return _context2.abrupt('return', res.status(_httpStatusCodes2.default.CREATED).json({ 'data': { 'userId': result } }));

          case 21:
            _context2.prev = 21;
            _context2.t0 = _context2['catch'](5);
            return _context2.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({ 'Error': _context2.t0 }));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvdXNlci9jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJjb250cm9sbGVyIiwiaGFzaFBhc3N3b3JkIiwicGFzc3dvcmQiLCJzYWx0Um91bmRzIiwiYmNyeXB0anMiLCJoYXNoIiwicmVnaXN0ZXJVc2VyIiwicmVxIiwicmVzIiwiYm9keSIsImZ1bGxuYW1lIiwiZW1haWwiLCJpbnB1dERhdGEiLCJKb2kiLCJ2YWxpZGF0ZSIsInVzZXJWYWxpZGF0aW9uU2NoZW1hIiwicmVnaXN0ZXJTY2hlbWEiLCJlcnJvciIsInZhbHVlIiwic3RhdHVzIiwiSHR0cFN0YXR1cyIsIkJBRF9SRVFVRVNUIiwianNvbiIsImRldGFpbHMiLCJtZXNzYWdlIiwicmVzdWx0IiwidXNlckRibSIsImdldFVzZXJCeUVtYWlsIiwiaGFzaGVkUGFzc3dvcmQiLCJjcmVhdGVVc2VyIiwiQ1JFQVRFRCIsIklOVEVSTkFMX1NFUlZFUl9FUlJPUiIsImxvZ2luVXNlciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7OztBQU5BQSxRQUFRLGdCQUFSOztBQVFBLElBQU1DLGFBQWEsRUFBbkI7O0FBRUEsSUFBTUM7QUFBQSxxRUFBZSxpQkFBT0MsUUFBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDYkMsc0JBRGEsR0FDQSxFQURBO0FBQUE7QUFBQSxtQkFFTkMsbUJBQVNDLElBQVQsQ0FBY0gsUUFBZCxFQUF3QkMsVUFBeEIsQ0FGTTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQWY7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUFLQUgsV0FBV00sWUFBWDtBQUFBLHNFQUEwQixrQkFBT0MsR0FBUCxFQUFZQyxHQUFaO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3QkFDY0QsSUFBSUUsSUFEbEIsRUFDaEJDLFFBRGdCLGFBQ2hCQSxRQURnQixFQUNOQyxLQURNLGFBQ05BLEtBRE0sRUFDQ1QsUUFERCxhQUNDQSxRQUREO0FBRWxCVSxxQkFGa0IsR0FFTixFQUFFRixrQkFBRixFQUFZQyxZQUFaLEVBQW1CVCxrQkFBbkIsRUFGTTtBQUFBLDRCQUdDVyxjQUFJQyxRQUFKLENBQ3ZCRixTQUR1QixFQUV2QkcseUNBQXFCQyxjQUZFLENBSEQsRUFHaEJDLEtBSGdCLGlCQUdoQkEsS0FIZ0IsRUFHVEMsS0FIUyxpQkFHVEEsS0FIUzs7QUFBQSxpQkFRckJELEtBUnFCO0FBQUE7QUFBQTtBQUFBOztBQUFBLDhDQVNmVCxJQUNKVyxNQURJLENBQ0dDLDBCQUFXQyxXQURkLEVBRUpDLElBRkksQ0FFQyxFQUFFLFNBQVNMLE1BQU1NLE9BQU4sQ0FBYyxDQUFkLEVBQWlCQyxPQUE1QixFQUZELENBVGU7O0FBQUE7QUFBQTtBQWVsQkMsa0JBZmtCLEdBZVQsRUFmUztBQUFBO0FBQUEsbUJBaUJQQyw2QkFBUUMsY0FBUixDQUF1QmhCLEtBQXZCLENBakJPOztBQUFBO0FBaUJ0QmMsa0JBakJzQjs7QUFBQSxrQkFtQm5CQSxVQUFVZCxLQW5CUztBQUFBO0FBQUE7QUFBQTs7QUFBQSw4Q0FvQmJILElBQ0pXLE1BREksQ0FDR0MsMEJBQVdDLFdBRGQsRUFFSkMsSUFGSSxDQUVDLEVBQUUsU0FBUywwQkFBWCxFQUZELENBcEJhOztBQUFBO0FBQUE7QUFBQSxtQkF5Qk9yQixhQUFhQyxRQUFiLENBekJQOztBQUFBO0FBeUJoQjBCLDBCQXpCZ0I7QUFBQTtBQUFBLG1CQTJCUEYsNkJBQVFHLFVBQVIsQ0FBbUJuQixRQUFuQixFQUE2QkMsS0FBN0IsRUFBb0NWLFlBQXBDLENBM0JPOztBQUFBO0FBMkJ0QndCLGtCQTNCc0I7QUFBQSw4Q0E2QmZqQixJQUNKVyxNQURJLENBQ0dDLDBCQUFXVSxPQURkLEVBRUpSLElBRkksQ0FFQyxFQUFFLFFBQVEsRUFBRSxVQUFVRyxNQUFaLEVBQVYsRUFGRCxDQTdCZTs7QUFBQTtBQUFBO0FBQUE7QUFBQSw4Q0FtQ2ZqQixJQUNKVyxNQURJLENBQ0dDLDBCQUFXVyxxQkFEZCxFQUVKVCxJQUZJLENBRUMsRUFBRSxxQkFBRixFQUZELENBbkNlOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQTFCOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQXlDQXRCLFdBQVdnQyxTQUFYLEdBQXVCLFVBQUN6QixHQUFELEVBQU1DLEdBQU4sRUFBYyxDQUVwQyxDQUZEOztBQUlBeUIsT0FBT0MsT0FBUCxHQUFpQmxDLFVBQWpCIiwiZmlsZSI6ImNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKFwiYmFiZWwtcG9seWZpbGxcIik7XG5cbmltcG9ydCBKb2kgZnJvbSAnam9pJztcbmltcG9ydCBIdHRwU3RhdHVzIGZyb20gJ2h0dHAtc3RhdHVzLWNvZGVzJztcbmltcG9ydCBiY3J5cHRqcyBmcm9tICdiY3J5cHRqcyc7XG5pbXBvcnQgeyB1c2VyVmFsaWRhdGlvblNjaGVtYSB9IGZyb20gJy4uLy4uL3NjaGVtYV92YWxpZGF0aW9ucyc7XG5pbXBvcnQgeyB1c2VyRGJtIH0gZnJvbSAnLi4vLi4vZGIvZGJNYW5pcHVsYXRpb25MYXllcic7XG5cbmNvbnN0IGNvbnRyb2xsZXIgPSB7fTtcblxuY29uc3QgaGFzaFBhc3N3b3JkID0gYXN5bmMgKHBhc3N3b3JkKSA9PiB7XG4gIGNvbnN0IHNhbHRSb3VuZHMgPSAxMDtcbiAgcmV0dXJuIGF3YWl0IGJjcnlwdGpzLmhhc2gocGFzc3dvcmQsIHNhbHRSb3VuZHMpO1xufVxuXG5jb250cm9sbGVyLnJlZ2lzdGVyVXNlciA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICBjb25zdCB7IGZ1bGxuYW1lLCBlbWFpbCwgcGFzc3dvcmQgfSA9IHJlcS5ib2R5O1xuICBjb25zdCBpbnB1dERhdGEgPSB7IGZ1bGxuYW1lLCBlbWFpbCwgcGFzc3dvcmQgfTtcbiAgY29uc3QgeyBlcnJvciwgdmFsdWUgfSA9IEpvaS52YWxpZGF0ZShcbiAgICBpbnB1dERhdGEsXG4gICAgdXNlclZhbGlkYXRpb25TY2hlbWEucmVnaXN0ZXJTY2hlbWFcbiAgKTtcblxuICBpZihlcnJvcikge1xuICAgIHJldHVybiByZXNcbiAgICAgIC5zdGF0dXMoSHR0cFN0YXR1cy5CQURfUkVRVUVTVClcbiAgICAgIC5qc29uKHsgJ0Vycm9yJzogZXJyb3IuZGV0YWlsc1swXS5tZXNzYWdlIH0pO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBsZXQgcmVzdWx0ID0gJyc7XG5cbiAgICByZXN1bHQgPSBhd2FpdCB1c2VyRGJtLmdldFVzZXJCeUVtYWlsKGVtYWlsKTtcblxuICAgIGlmKHJlc3VsdCA9PSBlbWFpbCkge1xuICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QpXG4gICAgICAgIC5qc29uKHsgJ0Vycm9yJzogJ0VtYWlsIGFscmVhZHkgcmVnaXN0ZXJlZCcgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgaGFzaGVkUGFzc3dvcmQgPSBhd2FpdCBoYXNoUGFzc3dvcmQocGFzc3dvcmQpO1xuXG4gICAgcmVzdWx0ID0gYXdhaXQgdXNlckRibS5jcmVhdGVVc2VyKGZ1bGxuYW1lLCBlbWFpbCwgaGFzaFBhc3N3b3JkKTtcblxuICAgIHJldHVybiByZXNcbiAgICAgIC5zdGF0dXMoSHR0cFN0YXR1cy5DUkVBVEVEKVxuICAgICAgLmpzb24oeyAnZGF0YSc6IHsgJ3VzZXJJZCc6IHJlc3VsdCB9IH0pO1xuICB9XG5cbiAgY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlc1xuICAgICAgLnN0YXR1cyhIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUilcbiAgICAgIC5qc29uKHsgJ0Vycm9yJzogZXJyb3IgfSk7XG4gIH1cbn1cblxuY29udHJvbGxlci5sb2dpblVzZXIgPSAocmVxLCByZXMpID0+IHtcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnRyb2xsZXI7Il19