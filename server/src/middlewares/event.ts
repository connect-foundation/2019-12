import { checkSchema } from 'express-validator';

export const getEventsValidation = checkSchema({
  cnt: {
    in: 'query',
    errorMessage: 'cnt is wrong.',
    isInt: true,
    optional: true,
    toInt: true,
  },
  lastId: {
    in: 'query',
    errorMessage: 'lastId is wrong.',
    isInt: true,
    optional: true,
    toInt: true,
  },
});
