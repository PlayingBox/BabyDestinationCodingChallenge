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
                'message': 'Welcome to Baby Destination',
                'info': 'App started!'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvZW50cnkvY29udHJvbGxlci5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiY29udHJvbGxlciIsIndlbGNvbWVVc2VyIiwicmVxIiwicmVzIiwic3RhdHVzIiwiSHR0cFN0YXR1cyIsIk9LIiwianNvbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7Ozs7O0FBRkFBLFFBQVEsZ0JBQVI7O0FBSUEsSUFBTUMsYUFBYSxFQUFuQjs7QUFFQUEsV0FBV0MsV0FBWDtBQUFBLHFFQUF5QixpQkFBT0MsR0FBUCxFQUFZQyxHQUFaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw2Q0FDaEJBLElBQUlDLE1BQUosQ0FBV0MsMEJBQVdDLEVBQXRCLEVBQ0pDLElBREksQ0FDQztBQUNOLHNCQUFRO0FBQ04sMkJBQVcsNkJBREw7QUFFTix3QkFBUTtBQUZGO0FBREYsYUFERCxDQURnQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUF6Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFXQUMsT0FBT0MsT0FBUCxHQUFpQlQsVUFBakIiLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoXCJiYWJlbC1wb2x5ZmlsbFwiKTtcblxuaW1wb3J0IEh0dHBTdGF0dXMgZnJvbSAnaHR0cC1zdGF0dXMtY29kZXMnO1xuXG5jb25zdCBjb250cm9sbGVyID0ge307XG5cbmNvbnRyb2xsZXIud2VsY29tZVVzZXIgPSBhc3luYyAocmVxLCByZXMpICA9PiB7XG4gIHJldHVybiByZXMuc3RhdHVzKEh0dHBTdGF0dXMuT0spXG4gICAgLmpzb24oe1xuICAgICdkYXRhJzoge1xuICAgICAgJ21lc3NhZ2UnOiAnV2VsY29tZSB0byBCYWJ5IERlc3RpbmF0aW9uJyxcbiAgICAgICdpbmZvJzogJ0FwcCBzdGFydGVkISdcbiAgICB9XG4gIH0pO1xufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gY29udHJvbGxlcjsiXX0=