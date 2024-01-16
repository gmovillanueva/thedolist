import zod from 'zod';

export const createUserZodSchema = zod.object({
  last_name: zod.string(),
  first_name: zod.string(),
  email: zod.string(),
});
