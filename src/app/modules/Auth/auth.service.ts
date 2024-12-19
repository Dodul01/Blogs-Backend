import { User } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import config from '../../config';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new Error('User not found');
  }

  const isBlocked = user.isBlocked;

  if (isBlocked) {
    throw new Error('User is blocked');
  }

  const isPasswordMath = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordMath) {
    throw new Error('Password not match');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secreat as string,
    config.jwt_access_expiry as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expiry as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  loginUser,
};
