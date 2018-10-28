'use strict';

var _db = require('../../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require("babel-polyfill");

var dmlFunctions = {};

dmlFunctions.getUserByEmail = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(email) {
    var client, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (email) {
              _context.next = 2;
              break;
            }

            throw { 'Error': 'email not found' };

          case 2:
            _context.prev = 2;
            _context.next = 5;
            return _db2.default.connect();

          case 5:
            client = _context.sent;
            _context.next = 8;
            return client.query('SELECT email FROM users WHERE email = $1', [email]);

          case 8:
            result = _context.sent;
            return _context.abrupt('return', result.rows[0]);

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](2);
            throw { 'Error': _context.t0 };

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 12]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

dmlFunctions.createUser = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(fullname, email, password) {
    var client, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (fullname) {
              _context2.next = 4;
              break;
            }

            throw { 'Error': 'fullname not found' };

          case 4:
            if (email) {
              _context2.next = 8;
              break;
            }

            throw { 'Error': 'email not found' };

          case 8:
            if (password) {
              _context2.next = 10;
              break;
            }

            throw { 'Error': 'password not found' };

          case 10:
            _context2.prev = 10;
            _context2.next = 13;
            return _db2.default.connect();

          case 13:
            client = _context2.sent;
            _context2.next = 16;
            return client.query('INSERT INTO users(fullname, email, password)' + 'VALUES($1, $2, $3) RETURNING id', [fullname, email, password]);

          case 16:
            result = _context2.sent;
            return _context2.abrupt('return', result.rows[0].id);

          case 20:
            _context2.prev = 20;
            _context2.t0 = _context2['catch'](10);
            throw { 'Error': _context2.t0 };

          case 23:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[10, 20]]);
  }));

  return function (_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = dmlFunctions;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYi9kYk1hbmlwdWxhdGlvbkxheWVyL3VzZXIuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImRtbEZ1bmN0aW9ucyIsImdldFVzZXJCeUVtYWlsIiwiZW1haWwiLCJwb29sIiwiY29ubmVjdCIsImNsaWVudCIsInF1ZXJ5IiwicmVzdWx0Iiwicm93cyIsImNyZWF0ZVVzZXIiLCJmdWxsbmFtZSIsInBhc3N3b3JkIiwiaWQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUVBOzs7Ozs7OztBQUZBQSxRQUFRLGdCQUFSOztBQUlBLElBQU1DLGVBQWUsRUFBckI7O0FBRUFBLGFBQWFDLGNBQWI7QUFBQSxxRUFBOEIsaUJBQU9DLEtBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBQ3hCQSxLQUR3QjtBQUFBO0FBQUE7QUFBQTs7QUFBQSxrQkFFcEIsRUFBRSxTQUFTLGlCQUFYLEVBRm9COztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQU1MQyxhQUFLQyxPQUFMLEVBTks7O0FBQUE7QUFNcEJDLGtCQU5vQjtBQUFBO0FBQUEsbUJBT0xBLE9BQU9DLEtBQVAsQ0FDbkIsMENBRG1CLEVBRW5CLENBQUNKLEtBQUQsQ0FGbUIsQ0FQSzs7QUFBQTtBQU9wQkssa0JBUG9CO0FBQUEsNkNBWW5CQSxPQUFPQyxJQUFQLENBQVksQ0FBWixDQVptQjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFlcEIsRUFBRSxvQkFBRixFQWZvQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUE5Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFtQkFSLGFBQWFTLFVBQWI7QUFBQSxzRUFBMEIsa0JBQU9DLFFBQVAsRUFBaUJSLEtBQWpCLEVBQXdCUyxRQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFDcEJELFFBRG9CO0FBQUE7QUFBQTtBQUFBOztBQUFBLGtCQUVoQixFQUFFLFNBQVMsb0JBQVgsRUFGZ0I7O0FBQUE7QUFBQSxnQkFHYlIsS0FIYTtBQUFBO0FBQUE7QUFBQTs7QUFBQSxrQkFJaEIsRUFBRSxTQUFTLGlCQUFYLEVBSmdCOztBQUFBO0FBQUEsZ0JBS2JTLFFBTGE7QUFBQTtBQUFBO0FBQUE7O0FBQUEsa0JBTWhCLEVBQUUsU0FBUyxvQkFBWCxFQU5nQjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFVRFIsYUFBS0MsT0FBTCxFQVZDOztBQUFBO0FBVWhCQyxrQkFWZ0I7QUFBQTtBQUFBLG1CQVdEQSxPQUFPQyxLQUFQLENBQ2xCLGlEQUNDLGlDQUZpQixFQUduQixDQUFDSSxRQUFELEVBQVdSLEtBQVgsRUFBa0JTLFFBQWxCLENBSG1CLENBWEM7O0FBQUE7QUFXaEJKLGtCQVhnQjtBQUFBLDhDQWlCZkEsT0FBT0MsSUFBUCxDQUFZLENBQVosRUFBZUksRUFqQkE7O0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBb0JoQixFQUFFLHFCQUFGLEVBcEJnQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUExQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUF3QkFDLE9BQU9DLE9BQVAsR0FBaUJkLFlBQWpCIiwiZmlsZSI6InVzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKFwiYmFiZWwtcG9seWZpbGxcIik7XG5cbmltcG9ydCBwb29sIGZyb20gJy4uLy4uL2RiJztcblxuY29uc3QgZG1sRnVuY3Rpb25zID0ge307XG5cbmRtbEZ1bmN0aW9ucy5nZXRVc2VyQnlFbWFpbCA9IGFzeW5jIChlbWFpbCkgPT4ge1xuICBpZighZW1haWwpIHtcbiAgICB0aHJvdyB7ICdFcnJvcic6ICdlbWFpbCBub3QgZm91bmQnfTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgcG9vbC5jb25uZWN0KCk7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2xpZW50LnF1ZXJ5KFxuICAgICAgJ1NFTEVDVCBlbWFpbCBGUk9NIHVzZXJzIFdIRVJFIGVtYWlsID0gJDEnLFxuICAgICAgW2VtYWlsXVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVzdWx0LnJvd3NbMF07XG4gIH1cbiAgY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgeyAnRXJyb3InOiBlcnJvciB9O1xuICB9XG59XG5cbmRtbEZ1bmN0aW9ucy5jcmVhdGVVc2VyID0gYXN5bmMgKGZ1bGxuYW1lLCBlbWFpbCwgcGFzc3dvcmQpID0+IHtcbiAgaWYoIWZ1bGxuYW1lKSB7XG4gICAgdGhyb3cgeyAnRXJyb3InOiAnZnVsbG5hbWUgbm90IGZvdW5kJ307XG4gIH0gZWxzZSBpZighZW1haWwpIHtcbiAgICB0aHJvdyB7ICdFcnJvcic6ICdlbWFpbCBub3QgZm91bmQnfTtcbiAgfSBlbHNlIGlmKCFwYXNzd29yZCkge1xuICAgIHRocm93IHsgJ0Vycm9yJzogJ3Bhc3N3b3JkIG5vdCBmb3VuZCd9O1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBwb29sLmNvbm5lY3QoKTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjbGllbnQucXVlcnkoXG4gICAgICAoJ0lOU0VSVCBJTlRPIHVzZXJzKGZ1bGxuYW1lLCBlbWFpbCwgcGFzc3dvcmQpJyArXG4gICAgICAgICdWQUxVRVMoJDEsICQyLCAkMykgUkVUVVJOSU5HIGlkJyksXG4gICAgICBbZnVsbG5hbWUsIGVtYWlsLCBwYXNzd29yZF1cbiAgICApO1xuXG4gICAgcmV0dXJuIHJlc3VsdC5yb3dzWzBdLmlkO1xuICB9XG4gIGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IHsgJ0Vycm9yJzogZXJyb3IgfTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRtbEZ1bmN0aW9uczsiXX0=