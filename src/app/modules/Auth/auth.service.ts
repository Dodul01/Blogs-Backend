import { User } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import config from '../../config';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw {
      message: 'User not found',
      statusCode: 404,
      details: { field: 'email', issue: 'No user exists with the given email' },
    };
  }

  if (user.isBlocked) {
    throw {
      message: 'User is blocked',
      statusCode: 403,
      details: { field: 'isBlocked', issue: 'This user account is blocked' },
    };
  }

  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordMatch) {
    throw {
      message: 'Invalid credentials',
      statusCode: 401,
      details: {
        field: 'password',
        issue: 'The provided password is incorrect',
      },
    };
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
    _id: user._id.toString(),
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
