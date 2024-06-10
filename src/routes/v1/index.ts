import { Router } from 'express';

import healthcheckRoutes from './healthcheck.routes'
import usersRoutes from './users.routes';

const router = Router();

router.use('/', healthcheckRoutes);
router.use('/users', usersRoutes);

export default router;
