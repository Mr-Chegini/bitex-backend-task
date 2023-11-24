import * as bcrypt from 'bcrypt';
import { Constants } from '../constants/constants';

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, Constants.SALT_OR_ROUNDS);
  return hashedPassword;
};

export const matchHashedPassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  const isPasswordValid = await bcrypt.compare(password, hash);
  return isPasswordValid;
};
