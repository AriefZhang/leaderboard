import * as bcrypt from 'bcrypt';

export const encryptPassword = async (password: string): Promise<string> => {
  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

export const decryptPassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  const match = await bcrypt.compare(password, hashedPassword);

  return match;
};
