import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import picker from '@utils/picker';
import { ApiError } from '@/middleware/errorHandler';
import statusCodes from '@utils/statusCodes';

const validateSchema =
  (schema: object) => (req: Request, _res: Response, next: NextFunction) => {
    const validSchema = picker(schema, ['params', 'query', 'body']);
    const pickedObj = picker(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(pickedObj);

    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(', ');
      return next(new ApiError(statusCodes.BadRequest, errorMessage));
    }
    Object.assign(req, value);
    return next();
  };

export default validateSchema;
