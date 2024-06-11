import { Router } from 'express';
import { checkSchema } from 'express-validator';

import { upload } from '../../config/multer';
import { registerUser } from '../../controllers/users.controller';
import { createUserValidationSchemas } from '../../schemas/users/createUserValidationSchema';

const router = Router();

router.route('/').post(upload.single('photo'), checkSchema(createUserValidationSchemas), registerUser);

export default router;
