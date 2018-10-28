'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

require('./middleware')({
  app: app,
  bodyParser: _bodyParser2.default,
  routes: _routes2.default
});

var PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  return console.log('Listening on port ' + PORT);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOlsiYXBwIiwicmVxdWlyZSIsImJvZHlQYXJzZXIiLCJyb3V0ZXMiLCJQT1JUIiwicHJvY2VzcyIsImVudiIsImxpc3RlbiIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxNQUFNLHdCQUFaOztBQUVBQyxRQUFRLGNBQVIsRUFBd0I7QUFDdEJELFVBRHNCO0FBRXRCRSxrQ0FGc0I7QUFHdEJDO0FBSHNCLENBQXhCOztBQU1BLElBQU1DLE9BQU9DLFFBQVFDLEdBQVIsQ0FBWUYsSUFBWixJQUFvQixJQUFqQzs7QUFFQUosSUFBSU8sTUFBSixDQUFXSCxJQUFYLEVBQWlCO0FBQUEsU0FBTUksUUFBUUMsR0FBUix3QkFBaUNMLElBQWpDLENBQU47QUFBQSxDQUFqQiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBib2R5UGFyc2VyIGZyb20gJ2JvZHktcGFyc2VyJztcbmltcG9ydCByb3V0ZXMgZnJvbSAnLi9yb3V0ZXMnO1xuXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5cbnJlcXVpcmUoJy4vbWlkZGxld2FyZScpKHtcbiAgYXBwLFxuICBib2R5UGFyc2VyLFxuICByb3V0ZXNcbn0pO1xuXG5jb25zdCBQT1JUID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwO1xuXG5hcHAubGlzdGVuKFBPUlQsICgpID0+IGNvbnNvbGUubG9nKGBMaXN0ZW5pbmcgb24gcG9ydCAke1BPUlR9YCkpO1xuIl19