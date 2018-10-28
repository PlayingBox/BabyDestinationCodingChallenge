import { Router } from 'express';
import user from './user';
import entry from './entry';

const router = Router();

router.use('/user', user);
router.use('/', entry);

module.exports = router;