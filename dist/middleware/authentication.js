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
            token = req.headers.authorization.split(" ")[1].token;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlL2F1dGhlbnRpY2F0aW9uLmpzIl0sIm5hbWVzIjpbImF1dGhlbnRpY2F0ZSIsInJlcSIsInJlcyIsIm5leHQiLCJ0b2tlbiIsImhlYWRlcnMiLCJhdXRob3JpemF0aW9uIiwic3BsaXQiLCJjb25zb2xlIiwibG9nIiwiand0IiwidmVyaWZ5IiwicHJvY2VzcyIsImVudiIsIlNFQ1JFVF9LRVkiLCJkZWNvZGVkIiwidXNlckRhdGEiLCJzdGF0dXMiLCJIdHRwU3RhdHVzIiwiVU5BVVRIT1JJWkVEIiwianNvbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNQTtBQUFBLHFFQUFlLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLElBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNYQyxpQkFEVyxHQUNBSCxJQUFJSSxPQUFKLENBQVlDLGFBQWIsQ0FBNEJDLEtBQTVCLENBQWtDLEdBQWxDLEVBQXVDLENBQXZDLENBREMsQ0FDWEgsS0FEVzs7QUFFbkJJLG9CQUFRQyxHQUFSLENBQVksT0FBWixFQUFxQkwsS0FBckI7QUFGbUI7QUFBQTtBQUFBLG1CQUlLTSx1QkFBSUMsTUFBSixDQUFXUCxLQUFYLEVBQWtCUSxRQUFRQyxHQUFSLENBQVlDLFVBQTlCLENBSkw7O0FBQUE7QUFJWEMsbUJBSlc7O0FBS2pCUCxvQkFBUUMsR0FBUixDQUFZLFNBQVosRUFBdUJNLE9BQXZCO0FBQ0FkLGdCQUFJZSxRQUFKLEdBQWVELE9BQWY7QUFDQVo7QUFQaUI7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBVWpCSyxvQkFBUUMsR0FBUixDQUFZLE9BQVosRUFBcUJMLEtBQXJCO0FBVmlCLDZDQVdWRixJQUNKZSxNQURJLENBQ0dDLDBCQUFXQyxZQURkLEVBRUpDLElBRkksQ0FFQztBQUNKLHNCQUFRO0FBQ04sMkJBQVcsd0JBREw7QUFFTix3QkFBUTtBQUZGO0FBREosYUFGRCxDQVhVOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQWY7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUFzQkFDLE9BQU9DLE9BQVAsR0FBaUJ0QixZQUFqQiIsImZpbGUiOiJhdXRoZW50aWNhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBqd3QgZnJvbSAnanNvbndlYnRva2VuJztcbmltcG9ydCBIdHRwU3RhdHVzIGZyb20gJ2h0dHAtc3RhdHVzLWNvZGVzJztcblxuY29uc3QgYXV0aGVudGljYXRlID0gYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIGNvbnN0IHsgdG9rZW4gfSA9IChyZXEuaGVhZGVycy5hdXRob3JpemF0aW9uKS5zcGxpdChcIiBcIilbMV07XG4gIGNvbnNvbGUubG9nKCd0b2tlbicsIHRva2VuKTtcbiAgdHJ5IHtcbiAgICBjb25zdCBkZWNvZGVkID0gYXdhaXQgand0LnZlcmlmeSh0b2tlbiwgcHJvY2Vzcy5lbnYuU0VDUkVUX0tFWSk7XG4gICAgY29uc29sZS5sb2coJ2RlY29kZWQnLCBkZWNvZGVkKTtcbiAgICByZXEudXNlckRhdGEgPSBkZWNvZGVkO1xuICAgIG5leHQoKTtcbiAgfVxuICBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZygndG9rZW4nLCB0b2tlbik7XG4gICAgcmV0dXJuIHJlc1xuICAgICAgLnN0YXR1cyhIdHRwU3RhdHVzLlVOQVVUSE9SSVpFRClcbiAgICAgIC5qc29uKHtcbiAgICAgICAgJ2RhdGEnOiB7XG4gICAgICAgICAgJ21lc3NhZ2UnOiAnQXV0aGVudGljYXRpb24gZmFpbGVkIScsXG4gICAgICAgICAgJ2luZm8nOiAnVW5hdXRob3JpemVkIHVzZXInXG4gICAgICAgIH1cbiAgICAgIH0pXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhdXRoZW50aWNhdGU7Il19