import { Router } from 'express';

import healthcheckRoutes from './healthcheck.routes';
import positionsRoutes from './positions.routes';
import tokenRoutes from './token.routes';
import usersRoutes from './users.routes';

const router = Router();

router.use('/', healthcheckRoutes);
router.use('/users', usersRoutes);
router.use('/token', tokenRoutes);
router.use('/positions', positionsRoutes);

export default router;
