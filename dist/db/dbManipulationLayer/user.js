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

            throw {
              'Error': 'email not found'
            };

          case 2:
            _context.prev = 2;
            _context.next = 5;
            return _db2.default.connect();

          case 5:
            client = _context.sent;
            _context.next = 8;
            return client.query('SELECT id, email, password FROM users WHERE email = $1', [email]);

          case 8:
            result = _context.sent;
            return _context.abrupt('return', result.rows[0]);

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](2);
            throw {
              'Error': _context.t0
            };

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

            throw {
              'Error': 'fullname not found'
            };

          case 4:
            if (email) {
              _context2.next = 8;
              break;
            }

            throw {
              'Error': 'email not found'
            };

          case 8:
            if (password) {
              _context2.next = 10;
              break;
            }

            throw {
              'Error': 'password not found'
            };

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
            return _context2.abrupt('return', result.rows[0]);

          case 20:
            _context2.prev = 20;
            _context2.t0 = _context2['catch'](10);
            throw {
              'Error': _context2.t0
            };

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

dmlFunctions.editUserProfile = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(fullname, userId) {
    var client, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (fullname) {
              _context3.next = 2;
              break;
            }

            throw {
              'Error': 'fullname not found'
            };

          case 2:
            _context3.prev = 2;
            _context3.next = 5;
            return _db2.default.connect();

          case 5:
            client = _context3.sent;
            _context3.next = 8;
            return client.query('UPDATE users SET fullname=($1) where id=($2)', [fullname, userId]);

          case 8:
            result = _context3.sent;
            return _context3.abrupt('return', result.rows[0]);

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3['catch'](2);
            throw {
              'Error': _context3.t0
            };

          case 15:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[2, 12]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

module.exports = dmlFunctions;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYi9kYk1hbmlwdWxhdGlvbkxheWVyL3VzZXIuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImRtbEZ1bmN0aW9ucyIsImdldFVzZXJCeUVtYWlsIiwiZW1haWwiLCJwb29sIiwiY29ubmVjdCIsImNsaWVudCIsInF1ZXJ5IiwicmVzdWx0Iiwicm93cyIsImNyZWF0ZVVzZXIiLCJmdWxsbmFtZSIsInBhc3N3b3JkIiwiZWRpdFVzZXJQcm9maWxlIiwidXNlcklkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7Ozs7Ozs7QUFGQUEsUUFBUSxnQkFBUjs7QUFJQSxJQUFNQyxlQUFlLEVBQXJCOztBQUVBQSxhQUFhQyxjQUFiO0FBQUEscUVBQThCLGlCQUFPQyxLQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQUN4QkEsS0FEd0I7QUFBQTtBQUFBO0FBQUE7O0FBQUEsa0JBRXBCO0FBQ0osdUJBQVM7QUFETCxhQUZvQjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFRTEMsYUFBS0MsT0FBTCxFQVJLOztBQUFBO0FBUXBCQyxrQkFSb0I7QUFBQTtBQUFBLG1CQVNMQSxPQUFPQyxLQUFQLENBQ25CLHdEQURtQixFQUVuQixDQUFDSixLQUFELENBRm1CLENBVEs7O0FBQUE7QUFTcEJLLGtCQVRvQjtBQUFBLDZDQWNuQkEsT0FBT0MsSUFBUCxDQUFZLENBQVosQ0FkbUI7O0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBaUJwQjtBQUNKO0FBREksYUFqQm9COztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQTlCOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQXVCQVIsYUFBYVMsVUFBYjtBQUFBLHNFQUEwQixrQkFBT0MsUUFBUCxFQUFpQlIsS0FBakIsRUFBd0JTLFFBQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQUNwQkQsUUFEb0I7QUFBQTtBQUFBO0FBQUE7O0FBQUEsa0JBRWhCO0FBQ0osdUJBQVM7QUFETCxhQUZnQjs7QUFBQTtBQUFBLGdCQUtiUixLQUxhO0FBQUE7QUFBQTtBQUFBOztBQUFBLGtCQU1oQjtBQUNKLHVCQUFTO0FBREwsYUFOZ0I7O0FBQUE7QUFBQSxnQkFTYlMsUUFUYTtBQUFBO0FBQUE7QUFBQTs7QUFBQSxrQkFVaEI7QUFDSix1QkFBUztBQURMLGFBVmdCOztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQWdCRFIsYUFBS0MsT0FBTCxFQWhCQzs7QUFBQTtBQWdCaEJDLGtCQWhCZ0I7QUFBQTtBQUFBLG1CQWlCREEsT0FBT0MsS0FBUCxDQUNsQixpREFDQyxpQ0FGaUIsRUFHbkIsQ0FBQ0ksUUFBRCxFQUFXUixLQUFYLEVBQWtCUyxRQUFsQixDQUhtQixDQWpCQzs7QUFBQTtBQWlCaEJKLGtCQWpCZ0I7QUFBQSw4Q0F1QmZBLE9BQU9DLElBQVAsQ0FBWSxDQUFaLENBdkJlOztBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQTBCaEI7QUFDSjtBQURJLGFBMUJnQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUExQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFnQ0FSLGFBQWFZLGVBQWI7QUFBQSxzRUFBK0Isa0JBQU9GLFFBQVAsRUFBaUJHLE1BQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQUN6QkgsUUFEeUI7QUFBQTtBQUFBO0FBQUE7O0FBQUEsa0JBRXJCO0FBQ0osdUJBQVM7QUFETCxhQUZxQjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFRTlAsYUFBS0MsT0FBTCxFQVJNOztBQUFBO0FBUXJCQyxrQkFScUI7QUFBQTtBQUFBLG1CQVNOQSxPQUFPQyxLQUFQLENBQ25CLDhDQURtQixFQUVuQixDQUFDSSxRQUFELEVBQVdHLE1BQVgsQ0FGbUIsQ0FUTTs7QUFBQTtBQVNyQk4sa0JBVHFCO0FBQUEsOENBY3BCQSxPQUFPQyxJQUFQLENBQVksQ0FBWixDQWRvQjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFpQnJCO0FBQ0o7QUFESSxhQWpCcUI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBL0I7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBdUJBTSxPQUFPQyxPQUFQLEdBQWlCZixZQUFqQiIsImZpbGUiOiJ1c2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZShcImJhYmVsLXBvbHlmaWxsXCIpO1xuXG5pbXBvcnQgcG9vbCBmcm9tICcuLi8uLi9kYic7XG5cbmNvbnN0IGRtbEZ1bmN0aW9ucyA9IHt9O1xuXG5kbWxGdW5jdGlvbnMuZ2V0VXNlckJ5RW1haWwgPSBhc3luYyAoZW1haWwpID0+IHtcbiAgaWYoIWVtYWlsKSB7XG4gICAgdGhyb3cge1xuICAgICAgJ0Vycm9yJzogJ2VtYWlsIG5vdCBmb3VuZCdcbiAgICB9O1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBwb29sLmNvbm5lY3QoKTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjbGllbnQucXVlcnkoXG4gICAgICAnU0VMRUNUIGlkLCBlbWFpbCwgcGFzc3dvcmQgRlJPTSB1c2VycyBXSEVSRSBlbWFpbCA9ICQxJyxcbiAgICAgIFtlbWFpbF1cbiAgICApO1xuXG4gICAgcmV0dXJuIHJlc3VsdC5yb3dzWzBdO1xuICB9XG4gIGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IHtcbiAgICAgICdFcnJvcic6IGVycm9yXG4gICAgfTtcbiAgfVxufVxuXG5kbWxGdW5jdGlvbnMuY3JlYXRlVXNlciA9IGFzeW5jIChmdWxsbmFtZSwgZW1haWwsIHBhc3N3b3JkKSA9PiB7XG4gIGlmKCFmdWxsbmFtZSkge1xuICAgIHRocm93IHtcbiAgICAgICdFcnJvcic6ICdmdWxsbmFtZSBub3QgZm91bmQnXG4gICAgfTtcbiAgfSBlbHNlIGlmKCFlbWFpbCkge1xuICAgIHRocm93IHtcbiAgICAgICdFcnJvcic6ICdlbWFpbCBub3QgZm91bmQnXG4gICAgfTtcbiAgfSBlbHNlIGlmKCFwYXNzd29yZCkge1xuICAgIHRocm93IHtcbiAgICAgICdFcnJvcic6ICdwYXNzd29yZCBub3QgZm91bmQnXG4gICAgfTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgcG9vbC5jb25uZWN0KCk7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2xpZW50LnF1ZXJ5KFxuICAgICAgKCdJTlNFUlQgSU5UTyB1c2VycyhmdWxsbmFtZSwgZW1haWwsIHBhc3N3b3JkKScgK1xuICAgICAgICAnVkFMVUVTKCQxLCAkMiwgJDMpIFJFVFVSTklORyBpZCcpLFxuICAgICAgW2Z1bGxuYW1lLCBlbWFpbCwgcGFzc3dvcmRdXG4gICAgKTtcblxuICAgIHJldHVybiByZXN1bHQucm93c1swXTtcbiAgfVxuICBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyB7XG4gICAgICAnRXJyb3InOiBlcnJvclxuICAgIH07XG4gIH1cbn1cblxuZG1sRnVuY3Rpb25zLmVkaXRVc2VyUHJvZmlsZSA9IGFzeW5jIChmdWxsbmFtZSwgdXNlcklkKSA9PiB7XG4gIGlmKCFmdWxsbmFtZSkge1xuICAgIHRocm93IHtcbiAgICAgICdFcnJvcic6ICdmdWxsbmFtZSBub3QgZm91bmQnXG4gICAgfTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgcG9vbC5jb25uZWN0KCk7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2xpZW50LnF1ZXJ5KFxuICAgICAgJ1VQREFURSB1c2VycyBTRVQgZnVsbG5hbWU9KCQxKSB3aGVyZSBpZD0oJDIpJyxcbiAgICAgIFtmdWxsbmFtZSwgdXNlcklkXVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVzdWx0LnJvd3NbMF07XG4gIH1cbiAgY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cge1xuICAgICAgJ0Vycm9yJzogZXJyb3JcbiAgICB9O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG1sRnVuY3Rpb25zOyJdfQ==