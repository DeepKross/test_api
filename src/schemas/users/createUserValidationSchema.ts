export const createUserValidationSchemas = {
  name: {
    isLength: {
      options: {
        min: 2,
        max: 255
      },
      errorMessage: 'The name must be at least 2 characters.'
    },
    notEmpty: {
      errorMessage: 'The name is required.'
    }
  },
  email: {
    isEmail: {
      errorMessage: 'The email must be a valid email address.'
    },
    notEmpty: {
      errorMessage: 'The email is required.'
    }
  },
  phone: {
    isMobilePhone: {
      errorMessage: 'The phone is invalid.'
    },
    notEmpty: {
      errorMessage: 'The phone is required.'
    }
  },
  position_id: {
    isInt: {
      errorMessage: 'The position id must be an integer.'
    },
    notEmpty: {
      errorMessage: 'The position id is required.'
    }
  },
  photo: {
    notEmpty: {
      errorMessage: 'The photo is required.'
    }
  }
};
