import { Router } from 'express';
import { registerUser } from '../../controllers/users.controller';
import {checkSchema} from 'express-validator';
import { createUserValidationSchemas } from '../../schemas/users/createUserValidationSchema';

const router = Router();

router.route('/').post(checkSchema(createUserValidationSchemas), registerUser);

export default router;
