import { Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';

import { uploadFileToCloud } from '../services/file.service';
import { createNewUser } from '../services/users.service';
import catchAsync from '../utils/catchAsync';
import { formatValidationErrors } from '../utils/handleErrorsDisplay';

export const registerUser = catchAsync(async (req: Request, res: Response) => {
  const validatedRequest = validationResult(req);

  if (!validatedRequest.isEmpty()) {
    return res.status(422).send(formatValidationErrors(validatedRequest.array()));
  }

  const data = matchedData(req, { locations: ['body'] });

  const photo = req.file?.path;

  const uploadedFile = await uploadFileToCloud(photo || '');

  const newUser = await createNewUser({
    name: data.name as string,
    email: data.email as string,
    phone: data.phone as string,
    position_id: +data.position_id,
    photo: uploadedFile as string
  });

  if (!newUser) {
    return res.status(409).send({
      success: false,
      message: 'User with this phone or email already exist'
    });
  }

  res.status(201).send({
    success: true,
    user_id: newUser.id,
    message: 'New user successfully registered.'
  });
});
