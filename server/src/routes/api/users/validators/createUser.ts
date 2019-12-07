import { check } from 'express-validator';
//import { validatePhoneNumber, validateName } from './validateSignUpForms';

export const createUser = check('id').isNumeric();
//   body('googleId')
//     .exists({ checkFalsy: true })
//     .isNumeric(),
//   body('email')
//     .exists({ checkFalsy: true })
//     .isEmail(),
//   body('firstName')
//     .exists({ checkFalsy: true })
//     .custom((value, { req }) => validateName(value)),
//   body('lastName')
//     .exists({ checkFalsy: true })
//     .isString()
//     .custom((value, { req }) => validateName(value)),
//   body('phoneNumber')
//     .exists({ checkFalsy: true })
//     .isNumeric()
//     .custom((value, { req }) => validatePhoneNumber(value)),
// ];
