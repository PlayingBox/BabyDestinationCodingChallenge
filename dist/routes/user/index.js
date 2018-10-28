'use strict';

var _express = require('express');

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("babel-polyfill");

var router = (0, _express.Router)();

router.post('/register', _controller2.default.registerUser);

module.exports = router;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvdXNlci9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwicm91dGVyIiwicG9zdCIsImNvbnRyb2xsZXIiLCJyZWdpc3RlclVzZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUVBOztBQUNBOzs7Ozs7QUFIQUEsUUFBUSxnQkFBUjs7QUFLQSxJQUFNQyxTQUFTLHNCQUFmOztBQUVBQSxPQUFPQyxJQUFQLENBQVksV0FBWixFQUF5QkMscUJBQVdDLFlBQXBDOztBQUVBQyxPQUFPQyxPQUFQLEdBQWlCTCxNQUFqQiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoXCJiYWJlbC1wb2x5ZmlsbFwiKTtcblxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgY29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXInO1xuXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxucm91dGVyLnBvc3QoJy9yZWdpc3RlcicsIGNvbnRyb2xsZXIucmVnaXN0ZXJVc2VyKTtcblxubW9kdWxlLmV4cG9ydHMgPSByb3V0ZXI7Il19