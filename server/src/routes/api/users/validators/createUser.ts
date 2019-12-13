import { checkSchema } from 'express-validator';
import { validatePhoneNumber, validateName } from 'utils/validateSignUpForms';
import { getUserById } from 'services';

const validateOptions = checkSchema({
  id: {
    in: 'body',
    exists: { options: { checkFalsy: true } },
    isNumeric: true,
    custom: {
      options: async (value, { req }) => {
        const userdata = await getUserById(value);
        if (userdata === null) return false;
        return true;
      },
    },
  },
  googleId: {
    in: 'body',
    exists: { options: { checkFalsy: true } },
    isNumeric: true,
  },
  email: {
    in: 'body',
    exists: { options: { checkFalsy: true } },
    isEmail: true,
  },
  firstName: {
    in: 'body',
    isString: true,
    exists: { options: { checkFalsy: true } },
    custom: {
      options: (value, { req }) => validateName(value),
    },
  },
  lastName: {
    in: 'body',
    isString: true,
    exists: { options: { checkFalsy: true } },
    custom: {
      options: (value, { req }) => validateName(value),
    },
  },
  phoneNumber: {
    in: 'body',
    isNumeric: true,
    exists: { options: { checkFalsy: true } },
    custom: {
      options: (value, { req }) => validatePhoneNumber(value),
    },
  },
});

export default validateOptions;
