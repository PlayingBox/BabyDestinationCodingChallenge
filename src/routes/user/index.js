import { Router } from 'express';
import controller from './controller';

const router = Router();

router.post('/register', controller.registerUser);
router.post('/log', controller.loginUser);

module.exports = router;