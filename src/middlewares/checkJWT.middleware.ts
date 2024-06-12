import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import Config from '../config/config';

export const checkJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  console.log('token', token);

  try {
    if (!token) {
      return res.status(401).send({ message: 'Token is required' });
    }

    jwt.verify(token, Config.jwtSecret, function (err, decoded) {
      if (err) {
        return res.status(401).send({ success: false, message: 'The token expired.' });
      }

      return decoded;
    });
    next();
  } catch (error) {
    return res.status(401).send({ message: 'Invalid token' });
  }
};
