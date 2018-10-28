'use strict';

var _express = require('express');

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.post('/', _controller2.default.welcomeUser);

module.exports = router;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvZW50cnkvaW5kZXguanMiXSwibmFtZXMiOlsicm91dGVyIiwicG9zdCIsImNvbnRyb2xsZXIiLCJ3ZWxjb21lVXNlciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFNBQVMsc0JBQWY7O0FBRUFBLE9BQU9DLElBQVAsQ0FBWSxHQUFaLEVBQWlCQyxxQkFBV0MsV0FBNUI7O0FBRUFDLE9BQU9DLE9BQVAsR0FBaUJMLE1BQWpCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgY29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXInO1xuXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxucm91dGVyLnBvc3QoJy8nLCBjb250cm9sbGVyLndlbGNvbWVVc2VyKTtcblxubW9kdWxlLmV4cG9ydHMgPSByb3V0ZXI7Il19