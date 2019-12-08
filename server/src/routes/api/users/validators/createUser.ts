import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { FORBIDDEN } from 'http-status';
import {
  validatePhoneNumber,
  validateName,
} from '../../../../utils/validateSignUpForms';
import { getUserById } from '../../../../services';

const validatorFunc = (req: Request) => [
  body('id')
    .exists({ checkFalsy: true })
    .isNumeric()
    .custom(async value => {
      const userdata = await getUserById(value);
      if (userdata === null) return false;
      return true;
    })
    .run(req),
  body('googleId')
    .exists({ checkFalsy: true })
    .isNumeric()
    .run(req),
  body('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .run(req),
  body('firstName')
    .exists({ checkFalsy: true })
    .custom((value, { req }) => validateName(value))
    .run(req),
  body('lastName')
    .exists({ checkFalsy: true })
    .isString()
    .custom((value, { req }) => validateName(value))
    .run(req),
  body('phoneNumber')
    .exists({ checkFalsy: true })
    .isNumeric()
    .custom((value, { req }) => validatePhoneNumber(value))
    .run(req),
];

async function validate(req: Request, res: Response, next: NextFunction) {
  await Promise.all(validatorFunc(req));
  const result = validationResult(req);

  if (!result.isEmpty()) return next();
  res.status(FORBIDDEN).send(result);
}
export default validate;
