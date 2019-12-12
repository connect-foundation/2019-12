import { checkSchema } from 'express-validator';

export default checkSchema({
  attendance: {
    in: 'body',
    errorMessage: 'attendance is must provided.',
    isBoolean: true,
    toBoolean: true,
  },
});
