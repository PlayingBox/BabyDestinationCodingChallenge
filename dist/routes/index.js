'use strict';

var _express = require('express');

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _entry = require('./entry');

var _entry2 = _interopRequireDefault(_entry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("babel-polyfill");

var router = (0, _express.Router)();

router.use('/user', _user2.default);
router.use('/', _entry2.default);

module.exports = router;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvaW5kZXguanMiXSwibmFtZXMiOlsicmVxdWlyZSIsInJvdXRlciIsInVzZSIsInVzZXIiLCJlbnRyeSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBSkFBLFFBQVEsZ0JBQVI7O0FBTUEsSUFBTUMsU0FBUyxzQkFBZjs7QUFFQUEsT0FBT0MsR0FBUCxDQUFXLE9BQVgsRUFBb0JDLGNBQXBCO0FBQ0FGLE9BQU9DLEdBQVAsQ0FBVyxHQUFYLEVBQWdCRSxlQUFoQjs7QUFFQUMsT0FBT0MsT0FBUCxHQUFpQkwsTUFBakIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKFwiYmFiZWwtcG9seWZpbGxcIik7XG5cbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHVzZXIgZnJvbSAnLi91c2VyJztcbmltcG9ydCBlbnRyeSBmcm9tICcuL2VudHJ5JztcblxuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cbnJvdXRlci51c2UoJy91c2VyJywgdXNlcik7XG5yb3V0ZXIudXNlKCcvJywgZW50cnkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvdXRlcjsiXX0=