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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvdXNlci9oYXNoUGFzc3dvcmQuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImhhc2hQYXNzd29yZCIsInBhc3N3b3JkIiwic2FsdFJvdW5kcyIsImJjcnlwdCIsImhhc2giLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUVBOzs7Ozs7OztBQUZBQSxRQUFRLGdCQUFSOztBQUlBLElBQU1DO0FBQUEscUVBQWUsaUJBQU9DLFFBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ2JDLHNCQURhLEdBQ0EsRUFEQTtBQUFBO0FBQUEsbUJBRU5DLG1CQUFPQyxJQUFQLENBQVlILFFBQVosRUFBc0JDLFVBQXRCLENBRk07O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFmOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBS0FHLE9BQU9DLE9BQVAsR0FBaUJOLFlBQWpCIiwiZmlsZSI6Imhhc2hQYXNzd29yZC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoXCJiYWJlbC1wb2x5ZmlsbFwiKTtcblxuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHRqcyc7XG5cbmNvbnN0IGhhc2hQYXNzd29yZCA9IGFzeW5jIChwYXNzd29yZCkgPT4ge1xuICBjb25zdCBzYWx0Um91bmRzID0gMTA7XG4gIHJldHVybiBhd2FpdCBiY3J5cHQuaGFzaChwYXNzd29yZCwgc2FsdFJvdW5kcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaFBhc3N3b3JkOyJdfQ==