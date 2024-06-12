import { Schema } from 'express-validator';

export const getUserByIdValidationSchema: Schema = {
  count: {
    in: ['params'],
    isInt: {
      errorMessage: 'The user must be an integer.'
    },
    notEmpty: {
      errorMessage: 'The user is required.'
    }
  }
};
