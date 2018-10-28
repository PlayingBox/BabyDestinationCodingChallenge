'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("babel-polyfill");

var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());
app.use('/', _routes2.default);

var PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  return console.log('Listening on port ' + PORT);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImFwcCIsInVzZSIsImJvZHlQYXJzZXIiLCJqc29uIiwicm91dGVzIiwiUE9SVCIsInByb2Nlc3MiLCJlbnYiLCJsaXN0ZW4iLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBSkFBLFFBQVEsZ0JBQVI7O0FBTUEsSUFBTUMsTUFBTSx3QkFBWjtBQUNBQSxJQUFJQyxHQUFKLENBQVFDLHFCQUFXQyxJQUFYLEVBQVI7QUFDQUgsSUFBSUMsR0FBSixDQUFRLEdBQVIsRUFBYUcsZ0JBQWI7O0FBRUEsSUFBTUMsT0FBT0MsUUFBUUMsR0FBUixDQUFZRixJQUFaLElBQW9CLElBQWpDOztBQUVBTCxJQUFJUSxNQUFKLENBQVdILElBQVgsRUFBaUI7QUFBQSxTQUFNSSxRQUFRQyxHQUFSLHdCQUFpQ0wsSUFBakMsQ0FBTjtBQUFBLENBQWpCIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoXCJiYWJlbC1wb2x5ZmlsbFwiKTtcblxuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5pbXBvcnQgcm91dGVzIGZyb20gJy4vcm91dGVzJztcblxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5hcHAudXNlKCcvJywgcm91dGVzKTtcblxuY29uc3QgUE9SVCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMDtcblxuYXBwLmxpc3RlbihQT1JULCAoKSA9PiBjb25zb2xlLmxvZyhgTGlzdGVuaW5nIG9uIHBvcnQgJHtQT1JUfWApKTtcbiJdfQ==