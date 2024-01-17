import passport from 'passport';
import { NextFunction, Request, Response } from 'express';
import { User } from '@prisma/client';
import statusCodes from '@utils/statusCodes';
import { roleRights } from '@config/roles.config';
import { ApiError } from '@lib/apiErrors';

const verifyCallback =
  (
    req: any,
    resolve: (value?: unknown) => void,
    reject: (reason?: unknown) => void,
    requiredRights: string[]
  ) =>
  async (err: unknown, user: User | false, info: unknown) => {
    if (err || info || !user) {
      return reject(
        new ApiError(statusCodes.Unauthorized, 'Please authenticate')
      );
    }
    req.user = user;

    if (requiredRights.length) {
      const userRights = roleRights.get(user.role) ?? [];
      const hasRequiredRights = requiredRights.every((requiredRights) =>
        userRights.includes(requiredRights)
      );

      if (!hasRequiredRights && req.params.userId !== user.id) {
        return reject(new ApiError(statusCodes.Forbidden, 'Forbidden'));
      }
    }

    resolve();
  };

const auth =
  (...requiredRights: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        'jwt',
        { session: false },
        verifyCallback(req, resolve, reject, requiredRights)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

export default auth;
