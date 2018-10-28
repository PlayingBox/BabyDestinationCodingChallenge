'use strict';

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require("babel-polyfill");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvZW50cnkvY29udHJvbGxlci5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiY29udHJvbGxlciIsIndlbGNvbWVVc2VyIiwicmVxIiwicmVzIiwic3RhdHVzIiwiSHR0cFN0YXR1cyIsIk9LIiwianNvbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7Ozs7O0FBRkFBLFFBQVEsZ0JBQVI7O0FBSUEsSUFBTUMsYUFBYSxFQUFuQjs7QUFFQUEsV0FBV0MsV0FBWDtBQUFBLHFFQUF5QixpQkFBT0MsR0FBUCxFQUFZQyxHQUFaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw2Q0FDaEJBLElBQUlDLE1BQUosQ0FBV0MsMEJBQVdDLEVBQXRCLEVBQ0pDLElBREksQ0FDQztBQUNOLHNCQUFRO0FBQ04sMkJBQVc7QUFETDtBQURGLGFBREQsQ0FEZ0I7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBekI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBVUFDLE9BQU9DLE9BQVAsR0FBaUJULFVBQWpCIiwiZmlsZSI6ImNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKFwiYmFiZWwtcG9seWZpbGxcIik7XG5cbmltcG9ydCBIdHRwU3RhdHVzIGZyb20gJ2h0dHAtc3RhdHVzLWNvZGVzJztcblxuY29uc3QgY29udHJvbGxlciA9IHt9O1xuXG5jb250cm9sbGVyLndlbGNvbWVVc2VyID0gYXN5bmMgKHJlcSwgcmVzKSAgPT4ge1xuICByZXR1cm4gcmVzLnN0YXR1cyhIdHRwU3RhdHVzLk9LKVxuICAgIC5qc29uKHtcbiAgICAnZGF0YSc6IHtcbiAgICAgICdtZXNzYWdlJzogJ1dlbGNvbWUgdG8gQmFieSBEZXN0aW5hdGlvbidcbiAgICB9XG4gIH0pO1xufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gY29udHJvbGxlcjsiXX0=