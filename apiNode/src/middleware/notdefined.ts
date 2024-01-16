import { NextFunction, Request, Response } from 'express';

export default function notDefined(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { path } = request;

  const invalidRoute =
    path !== '/' && !path.includes('/v1/auth') && !path.includes('/graphql');

  if (invalidRoute) {
    return response.status(405).json({
      success: false,
      message: 'This route does not seem to exists yet.',
    });
  }
  next();
}
