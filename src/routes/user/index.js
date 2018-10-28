require("babel-polyfill");

import { Router } from 'express';
import controller from './controller';

const router = Router();

router.post('/register', controller.registerUser);

module.exports = router;