import { Router } from 'express';
import { checkSchema } from 'express-validator';

import { upload } from '../../config/multer';
import { getAllUsers, registerUser } from '../../controllers/users.controller';
import { checkJWT } from '../../middlewares/checkJWT.middleware';
import { createUserValidationSchemas } from '../../schemas/users/createUserValidationSchema';
import { getAllUsersValidationSchema } from '../../schemas/users/getAllUsersValidationSchema';

const router = Router();

router
  .route('/')
  .post(checkJWT, upload.single('photo'), checkSchema(createUserValidationSchemas), registerUser);
router.route('/').get(checkSchema(getAllUsersValidationSchema), getAllUsers);

export default router;
