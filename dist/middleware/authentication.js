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
            token = req.headers["authorization"].split(" ")[1];

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

            console.log('error', _context.t0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlL2F1dGhlbnRpY2F0aW9uLmpzIl0sIm5hbWVzIjpbImF1dGhlbnRpY2F0ZSIsInJlcSIsInJlcyIsIm5leHQiLCJ0b2tlbiIsImhlYWRlcnMiLCJzcGxpdCIsImNvbnNvbGUiLCJsb2ciLCJqd3QiLCJ2ZXJpZnkiLCJwcm9jZXNzIiwiZW52IiwiU0VDUkVUX0tFWSIsImRlY29kZWQiLCJ1c2VyRGF0YSIsInN0YXR1cyIsIkh0dHBTdGF0dXMiLCJVTkFVVEhPUklaRUQiLCJqc29uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU1BO0FBQUEscUVBQWUsaUJBQU9DLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsSUFBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ2JDLGlCQURhLEdBQ0pILElBQUlJLE9BQUosQ0FBWSxlQUFaLENBQUQsQ0FBK0JDLEtBQS9CLENBQXFDLEdBQXJDLEVBQTBDLENBQTFDLENBREs7O0FBRW5CQyxvQkFBUUMsR0FBUixDQUFZLE9BQVosRUFBcUJKLEtBQXJCO0FBRm1CO0FBQUE7QUFBQSxtQkFJS0ssdUJBQUlDLE1BQUosQ0FBV04sS0FBWCxFQUFrQk8sUUFBUUMsR0FBUixDQUFZQyxVQUE5QixDQUpMOztBQUFBO0FBSVhDLG1CQUpXOztBQUtqQlAsb0JBQVFDLEdBQVIsQ0FBWSxTQUFaLEVBQXVCTSxPQUF2QjtBQUNBYixnQkFBSWMsUUFBSixHQUFlRCxPQUFmO0FBQ0FYO0FBUGlCO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQVVqQkksb0JBQVFDLEdBQVIsQ0FBWSxPQUFaO0FBVmlCLDZDQVdWTixJQUNKYyxNQURJLENBQ0dDLDBCQUFXQyxZQURkLEVBRUpDLElBRkksQ0FFQztBQUNKLHNCQUFRO0FBQ04sMkJBQVcsd0JBREw7QUFFTix3QkFBUTtBQUZGO0FBREosYUFGRCxDQVhVOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQWY7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUFzQkFDLE9BQU9DLE9BQVAsR0FBaUJyQixZQUFqQiIsImZpbGUiOiJhdXRoZW50aWNhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBqd3QgZnJvbSAnanNvbndlYnRva2VuJztcbmltcG9ydCBIdHRwU3RhdHVzIGZyb20gJ2h0dHAtc3RhdHVzLWNvZGVzJztcblxuY29uc3QgYXV0aGVudGljYXRlID0gYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIGNvbnN0IHRva2VuID0gKHJlcS5oZWFkZXJzW1wiYXV0aG9yaXphdGlvblwiXSkuc3BsaXQoXCIgXCIpWzFdO1xuICBjb25zb2xlLmxvZygndG9rZW4nLCB0b2tlbik7XG4gIHRyeSB7XG4gICAgY29uc3QgZGVjb2RlZCA9IGF3YWl0IGp3dC52ZXJpZnkodG9rZW4sIHByb2Nlc3MuZW52LlNFQ1JFVF9LRVkpO1xuICAgIGNvbnNvbGUubG9nKCdkZWNvZGVkJywgZGVjb2RlZCk7XG4gICAgcmVxLnVzZXJEYXRhID0gZGVjb2RlZDtcbiAgICBuZXh0KCk7XG4gIH1cbiAgY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coJ2Vycm9yJywgZXJyb3IpO1xuICAgIHJldHVybiByZXNcbiAgICAgIC5zdGF0dXMoSHR0cFN0YXR1cy5VTkFVVEhPUklaRUQpXG4gICAgICAuanNvbih7XG4gICAgICAgICdkYXRhJzoge1xuICAgICAgICAgICdtZXNzYWdlJzogJ0F1dGhlbnRpY2F0aW9uIGZhaWxlZCEnLFxuICAgICAgICAgICdpbmZvJzogJ1VuYXV0aG9yaXplZCB1c2VyJ1xuICAgICAgICB9XG4gICAgICB9KVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXV0aGVudGljYXRlOyJdfQ==