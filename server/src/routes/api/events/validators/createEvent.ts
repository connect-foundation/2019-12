import { checkSchema, CustomValidator } from 'express-validator';
import { resolveObject } from 'utils/objectResolver';

const isLessThan = (key: string): { options: CustomValidator } => ({
  options: (value, { req }) => resolveObject(req.body, key) >= value,
});

const isGreaterThan = (key: string): { options: CustomValidator } => ({
  options: (value, { req }) => resolveObject(req.body, key) <= value,
});

export default checkSchema({
  isPublic: {
    in: 'body',
    isBoolean: true,
    toBoolean: true,
    exists: true,
  },
  title: {
    in: 'body',
    isString: true,
    exists: true,
    isLength: { options: { min: 5, max: 255 } },
  },
  startAt: {
    in: 'body',
    isISO8601: true,
    exists: true,
    toDate: true,
    isAfter: { options: new Date().toString() },
  },
  endAt: {
    in: 'body',
    isISO8601: true,
    exists: true,
    toDate: true,
    custom: isGreaterThan('startAt'),
  },
  place: {
    in: 'body',
    isString: true,
    exists: true,
  },
  address: {
    in: 'body',
    isString: true,
    exists: true,
  },
  placeDesc: {
    in: 'body',
    isString: true,
    exists: true,
  },
  desc: {
    in: 'body',
    isString: true,
    exists: true,
  },
  'ticket.name': {
    in: 'body',
    isString: true,
    exists: true,
  },
  'ticket.desc': {
    in: 'body',
    isString: true,
    exists: true,
  },
  'ticket.quantity': {
    in: 'body',
    isInt: true,
    toInt: true,
    exists: true,
  },
  'ticket.isPublicLeftCnt': {
    in: 'body',
    isBoolean: true,
    toBoolean: true,
    exists: true,
  },
  'ticket.maxCntPerPerson': {
    in: 'body',
    isInt: true,
    toInt: true,
    exists: true,
    custom: isLessThan('ticket.quantity'),
  },
});
