'use strict';

var _express = require('express');

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.post('/register', _controller2.default.registerUser);

module.exports = router;
//# sourceMappingURL=index.js.map