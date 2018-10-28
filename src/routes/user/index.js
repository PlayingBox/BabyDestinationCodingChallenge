import { Router } from 'express';
import controller from './controller';
import Autheticate from '../../middleware/authentication';

const router = Router();

router.post('/register', controller.registerUser);
router.post('/log', controller.loginUser);
router.put('/edit', Autheticate, controller.editUserProfile);

module.exports = router;