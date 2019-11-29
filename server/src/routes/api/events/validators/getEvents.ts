import { checkSchema } from 'express-validator';

export default checkSchema({
  cnt: {
    in: 'query',
    errorMessage: 'cnt is wrong.',
    isInt: true,
    optional: true,
    toInt: true,
  },
  startAt: {
    in: 'query',
    errorMessage: 'startAt is wrong.',
    isISO8601: true,
    optional: true,
  },
});
