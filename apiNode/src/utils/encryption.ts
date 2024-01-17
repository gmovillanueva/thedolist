import bcrypt from 'bcrypt';

export const encryptPassword = async (password: string) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const passwordMatch = async (password: string, userPassword: string) => {
  return bcrypt.compare(password, userPassword);
};
