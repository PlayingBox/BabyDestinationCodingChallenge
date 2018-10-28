'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = {};

controller.welcomeUser = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    return _regenerator2.default.wrap(function _callee$(_context) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvZW50cnkvY29udHJvbGxlci5qcyJdLCJuYW1lcyI6WyJjb250cm9sbGVyIiwid2VsY29tZVVzZXIiLCJyZXEiLCJyZXMiLCJzdGF0dXMiLCJIdHRwU3RhdHVzIiwiT0siLCJqc29uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFQSxJQUFNQSxhQUFhLEVBQW5COztBQUVBQSxXQUFXQyxXQUFYO0FBQUEsc0ZBQXlCLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDZDQUNoQkEsSUFBSUMsTUFBSixDQUFXQywwQkFBV0MsRUFBdEIsRUFDSkMsSUFESSxDQUNDO0FBQ04sc0JBQVE7QUFDTiwyQkFBVztBQURMO0FBREYsYUFERCxDQURnQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUF6Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFVQUMsT0FBT0MsT0FBUCxHQUFpQlQsVUFBakIiLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBIdHRwU3RhdHVzIGZyb20gJ2h0dHAtc3RhdHVzLWNvZGVzJztcblxuY29uc3QgY29udHJvbGxlciA9IHt9O1xuXG5jb250cm9sbGVyLndlbGNvbWVVc2VyID0gYXN5bmMgKHJlcSwgcmVzKSAgPT4ge1xuICByZXR1cm4gcmVzLnN0YXR1cyhIdHRwU3RhdHVzLk9LKVxuICAgIC5qc29uKHtcbiAgICAnZGF0YSc6IHtcbiAgICAgICdtZXNzYWdlJzogJ1dlbGNvbWUgdG8gQmFieSBEZXN0aW5hdGlvbidcbiAgICB9XG4gIH0pO1xufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gY29udHJvbGxlcjsiXX0=