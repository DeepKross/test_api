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
    notEmpty: {
      errorMessage: 'Phone number is required',
    },
    custom: {
      options: (value) => {
        // Ensure the phone number starts with +380
        const ukrainePhoneRegex = /^\+380\d{9}$/;
        if (!ukrainePhoneRegex.test(value)) {
          throw new Error('Phone number must start with +380 and contain 12 digits in total');
        }
        return true;
      },
    },
  },
  position_id: {
    isInt: {
      errorMessage: 'The position id must be an integer.'
    },
    notEmpty: {
      errorMessage: 'The position id is required.'
    }
  },
};
