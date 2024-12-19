import { Request, Response } from 'express';
import { AuthServices } from './auth.service';
import config from '../../config';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const loginUser = async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken, refreshToken } = result;
  console.log('accessToken', accessToken);
  console.log('refreshToken', refreshToken);

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV == 'production',
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Login successful',
    statusCode: 200,
    data: {
      token: accessToken,
    },
  });
};

export const AuthControllers = {
  loginUser,
};
