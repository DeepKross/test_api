import { Request, Response } from 'express';

import catchAsync from '../utils/catchAsync';
import { matchedData, validationResult } from 'express-validator';
import { formatValidationErrors } from '../utils/handleErrorsDisplay';

export const registerUser = catchAsync((req: Request, res: Response) => {
  const validatedRequest = validationResult(req);

  if (!validatedRequest.isEmpty()) {
    return res.status(422).send(formatValidationErrors(validatedRequest.array()))
  }

  const data = matchedData(req, { locations: ['body'] });

  res.status(200).send({
   token: 'token',
  });
});
