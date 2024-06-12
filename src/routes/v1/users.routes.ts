import { Router } from 'express';
import { checkSchema } from 'express-validator';

import { upload } from '../../config/multer';
import { getAllUsers, getUserById, registerUser } from '../../controllers/users.controller';
import { checkJWT } from '../../middlewares/checkJWT.middleware';
import { createUserValidationSchemas } from '../../schemas/users/createUserValidationSchema';
import { getAllUsersValidationSchema } from '../../schemas/users/getAllUsersValidationSchema';
import { getUserByIdValidationSchema } from '../../schemas/users/getUserByIdValidationSchema';

const router = Router();

router
  .route('/')
  .post(checkJWT, upload.single('photo'), checkSchema(createUserValidationSchemas), registerUser);
router.route('/').get(checkSchema(getAllUsersValidationSchema), getAllUsers);
router.route('/:id').get(checkSchema(getUserByIdValidationSchema), getUserById);

export default router;
