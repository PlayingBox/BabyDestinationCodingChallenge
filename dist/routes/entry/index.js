'use strict';

var _express = require('express');

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.get('/', _controller2.default.welcomeUser);

module.exports = router;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvZW50cnkvaW5kZXguanMiXSwibmFtZXMiOlsicm91dGVyIiwiZ2V0IiwiY29udHJvbGxlciIsIndlbGNvbWVVc2VyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsU0FBUyxzQkFBZjs7QUFFQUEsT0FBT0MsR0FBUCxDQUFXLEdBQVgsRUFBZ0JDLHFCQUFXQyxXQUEzQjs7QUFFQUMsT0FBT0MsT0FBUCxHQUFpQkwsTUFBakIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCBjb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcic7XG5cbmNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xuXG5yb3V0ZXIuZ2V0KCcvJywgY29udHJvbGxlci53ZWxjb21lVXNlcik7XG5cbm1vZHVsZS5leHBvcnRzID0gcm91dGVyOyJdfQ==