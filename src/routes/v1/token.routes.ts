import { Router } from 'express';

import { generateTokenController } from '../../controllers/token.controller';

const router = Router();

router.route('/').get(generateTokenController);

export default router;
