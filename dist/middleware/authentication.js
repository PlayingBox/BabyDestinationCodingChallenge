'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var authenticate = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var _token, decoded;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (req.headers) {
              _token = req.headers["authorization"].split(" ")[1];
            }
            _context.prev = 1;
            _context.next = 4;
            return _jsonwebtoken2.default.verify(token, process.env.SECRET_KEY);

          case 4:
            decoded = _context.sent;

            console.log('decoded', decoded);
            req.userData = decoded;
            next();
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](1);
            return _context.abrupt('return', res.status(_httpStatusCodes2.default.UNAUTHORIZED).json({
              'data': {
                'message': 'Authentication failed!',
                'info': 'Unauthorized user'
              }
            }));

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 10]]);
  }));

  return function authenticate(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = authenticate;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlL2F1dGhlbnRpY2F0aW9uLmpzIl0sIm5hbWVzIjpbImF1dGhlbnRpY2F0ZSIsInJlcSIsInJlcyIsIm5leHQiLCJoZWFkZXJzIiwidG9rZW4iLCJzcGxpdCIsImp3dCIsInZlcmlmeSIsInByb2Nlc3MiLCJlbnYiLCJTRUNSRVRfS0VZIiwiZGVjb2RlZCIsImNvbnNvbGUiLCJsb2ciLCJ1c2VyRGF0YSIsInN0YXR1cyIsIkh0dHBTdGF0dXMiLCJVTkFVVEhPUklaRUQiLCJqc29uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU1BO0FBQUEscUVBQWUsaUJBQU9DLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsSUFBakI7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNuQixnQkFBR0YsSUFBSUcsT0FBUCxFQUFnQjtBQUNSQyxvQkFEUSxHQUNDSixJQUFJRyxPQUFKLENBQVksZUFBWixDQUFELENBQStCRSxLQUEvQixDQUFxQyxHQUFyQyxFQUEwQyxDQUExQyxDQURBO0FBRWY7QUFIa0I7QUFBQTtBQUFBLG1CQUtLQyx1QkFBSUMsTUFBSixDQUFXSCxLQUFYLEVBQWtCSSxRQUFRQyxHQUFSLENBQVlDLFVBQTlCLENBTEw7O0FBQUE7QUFLWEMsbUJBTFc7O0FBTWpCQyxvQkFBUUMsR0FBUixDQUFZLFNBQVosRUFBdUJGLE9BQXZCO0FBQ0FYLGdCQUFJYyxRQUFKLEdBQWVILE9BQWY7QUFDQVQ7QUFSaUI7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQSw2Q0FXVkQsSUFDSmMsTUFESSxDQUNHQywwQkFBV0MsWUFEZCxFQUVKQyxJQUZJLENBRUM7QUFDSixzQkFBUTtBQUNOLDJCQUFXLHdCQURMO0FBRU4sd0JBQVE7QUFGRjtBQURKLGFBRkQsQ0FYVTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFmOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBc0JBQyxPQUFPQyxPQUFQLEdBQWlCckIsWUFBakIiLCJmaWxlIjoiYXV0aGVudGljYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgand0IGZyb20gJ2pzb253ZWJ0b2tlbic7XG5pbXBvcnQgSHR0cFN0YXR1cyBmcm9tICdodHRwLXN0YXR1cy1jb2Rlcyc7XG5cbmNvbnN0IGF1dGhlbnRpY2F0ZSA9IGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICBpZihyZXEuaGVhZGVycykge1xuICAgIGNvbnN0IHRva2VuID0gKHJlcS5oZWFkZXJzW1wiYXV0aG9yaXphdGlvblwiXSkuc3BsaXQoXCIgXCIpWzFdO1xuICB9XG4gIHRyeSB7XG4gICAgY29uc3QgZGVjb2RlZCA9IGF3YWl0IGp3dC52ZXJpZnkodG9rZW4sIHByb2Nlc3MuZW52LlNFQ1JFVF9LRVkpO1xuICAgIGNvbnNvbGUubG9nKCdkZWNvZGVkJywgZGVjb2RlZCk7XG4gICAgcmVxLnVzZXJEYXRhID0gZGVjb2RlZDtcbiAgICBuZXh0KCk7XG4gIH1cbiAgY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlc1xuICAgICAgLnN0YXR1cyhIdHRwU3RhdHVzLlVOQVVUSE9SSVpFRClcbiAgICAgIC5qc29uKHtcbiAgICAgICAgJ2RhdGEnOiB7XG4gICAgICAgICAgJ21lc3NhZ2UnOiAnQXV0aGVudGljYXRpb24gZmFpbGVkIScsXG4gICAgICAgICAgJ2luZm8nOiAnVW5hdXRob3JpemVkIHVzZXInXG4gICAgICAgIH1cbiAgICAgIH0pXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhdXRoZW50aWNhdGU7Il19