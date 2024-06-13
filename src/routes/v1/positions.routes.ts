import { Router } from 'express';

import { getAllPositions } from '../../controllers/positions.controller';

const router = Router();

router.route('/').get(getAllPositions);

export default router;
