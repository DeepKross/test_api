import { Router } from 'express';

import healthcheckRoutes from './healthcheck.routes'

const router = Router();

router.use('/', healthcheckRoutes);

export default router;
