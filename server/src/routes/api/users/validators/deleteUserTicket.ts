import { checkSchema } from 'express-validator';

const validateOptions = checkSchema({
  ticketId: {
    in: 'body',
    exists: { options: { checkFalsy: true } },
    isNumeric: true,
  },
});

export default validateOptions;
