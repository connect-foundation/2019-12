import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status';
import fileType = require('file-type');
import multer = require('multer');

const multerErrorCodes = [
  'LIMIT_PART_COUNT',
  'LIMIT_FILE_SIZE',
  'LIMIT_FILE_COUNT',
  'LIMIT_FIELD_KEY',
  'LIMIT_FIELD_VALUE',
  'LIMIT_FIELD_COUNT',
  'LIMIT_UNEXPECTED_FILE',
] as const;

declare type ErrorCodes = typeof multerErrorCodes[number];

interface MulterError extends Error {
  name: string;
  message: string;
  code: ErrorCodes;
  field?: string;
}

export default (fieldName: string) => {
  const upload = multer({
    storage: multer.memoryStorage(),
  }).single(fieldName);

  return (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, (err?: MulterError) => {
      if (err?.code && multerErrorCodes.includes(err.code))
        return res.sendStatus(BAD_REQUEST);
      if (err) return next(err);
      if (!req.file || !req.file.buffer) return res.status(BAD_REQUEST);

      try {
        req.fileType = fileType(req.file.buffer);
        next();
      } catch (error) {
        next(error);
      }
    });
  };
};
