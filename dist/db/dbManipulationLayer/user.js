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
//# sourceMappingURL=user.js.map