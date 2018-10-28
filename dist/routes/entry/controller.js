'use strict';

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var controller = {};

controller.welcomeUser = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
              'data': {
                'message': 'Welcome to Baby Destination'
              }
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = controller;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvZW50cnkvY29udHJvbGxlci5qcyJdLCJuYW1lcyI6WyJjb250cm9sbGVyIiwid2VsY29tZVVzZXIiLCJyZXEiLCJyZXMiLCJzdGF0dXMiLCJIdHRwU3RhdHVzIiwiT0siLCJqc29uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7Ozs7QUFFQSxJQUFNQSxhQUFhLEVBQW5COztBQUVBQSxXQUFXQyxXQUFYO0FBQUEscUVBQXlCLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDZDQUNoQkEsSUFBSUMsTUFBSixDQUFXQywwQkFBV0MsRUFBdEIsRUFDSkMsSUFESSxDQUNDO0FBQ04sc0JBQVE7QUFDTiwyQkFBVztBQURMO0FBREYsYUFERCxDQURnQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUF6Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFVQUMsT0FBT0MsT0FBUCxHQUFpQlQsVUFBakIiLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBIdHRwU3RhdHVzIGZyb20gJ2h0dHAtc3RhdHVzLWNvZGVzJztcblxuY29uc3QgY29udHJvbGxlciA9IHt9O1xuXG5jb250cm9sbGVyLndlbGNvbWVVc2VyID0gYXN5bmMgKHJlcSwgcmVzKSAgPT4ge1xuICByZXR1cm4gcmVzLnN0YXR1cyhIdHRwU3RhdHVzLk9LKVxuICAgIC5qc29uKHtcbiAgICAnZGF0YSc6IHtcbiAgICAgICdtZXNzYWdlJzogJ1dlbGNvbWUgdG8gQmFieSBEZXN0aW5hdGlvbidcbiAgICB9XG4gIH0pO1xufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gY29udHJvbGxlcjsiXX0=