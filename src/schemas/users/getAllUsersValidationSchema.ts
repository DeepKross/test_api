import { Schema } from 'express-validator';

export const getAllUsersValidationSchema: Schema = {
  count: {
    in: ['query'],
    isInt: {
      errorMessage: 'Count must be an integer'
    },
    optional: true
  },
  page: {
    in: ['query'],
    isInt: {
      errorMessage: 'Page must be an integer'
    },
    optional: true
  }
};
