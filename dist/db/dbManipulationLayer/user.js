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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYi9kYk1hbmlwdWxhdGlvbkxheWVyL3VzZXIuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImRtbEZ1bmN0aW9ucyIsImdldFVzZXJCeUVtYWlsIiwiZW1haWwiLCJwb29sIiwiY29ubmVjdCIsImNsaWVudCIsInF1ZXJ5IiwicmVzdWx0Iiwicm93cyIsImNyZWF0ZVVzZXIiLCJmdWxsbmFtZSIsInBhc3N3b3JkIiwiaWQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUVBOzs7Ozs7OztBQUZBQSxRQUFRLGdCQUFSOztBQUlBLElBQU1DLGVBQWUsRUFBckI7O0FBRUFBLGFBQWFDLGNBQWI7QUFBQSxxRUFBOEIsaUJBQU9DLEtBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBQ3hCQSxLQUR3QjtBQUFBO0FBQUE7QUFBQTs7QUFBQSxrQkFFcEIsRUFBRSxTQUFTLGlCQUFYLEVBRm9COztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQU1MQyxhQUFLQyxPQUFMLEVBTks7O0FBQUE7QUFNcEJDLGtCQU5vQjtBQUFBO0FBQUEsbUJBT0xBLE9BQU9DLEtBQVAsQ0FDbkIsMENBRG1CLEVBRW5CLENBQUNKLEtBQUQsQ0FGbUIsQ0FQSzs7QUFBQTtBQU9wQkssa0JBUG9CO0FBQUEsNkNBWW5CQSxPQUFPQyxJQUFQLENBQVksQ0FBWixFQUFlTixLQVpJOztBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQWVwQixFQUFFLG9CQUFGLEVBZm9COztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQTlCOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQW1CQUYsYUFBYVMsVUFBYjtBQUFBLHNFQUEwQixrQkFBT0MsUUFBUCxFQUFpQlIsS0FBakIsRUFBd0JTLFFBQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQUNwQkQsUUFEb0I7QUFBQTtBQUFBO0FBQUE7O0FBQUEsa0JBRWhCLEVBQUUsU0FBUyxvQkFBWCxFQUZnQjs7QUFBQTtBQUFBLGdCQUdiUixLQUhhO0FBQUE7QUFBQTtBQUFBOztBQUFBLGtCQUloQixFQUFFLFNBQVMsaUJBQVgsRUFKZ0I7O0FBQUE7QUFBQSxnQkFLYlMsUUFMYTtBQUFBO0FBQUE7QUFBQTs7QUFBQSxrQkFNaEIsRUFBRSxTQUFTLGlCQUFYLEVBTmdCOztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQVVEUixhQUFLQyxPQUFMLEVBVkM7O0FBQUE7QUFVaEJDLGtCQVZnQjtBQUFBO0FBQUEsbUJBV0RBLE9BQU9DLEtBQVAsQ0FDbEIsaURBQ0MsaUNBRmlCLEVBR25CLENBQUNJLFFBQUQsRUFBV1IsS0FBWCxFQUFrQlMsUUFBbEIsQ0FIbUIsQ0FYQzs7QUFBQTtBQVdoQkosa0JBWGdCO0FBQUEsOENBaUJmQSxPQUFPQyxJQUFQLENBQVksQ0FBWixFQUFlSSxFQWpCQTs7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFvQmhCLEVBQUUscUJBQUYsRUFwQmdCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQTFCOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQXdCQUMsT0FBT0MsT0FBUCxHQUFpQmQsWUFBakIiLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoXCJiYWJlbC1wb2x5ZmlsbFwiKTtcblxuaW1wb3J0IHBvb2wgZnJvbSAnLi4vLi4vZGInO1xuXG5jb25zdCBkbWxGdW5jdGlvbnMgPSB7fTtcblxuZG1sRnVuY3Rpb25zLmdldFVzZXJCeUVtYWlsID0gYXN5bmMgKGVtYWlsKSA9PiB7XG4gIGlmKCFlbWFpbCkge1xuICAgIHRocm93IHsgJ0Vycm9yJzogJ2VtYWlsIG5vdCBmb3VuZCd9O1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBwb29sLmNvbm5lY3QoKTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjbGllbnQucXVlcnkoXG4gICAgICAnU0VMRUNUIGVtYWlsIEZST00gdXNlcnMgV0hFUkUgZW1haWwgPSAkMScsXG4gICAgICBbZW1haWxdXG4gICAgKTtcblxuICAgIHJldHVybiByZXN1bHQucm93c1swXS5lbWFpbDtcbiAgfVxuICBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyB7ICdFcnJvcic6IGVycm9yIH07XG4gIH1cbn1cblxuZG1sRnVuY3Rpb25zLmNyZWF0ZVVzZXIgPSBhc3luYyAoZnVsbG5hbWUsIGVtYWlsLCBwYXNzd29yZCkgPT4ge1xuICBpZighZnVsbG5hbWUpIHtcbiAgICB0aHJvdyB7ICdFcnJvcic6ICdmdWxsbmFtZSBub3QgZm91bmQnfTtcbiAgfSBlbHNlIGlmKCFlbWFpbCkge1xuICAgIHRocm93IHsgJ0Vycm9yJzogJ2VtYWlsIG5vdCBmb3VuZCd9O1xuICB9IGVsc2UgaWYoIXBhc3N3b3JkKSB7XG4gICAgdGhyb3cgeyAnRXJyb3InOiAnZW1haWwgbm90IGZvdW5kJ307XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IHBvb2wuY29ubmVjdCgpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNsaWVudC5xdWVyeShcbiAgICAgICgnSU5TRVJUIElOVE8gdXNlcnMoZnVsbG5hbWUsIGVtYWlsLCBwYXNzd29yZCknICtcbiAgICAgICAgJ1ZBTFVFUygkMSwgJDIsICQzKSBSRVRVUk5JTkcgaWQnKSxcbiAgICAgIFtmdWxsbmFtZSwgZW1haWwsIHBhc3N3b3JkXVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVzdWx0LnJvd3NbMF0uaWQ7XG4gIH1cbiAgY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgeyAnRXJyb3InOiBlcnJvciB9O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG1sRnVuY3Rpb25zOyJdfQ==