import { checkSchema, CustomValidator } from 'express-validator';
import { resolveObject } from 'utils/objectResolver';

const isLessThanOrEqualTo = (key: string): { options: CustomValidator } => ({
  options: (value, { req }): boolean => resolveObject(req.body, key) >= value,
});

const isGreaterThanOrEqualTo = (key: string): { options: CustomValidator } => ({
  options: (value, { req }): boolean => resolveObject(req.body, key) <= value,
});

const isBetweenTodayAnd = (endKey: string): { options: CustomValidator } => ({
  options: (value, { req }): boolean => {
    const start = new Date();
    const end = resolveObject(req.body, endKey);

    return value >= start && value <= end;
  },
});

const isBetween = (
  startKey: string,
  endKey: string,
): { options: CustomValidator } => ({
  options: (value, { req }): boolean => {
    const start = resolveObject(req.body, startKey);
    const end = resolveObject(req.body, endKey);

    return value >= start && value <= end;
  },
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
    isLength: { options: { min: 1, max: 255 } },
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
    custom: isGreaterThanOrEqualTo('startAt'),
  },
  place: {
    in: 'body',
    isString: true,
    exists: true,
    isLength: { options: { min: 1, max: 255 } },
  },
  address: {
    in: 'body',
    isString: true,
    exists: true,
    isLength: { options: { min: 1, max: 255 } },
  },
  placeDesc: {
    in: 'body',
    isString: true,
    optional: true,
  },
  latitude: {
    in: 'body',
    isFloat: true,
    toFloat: true,
  },
  longitude: {
    in: 'body',
    isFloat: true,
    toFloat: true,
  },
  desc: {
    in: 'body',
    isString: true,
    exists: true,
    isLength: { options: { min: 1, max: 65535 } },
  },
  'ticket.name': {
    in: 'body',
    isString: true,
    exists: true,
    isLength: { options: { min: 1, max: 255 } },
  },
  'ticket.desc': {
    in: 'body',
    isString: true,
    optional: true,
  },
  'ticket.price': {
    in: 'body',
    isInt: { options: { min: 0 } },
    toInt: true,
    exists: true,
  },
  'ticket.quantity': {
    in: 'body',
    isInt: { options: { gt: 0 } },
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
    custom: isLessThanOrEqualTo('ticket.quantity'),
  },
  'ticket.salesStartAt': {
    in: 'body',
    isISO8601: true,
    exists: true,
    toDate: true,
    custom: isBetweenTodayAnd('endAt'),
  },
  'ticket.salesEndAt': {
    in: 'body',
    isISO8601: true,
    exists: true,
    toDate: true,
    custom: isBetween('ticket.salesStartAt', 'endAt'),
  },
  'ticket.refundEndAt': {
    in: 'body',
    isISO8601: true,
    exists: true,
    toDate: true,
    custom: isBetween('ticket.salesStartAt', 'endAt'),
  },
});
