import {
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifyCallback,
} from 'passport-jwt';
import { TokenType } from '@prisma/client';
import prismaClient from '@lib/prisma';
import envConfig from '@config/env.config';

const jwtOptions = {
  secretOrKey: envConfig.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify: VerifyCallback = async (payload, done) => {
  try {
    if (payload.type !== TokenType.ACCESS) {
      throw new Error('Invalid token type.');
    }

    const user = await prismaClient.user.findUnique({
      select: {
        id: true,
        email: true,
        name: true,
      },
      where: { id: payload.sub },
    });

    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (err) {
    done(err, false);
  }
};

export const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
