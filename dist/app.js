'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());
app.use('/', _routes2.default);

var PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  return console.log('Listening on port ' + PORT);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOlsiYXBwIiwidXNlIiwiYm9keVBhcnNlciIsImpzb24iLCJyb3V0ZXMiLCJQT1JUIiwicHJvY2VzcyIsImVudiIsImxpc3RlbiIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxNQUFNLHdCQUFaO0FBQ0FBLElBQUlDLEdBQUosQ0FBUUMscUJBQVdDLElBQVgsRUFBUjtBQUNBSCxJQUFJQyxHQUFKLENBQVEsR0FBUixFQUFhRyxnQkFBYjs7QUFFQSxJQUFNQyxPQUFPQyxRQUFRQyxHQUFSLENBQVlGLElBQVosSUFBb0IsSUFBakM7O0FBRUFMLElBQUlRLE1BQUosQ0FBV0gsSUFBWCxFQUFpQjtBQUFBLFNBQU1JLFFBQVFDLEdBQVIsd0JBQWlDTCxJQUFqQyxDQUFOO0FBQUEsQ0FBakIiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5pbXBvcnQgcm91dGVzIGZyb20gJy4vcm91dGVzJztcblxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5hcHAudXNlKCcvJywgcm91dGVzKTtcblxuY29uc3QgUE9SVCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMDtcblxuYXBwLmxpc3RlbihQT1JULCAoKSA9PiBjb25zb2xlLmxvZyhgTGlzdGVuaW5nIG9uIHBvcnQgJHtQT1JUfWApKTtcbiJdfQ==