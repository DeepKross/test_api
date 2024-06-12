import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import Config from '../config/config';
import catchAsync from '../utils/catchAsync';

export const generateTokenController = catchAsync((_: Request, res: Response) => {
  const token = jwt.sign({}, Config.jwtSecret, { expiresIn: '40m' });

  res.json({
    success: true,
    token: token
  });
});
