"use strict";

var _bcryptjs = require("bcryptjs");

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require("babel-polyfill");

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
            return _context.abrupt("return", _context.sent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function hashPassword(_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = hashPassword;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvdXNlci9oYXNoUGFzc3dvcmQuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImhhc2hQYXNzd29yZCIsInBhc3N3b3JkIiwic2FsdFJvdW5kcyIsImJjcnlwdGpzIiwiaGFzaCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7Ozs7O0FBRkFBLFFBQVEsZ0JBQVI7O0FBSUEsSUFBTUM7QUFBQSxxRUFBZSxpQkFBT0MsUUFBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDYkMsc0JBRGEsR0FDQSxFQURBO0FBQUE7QUFBQSxtQkFFTkMsbUJBQVNDLElBQVQsQ0FBY0gsUUFBZCxFQUF3QkMsVUFBeEIsQ0FGTTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQWY7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUFLQUcsT0FBT0MsT0FBUCxHQUFpQk4sWUFBakIiLCJmaWxlIjoiaGFzaFBhc3N3b3JkLmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZShcImJhYmVsLXBvbHlmaWxsXCIpO1xuXG5pbXBvcnQgYmNyeXB0anMgZnJvbSAnYmNyeXB0anMnO1xuXG5jb25zdCBoYXNoUGFzc3dvcmQgPSBhc3luYyAocGFzc3dvcmQpID0+IHtcbiAgY29uc3Qgc2FsdFJvdW5kcyA9IDEwO1xuICByZXR1cm4gYXdhaXQgYmNyeXB0anMuaGFzaChwYXNzd29yZCwgc2FsdFJvdW5kcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaFBhc3N3b3JkOyJdfQ==