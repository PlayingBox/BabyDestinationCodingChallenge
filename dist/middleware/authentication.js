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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlL2F1dGhlbnRpY2F0aW9uLmpzIl0sIm5hbWVzIjpbImF1dGhlbnRpY2F0ZSIsInJlcSIsInJlcyIsIm5leHQiLCJ0b2tlbiIsImhlYWRlcnMiLCJzcGxpdCIsImNvbnNvbGUiLCJsb2ciLCJqd3QiLCJ2ZXJpZnkiLCJwcm9jZXNzIiwiZW52IiwiU0VDUkVUX0tFWSIsImRlY29kZWQiLCJ1c2VyRGF0YSIsInN0YXR1cyIsIkh0dHBTdGF0dXMiLCJVTkFVVEhPUklaRUQiLCJqc29uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU1BO0FBQUEscUVBQWUsaUJBQU9DLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsSUFBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1hDLGlCQURXLEdBQ0FILElBQUlJLE9BQUosQ0FBWSxlQUFaLENBQUQsQ0FBK0JDLEtBQS9CLENBQXFDLEdBQXJDLEVBQTBDLENBQTFDLENBREMsQ0FDWEYsS0FEVzs7QUFFbkJHLG9CQUFRQyxHQUFSLENBQVksT0FBWixFQUFxQkosS0FBckI7QUFGbUI7QUFBQTtBQUFBLG1CQUlLSyx1QkFBSUMsTUFBSixDQUFXTixLQUFYLEVBQWtCTyxRQUFRQyxHQUFSLENBQVlDLFVBQTlCLENBSkw7O0FBQUE7QUFJWEMsbUJBSlc7O0FBS2pCUCxvQkFBUUMsR0FBUixDQUFZLFNBQVosRUFBdUJNLE9BQXZCO0FBQ0FiLGdCQUFJYyxRQUFKLEdBQWVELE9BQWY7QUFDQVg7QUFQaUI7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBVWpCSSxvQkFBUUMsR0FBUixDQUFZLE9BQVo7QUFWaUIsNkNBV1ZOLElBQ0pjLE1BREksQ0FDR0MsMEJBQVdDLFlBRGQsRUFFSkMsSUFGSSxDQUVDO0FBQ0osc0JBQVE7QUFDTiwyQkFBVyx3QkFETDtBQUVOLHdCQUFRO0FBRkY7QUFESixhQUZELENBWFU7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBZjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQXNCQUMsT0FBT0MsT0FBUCxHQUFpQnJCLFlBQWpCIiwiZmlsZSI6ImF1dGhlbnRpY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nO1xuaW1wb3J0IEh0dHBTdGF0dXMgZnJvbSAnaHR0cC1zdGF0dXMtY29kZXMnO1xuXG5jb25zdCBhdXRoZW50aWNhdGUgPSBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgY29uc3QgeyB0b2tlbiB9ID0gKHJlcS5oZWFkZXJzW1wiYXV0aG9yaXphdGlvblwiXSkuc3BsaXQoXCIgXCIpWzFdO1xuICBjb25zb2xlLmxvZygndG9rZW4nLCB0b2tlbik7XG4gIHRyeSB7XG4gICAgY29uc3QgZGVjb2RlZCA9IGF3YWl0IGp3dC52ZXJpZnkodG9rZW4sIHByb2Nlc3MuZW52LlNFQ1JFVF9LRVkpO1xuICAgIGNvbnNvbGUubG9nKCdkZWNvZGVkJywgZGVjb2RlZCk7XG4gICAgcmVxLnVzZXJEYXRhID0gZGVjb2RlZDtcbiAgICBuZXh0KCk7XG4gIH1cbiAgY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coJ2Vycm9yJywgZXJyb3IpO1xuICAgIHJldHVybiByZXNcbiAgICAgIC5zdGF0dXMoSHR0cFN0YXR1cy5VTkFVVEhPUklaRUQpXG4gICAgICAuanNvbih7XG4gICAgICAgICdkYXRhJzoge1xuICAgICAgICAgICdtZXNzYWdlJzogJ0F1dGhlbnRpY2F0aW9uIGZhaWxlZCEnLFxuICAgICAgICAgICdpbmZvJzogJ1VuYXV0aG9yaXplZCB1c2VyJ1xuICAgICAgICB9XG4gICAgICB9KVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXV0aGVudGljYXRlOyJdfQ==