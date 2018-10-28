'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _db = require('../../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dmlFunctions = {};

dmlFunctions.getUserByEmail = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(email) {
    var client, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
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
            return _context.abrupt('return', result.rows[0].email);

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
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(fullname, email, password) {
    var client, result;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
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

            throw { 'Error': 'email not found' };

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYi9kYk1hbmlwdWxhdGlvbkxheWVyL3VzZXIuanMiXSwibmFtZXMiOlsiZG1sRnVuY3Rpb25zIiwiZ2V0VXNlckJ5RW1haWwiLCJlbWFpbCIsInBvb2wiLCJjb25uZWN0IiwiY2xpZW50IiwicXVlcnkiLCJyZXN1bHQiLCJyb3dzIiwiY3JlYXRlVXNlciIsImZ1bGxuYW1lIiwicGFzc3dvcmQiLCJpZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBRUEsSUFBTUEsZUFBZSxFQUFyQjs7QUFFQUEsYUFBYUMsY0FBYjtBQUFBLHNGQUE4QixpQkFBT0MsS0FBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFDeEJBLEtBRHdCO0FBQUE7QUFBQTtBQUFBOztBQUFBLGtCQUVwQixFQUFFLFNBQVMsaUJBQVgsRUFGb0I7O0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBTUxDLGFBQUtDLE9BQUwsRUFOSzs7QUFBQTtBQU1wQkMsa0JBTm9CO0FBQUE7QUFBQSxtQkFPTEEsT0FBT0MsS0FBUCxDQUNuQiwwQ0FEbUIsRUFFbkIsQ0FBQ0osS0FBRCxDQUZtQixDQVBLOztBQUFBO0FBT3BCSyxrQkFQb0I7QUFBQSw2Q0FZbkJBLE9BQU9DLElBQVAsQ0FBWSxDQUFaLEVBQWVOLEtBWkk7O0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBZXBCLEVBQUUsb0JBQUYsRUFmb0I7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBOUI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBbUJBRixhQUFhUyxVQUFiO0FBQUEsdUZBQTBCLGtCQUFPQyxRQUFQLEVBQWlCUixLQUFqQixFQUF3QlMsUUFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBQ3BCRCxRQURvQjtBQUFBO0FBQUE7QUFBQTs7QUFBQSxrQkFFaEIsRUFBRSxTQUFTLG9CQUFYLEVBRmdCOztBQUFBO0FBQUEsZ0JBR2JSLEtBSGE7QUFBQTtBQUFBO0FBQUE7O0FBQUEsa0JBSWhCLEVBQUUsU0FBUyxpQkFBWCxFQUpnQjs7QUFBQTtBQUFBLGdCQUtiUyxRQUxhO0FBQUE7QUFBQTtBQUFBOztBQUFBLGtCQU1oQixFQUFFLFNBQVMsaUJBQVgsRUFOZ0I7O0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBVURSLGFBQUtDLE9BQUwsRUFWQzs7QUFBQTtBQVVoQkMsa0JBVmdCO0FBQUE7QUFBQSxtQkFXREEsT0FBT0MsS0FBUCxDQUNsQixpREFDQyxpQ0FGaUIsRUFHbkIsQ0FBQ0ksUUFBRCxFQUFXUixLQUFYLEVBQWtCUyxRQUFsQixDQUhtQixDQVhDOztBQUFBO0FBV2hCSixrQkFYZ0I7QUFBQSw4Q0FpQmZBLE9BQU9DLElBQVAsQ0FBWSxDQUFaLEVBQWVJLEVBakJBOztBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQW9CaEIsRUFBRSxxQkFBRixFQXBCZ0I7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBMUI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBd0JBQyxPQUFPQyxPQUFQLEdBQWlCZCxZQUFqQiIsImZpbGUiOiJ1c2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBvb2wgZnJvbSAnLi4vLi4vZGInO1xuXG5jb25zdCBkbWxGdW5jdGlvbnMgPSB7fTtcblxuZG1sRnVuY3Rpb25zLmdldFVzZXJCeUVtYWlsID0gYXN5bmMgKGVtYWlsKSA9PiB7XG4gIGlmKCFlbWFpbCkge1xuICAgIHRocm93IHsgJ0Vycm9yJzogJ2VtYWlsIG5vdCBmb3VuZCd9O1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBwb29sLmNvbm5lY3QoKTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjbGllbnQucXVlcnkoXG4gICAgICAnU0VMRUNUIGVtYWlsIEZST00gdXNlcnMgV0hFUkUgZW1haWwgPSAkMScsXG4gICAgICBbZW1haWxdXG4gICAgKTtcblxuICAgIHJldHVybiByZXN1bHQucm93c1swXS5lbWFpbDtcbiAgfVxuICBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyB7ICdFcnJvcic6IGVycm9yIH07XG4gIH1cbn1cblxuZG1sRnVuY3Rpb25zLmNyZWF0ZVVzZXIgPSBhc3luYyAoZnVsbG5hbWUsIGVtYWlsLCBwYXNzd29yZCkgPT4ge1xuICBpZighZnVsbG5hbWUpIHtcbiAgICB0aHJvdyB7ICdFcnJvcic6ICdmdWxsbmFtZSBub3QgZm91bmQnfTtcbiAgfSBlbHNlIGlmKCFlbWFpbCkge1xuICAgIHRocm93IHsgJ0Vycm9yJzogJ2VtYWlsIG5vdCBmb3VuZCd9O1xuICB9IGVsc2UgaWYoIXBhc3N3b3JkKSB7XG4gICAgdGhyb3cgeyAnRXJyb3InOiAnZW1haWwgbm90IGZvdW5kJ307XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IHBvb2wuY29ubmVjdCgpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNsaWVudC5xdWVyeShcbiAgICAgICgnSU5TRVJUIElOVE8gdXNlcnMoZnVsbG5hbWUsIGVtYWlsLCBwYXNzd29yZCknICtcbiAgICAgICAgJ1ZBTFVFUygkMSwgJDIsICQzKSBSRVRVUk5JTkcgaWQnKSxcbiAgICAgIFtmdWxsbmFtZSwgZW1haWwsIHBhc3N3b3JkXVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVzdWx0LnJvd3NbMF0uaWQ7XG4gIH1cbiAgY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgeyAnRXJyb3InOiBlcnJvciB9O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG1sRnVuY3Rpb25zOyJdfQ==