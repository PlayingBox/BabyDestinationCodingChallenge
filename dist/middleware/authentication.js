'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var authenticate = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var token, decoded;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = req.headers["authorization"].split(" ")[1].token;

            console.log('token', token);
            _context.prev = 2;
            _context.next = 5;
            return _jsonwebtoken2.default.verify(token, process.env.SECRET_KEY);

          case 5:
            decoded = _context.sent;

            console.log('decoded', decoded);
            req.userData = decoded;
            next();
            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](2);

            console.log('token', token);
            return _context.abrupt('return', res.status(_httpStatusCodes2.default.UNAUTHORIZED).json({
              'data': {
                'message': 'Authentication failed!',
                'info': 'Unauthorized user'
              }
            }));

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 11]]);
  }));

  return function authenticate(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = authenticate;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlL2F1dGhlbnRpY2F0aW9uLmpzIl0sIm5hbWVzIjpbImF1dGhlbnRpY2F0ZSIsInJlcSIsInJlcyIsIm5leHQiLCJ0b2tlbiIsImhlYWRlcnMiLCJzcGxpdCIsImNvbnNvbGUiLCJsb2ciLCJqd3QiLCJ2ZXJpZnkiLCJwcm9jZXNzIiwiZW52IiwiU0VDUkVUX0tFWSIsImRlY29kZWQiLCJ1c2VyRGF0YSIsInN0YXR1cyIsIkh0dHBTdGF0dXMiLCJVTkFVVEhPUklaRUQiLCJqc29uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU1BO0FBQUEscUVBQWUsaUJBQU9DLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsSUFBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1hDLGlCQURXLEdBQ0FILElBQUlJLE9BQUosQ0FBWSxlQUFaLENBQUQsQ0FBK0JDLEtBQS9CLENBQXFDLEdBQXJDLEVBQTBDLENBQTFDLENBREMsQ0FDWEYsS0FEVzs7QUFFbkJHLG9CQUFRQyxHQUFSLENBQVksT0FBWixFQUFxQkosS0FBckI7QUFGbUI7QUFBQTtBQUFBLG1CQUlLSyx1QkFBSUMsTUFBSixDQUFXTixLQUFYLEVBQWtCTyxRQUFRQyxHQUFSLENBQVlDLFVBQTlCLENBSkw7O0FBQUE7QUFJWEMsbUJBSlc7O0FBS2pCUCxvQkFBUUMsR0FBUixDQUFZLFNBQVosRUFBdUJNLE9BQXZCO0FBQ0FiLGdCQUFJYyxRQUFKLEdBQWVELE9BQWY7QUFDQVg7QUFQaUI7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBVWpCSSxvQkFBUUMsR0FBUixDQUFZLE9BQVosRUFBcUJKLEtBQXJCO0FBVmlCLDZDQVdWRixJQUNKYyxNQURJLENBQ0dDLDBCQUFXQyxZQURkLEVBRUpDLElBRkksQ0FFQztBQUNKLHNCQUFRO0FBQ04sMkJBQVcsd0JBREw7QUFFTix3QkFBUTtBQUZGO0FBREosYUFGRCxDQVhVOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQWY7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUFzQkFDLE9BQU9DLE9BQVAsR0FBaUJyQixZQUFqQiIsImZpbGUiOiJhdXRoZW50aWNhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBqd3QgZnJvbSAnanNvbndlYnRva2VuJztcbmltcG9ydCBIdHRwU3RhdHVzIGZyb20gJ2h0dHAtc3RhdHVzLWNvZGVzJztcblxuY29uc3QgYXV0aGVudGljYXRlID0gYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIGNvbnN0IHsgdG9rZW4gfSA9IChyZXEuaGVhZGVyc1tcImF1dGhvcml6YXRpb25cIl0pLnNwbGl0KFwiIFwiKVsxXTtcbiAgY29uc29sZS5sb2coJ3Rva2VuJywgdG9rZW4pO1xuICB0cnkge1xuICAgIGNvbnN0IGRlY29kZWQgPSBhd2FpdCBqd3QudmVyaWZ5KHRva2VuLCBwcm9jZXNzLmVudi5TRUNSRVRfS0VZKTtcbiAgICBjb25zb2xlLmxvZygnZGVjb2RlZCcsIGRlY29kZWQpO1xuICAgIHJlcS51c2VyRGF0YSA9IGRlY29kZWQ7XG4gICAgbmV4dCgpO1xuICB9XG4gIGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKCd0b2tlbicsIHRva2VuKTtcbiAgICByZXR1cm4gcmVzXG4gICAgICAuc3RhdHVzKEh0dHBTdGF0dXMuVU5BVVRIT1JJWkVEKVxuICAgICAgLmpzb24oe1xuICAgICAgICAnZGF0YSc6IHtcbiAgICAgICAgICAnbWVzc2FnZSc6ICdBdXRoZW50aWNhdGlvbiBmYWlsZWQhJyxcbiAgICAgICAgICAnaW5mbyc6ICdVbmF1dGhvcml6ZWQgdXNlcidcbiAgICAgICAgfVxuICAgICAgfSlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGF1dGhlbnRpY2F0ZTsiXX0=